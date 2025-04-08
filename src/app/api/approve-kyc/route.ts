import { kyc, users } from "@/lib/airtable";
import { NextRequest } from "next/server";
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


function createTemplate(name: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KYC Verification Approved</title>
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
            <h1>Account Approved</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Congratulations! Your account has been successfully reviewed and approved.</p>
            <p>With your account now approved, you have full access to all features and services on our platform.</p>
            <p>If you notice any changes in your account that you believe are incorrect, or if you have any questions about your verified status, please contact our support team immediately.</p>
            <a href="https://swisspipsai.com/dashboard" class="button">Explore Your Account</a>
        </div>
        <div class="footer">
            <p>&copy; 2025 SwissPipsAi. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 200 });
  }
  const { id } = await req.json();

  try {
    // Fetch the withdrawal record
    const foundKyc = await kyc.find(id);
    if (!foundKyc || foundKyc.fields.status === "Verified") {
      return Response.json(
        { error: "Kyc not found or already approved." },
        { status: 200 }
      );
    }

    const updatedKyc = await kyc.update(id as string, {
      status: "Verified",
    });

    const verifiedKycUserId = updatedKyc.get("user_id");

    const user = await users.update(verifiedKycUserId as string, {
      kyc: "Verified",
    });

    const name = `${user?.fields.first_name} ${user?.fields.last_name}`
    const email = user?.fields.email as string;

    const mailOptions = {
        from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
        to: email,
        subject: "Account Approved",
        html: createTemplate(name),
    }

    transporter.verify(function (error, success) {
        if (error) {
            console.log(`here is the error: ${error}`);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const result = await transporter.sendMail(mailOptions);

    // console.log(result.response)

    if (result.response.includes("Ok")) {
        return Response.json({ message: "User Aprroved" }, { status: 200 });
    } else {
        return Response.json({ error: "User not Aprroved." }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { error: "Something went wrong, please try again..." },
      { status: 200 }
    );
  }
}
