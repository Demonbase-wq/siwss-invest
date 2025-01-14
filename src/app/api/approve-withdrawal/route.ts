import { withdrawals, transactions, users } from "@/lib/airtable";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string), // Convert string to number
  secure: process.env.SMTP_SECURE === "true", // Convert to boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
//   debug: true, 
//   logger: true, 
});

function createTemplate(
  name: any,
  date: any,
  currency: any,
  network: any,
  amount: any,
  id: any
) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Approved</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #030834;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        h1 {
            margin: 0;
        }
        .content {
            background-color: #ffffff;
            padding: 20px;
        }
        .withdrawal-details {
            background-color: #f0f0f0;
            border: 1px solid #ec3f77;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
        }
        .footer {
            background-color: #f4f4f4;
            color: #333333;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Withdrawal Approved</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We're pleased to inform you that your withdrawal request has been approved and processed. Here are the details:</p>
            <div class="withdrawal-details">
                <p><strong>Amount:</strong> ${amount}</p>
                <p><strong>Method:</strong> ${currency}</p>
                <p><strong>Transaction ID:</strong> ${id}</p>
                <p><strong>Date Processed:</strong> ${date}</p>
                <p><strong>Network:</strong> ${network}</p>
            </div>
            <p>The funds have been sent to your specified withdrawal method. Depending on the method chosen, it may take a few business days for the funds to appear in your account.</p>
            <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`
}

export async function POST(request: Request) {
  try {
    const { id } = await request.json();

    // Fetch the withdrawal record
    const withdrawal = await withdrawals.find(id);
    if (!withdrawal || withdrawal.fields.status === "Approved") {
      return Response.json(
        { error: "Withdrawal not found or already approved." },
        { status: 200 }
      );
    }

    const { user_id, amount } = withdrawal.fields;

    // Fetch the user
    const user = await users.find(user_id as string);
    // console.log("user", user);
    const userBalance = user?.fields.balance as number;
    const withdrawalAmount = amount as number;

    // Check if sufficient balance
    if (userBalance < withdrawalAmount) {
      return Response.json({ error: "Insufficient balance." }, { status: 200 });
    }

    // Update withdrawal status to "Approved"
    await withdrawals.update(id, { status: "Approved" });

    // Update corresponding transaction
    const transaction = await transactions
      .select({
        filterByFormula: `AND({type} = 'Withdrawal', {reference_id} = "${id}")`,
      })
      .firstPage();

    // console.log("transaction", transaction);

    if (transaction.length) {
      await transactions.update(transaction[0].id, { status: "Approved" });
    }

    // Deduct withdrawal amount from user balance
    const newBalance = userBalance - withdrawalAmount;
    console.log("new balance", newBalance);
    await users.update(user_id as string, { balance: newBalance });
    const date = withdrawal?.fields.updated as string
    const currency = withdrawal?.fields.method
    const network = withdrawal?.fields.network
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: user?.fields.timezone as string, // Set your desired timezone
    }).format(new Date(date));
    const name = `${user?.fields.first_name} ${user?.fields.last_name}`;
    const txId = transaction[0]?.id

    const mailOptions = {
      from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
      to: user?.fields.email as string,
      subject: "Withdrawal Approved",
      html: createTemplate(name, formattedDate, currency, network, amount, txId),
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(`here is the error: ${error}`);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const result = await transporter.sendMail(mailOptions);

    // console.log(result.response);

    if (result.response.includes("Ok")) {
      return Response.json(
        { message: "Withdrawal Approved." },
        { status: 200 }
      );
    } else {
      return Response.json(
        { error: "Something went wrong, please try again." },
        { status: 200 }
      );
    }

  } catch (error) {
    console.error("Error approving withdrawal:", error);
    return Response.json(
      { error: "Error approving withdrawal" },
      { status: 200 }
    );
  }
}
