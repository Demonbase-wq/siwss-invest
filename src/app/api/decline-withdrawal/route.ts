import { withdrawals, transactions, users } from "@/lib/airtable";
import nodemailer from "nodemailer";
import { auth } from "../../../../auth";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string), // Convert string to number
  secure: process.env.SMTP_SECURE === "true", // Convert to boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
//   debug: true, // Enable debug output
//   logger: true, // Log to console
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 200 });
  }

  try {
    const { id, reason } = await request.json();

    // Fetch the deposit record
    const withdrawal = await withdrawals.find(id);

    if (!withdrawal) {
      return Response.json({ error: "Deposit not found." }, { status: 200 });
    }

    const { user_id, amount, method } = withdrawal.fields;

    await withdrawals.update(id, { status: "Declined" });

    // Update corresponding transaction
    const transaction = await transactions
      .select({
        filterByFormula: `AND({type} = 'Withdrawal', {reference_id} = "${id}")`,
      })
      .firstPage();

    if (transaction.length) {
      await transactions.update(transaction[0].id, { status: "Declined" });
    }

    const user = await users.find(user_id as string);
    const date = withdrawal?.fields.date as string;
    const name = `${user?.fields.first_name} ${user?.fields.last_name}`;

    const formattedUpdatedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: user?.fields.timezone as string, // Set your desired timezone
    }).format(new Date(date));

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Withdrawal Request Declined</title>
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
        .button {
            display: inline-block;
            background-color: #ec3f77;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
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
            <h1>Withdrawal Request Declined</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We regret to inform you that your recent withdrawal request has been declined. Here are the details of the declined withdrawal:</p>
            <div class="withdrawal-details">
                <p><strong>Amount:</strong> ${amount}</p>
                <p><strong>Currency:</strong> ${method}</p>
                <p><strong>Transaction ID:</strong> ${transaction[0].id}</p>
                <p><strong>Date:</strong> ${formattedUpdatedDate}</p>
                <p><strong>Reason for Decline:</strong> ${reason}</p>
            </div>
            <p>Common reasons for declined withdrawals include:</p>
            <ul>
                <li>Insufficient funds in your account</li>
                <li>Incomplete or pending KYC verification</li>
                <li>Suspicious account activity</li>
                <li>Exceeding withdrawal limits</li>
            </ul>
            <p>If you believe this decline was made in error or you need further clarification, please don't hesitate to contact our support team. We're here to assist you in resolving any issues and processing your withdrawal request.</p>
            <a href="mailto:support@swisspipsai.com" class="button">Contact Support</a>
        </div>
        <div class="footer">
            <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
    const mailOptions = {
      from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
      to: user?.fields.email as string,
      subject: "Withdrawal Request Declined",
      html: htmlContent,
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
        { message: "Withdrawal Request Declined." },
        { status: 200 }
      );
    } else {
      return Response.json(
        { error: "Something went wrong, please try again" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error)
    return Response.json(
      { error: "Something went wrong, please try again" },
      { status: 200 }
    );
  }
}
