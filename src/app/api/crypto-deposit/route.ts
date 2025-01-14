import { deposits, ticket, transactions, users } from "@/lib/airtable";
import { auth } from "../../../../auth";
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
  amount: any,
  id: any
) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Deposit Request Received</title>
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
        .deposit-details {
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
            <h1>Deposit Request Received</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We have received your deposit request. Here are the details:</p>
            <div class="deposit-details">
                <p><strong>Amount:</strong> ${amount}</p>
                <p><strong>Currency:</strong> ${currency}</p>
                <p><strong>Transaction ID:</strong> ${id}</p>
                <p><strong>Date:</strong> ${date}</p>
            </div>
            <p>Our team will process your deposit as soon as possible. You will receive another email once the deposit has been approved and credited to your account.</p>
            <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 200 });
  }

  const { amount, walletAddress, transactionHash, currency } =
    await request.json();

  try {
    const record = await users.find(session.user.id as string);

    if (!record) {
      return Response.json({ error: "User not found." }, { status: 200 });
    }

    const user = record?.fields;
    const data = {
      user_id: session.user.id,
      amount: parseFloat(amount),
      wallet_address: walletAddress,
      txn: transactionHash,
    };

    const deposit = await deposits.create([
      {
        fields: data,
      },
    ]);

    const id = deposit[0].id;

    const transactionData = {
      user_id: session.user.id,
      type: "Deposit",
      wallet_address: `${walletAddress} (${currency})`,
      amount: parseFloat(amount),
      reference_id: id,
    };

    const transaction = await transactions.create([
      {
        fields: transactionData,
      },
    ]);
    const date = transaction[0]?.fields.date as string;
    const txId = transaction[0]?.id;
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: user?.timezone as string, // Set your desired timezone
    }).format(new Date(date));

    const name = `${user.first_name} ${user.last_name}`;

    const mailOptions = {
      from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
      to: user.email as string,
      subject: "Deposit Request Received",
      html: createTemplate(name, formattedDate, currency, amount, txId),
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
        { message: "Your crypto deposit request is being reviewed..." },
        { status: 200 }
      );
    } else {
      return Response.json(
        { error: "Something went wrong, please try again." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server error" }, { status: 200 });
  }
}
