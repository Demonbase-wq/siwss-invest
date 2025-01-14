import { transactions, users, deposits, kyc } from "@/lib/airtable";
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
//   debug: true, 
//   logger: true, 
});

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 200 });
  }

  try {
    const { id, reason } = await request.json();

    // Fetch the deposit record
    const foundKyc = await kyc.find(id);

    if (!foundKyc) {
      return Response.json({ error: "Deposit not found." }, { status: 200 });
    }

    const { user_id } = foundKyc?.fields;

    await kyc.update(id, { status: "Declined" });

    const user = await users.find(user_id as string);
    if (!user) {
      return Response.json(
        { error: "User with this kyc not found." },
        { status: 200 }
      );
    }

    await users.update(user_id as string, { kyc: "Declined" });
    const name = `${user?.fields.first_name} ${user?.fields.last_name}`;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Declined</title>
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
        .kyc-details {
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
            <h1>KYC Verification Declined</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We regret to inform you that your Know Your Customer (KYC) verification has been declined. Here are the details of your KYC submission:</p>
            <div class="kyc-details">
                <p><strong>Reason for Decline:</strong> ${reason}</p>
            </div>
            <p>Common reasons for KYC verification decline include:</p>
            <ul>
                <li>Unclear or unreadable document images</li>
                <li>Mismatch between provided information and documents</li>
                <li>Expired identification documents</li>
                <li>Incomplete submission of required documents</li>
            </ul>
            <p>We understand that this may be disappointing, but please don't worry. You can resubmit your KYC verification with the necessary corrections. Here's what you can do:</p>
            <ol>
                <li>Review the reason for decline carefully</li>
                <li>Gather all required documents, ensuring they are clear and up-to-date</li>
                <li>Double-check all information for accuracy</li>
                <li>Resubmit your KYC verification through your account dashboard</li>
            </ol>
            <p>If you need any assistance or have questions about the KYC process, our support team is here to help you.</p>
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
      subject: "KYC Verification Declined",
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
        { message: "KYC Verification Declined." },
        { status: 200 }
      );
    } else {
      return Response.json(
        { error: "Something went wrong, please try again" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Something went wrong, please try again" },
      { status: 200 }
    );
  }
}
