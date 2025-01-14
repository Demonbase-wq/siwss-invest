import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import { users } from "@/lib/airtable";

// Configure Nodemailer
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

function createTemplate(name: any, resetUrl: any) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
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
        .reset-code {
            background-color: #f0f0f0;
            border: 1px solid #ec3f77;
            border-radius: 5px;
            padding: 10px;
            margin: 20px 0;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
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
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
            <p>To reset your password, Click the link below</p>
            <a href="${resetUrl}" class="button">Reset Password</a>
            <p>This reset link will expire in 15 minutes for security reasons.</p>
            <p>If you didn't request a password reset, please contact our support team immediately.</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 SwissPipsAi. All rights reserved.</p>
        </div>
    </div>
</body>
</html>

`;
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    // Check if user exists in Airtable
    const foundUser = await users
      .select({
        filterByFormula: `{email} = '${email}'`,
      })
      .firstPage();

    if (foundUser.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = foundUser[0];

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    // Update user record with reset token and expiry
    await users.update(user.id, {
      resetToken,
      resetTokenExpiry,
    });

    // Send reset email
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;
    const name = `${user.fields.first_name} ${user.fields.last_name}`

    const mailOptions = {
      from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
      to: email,
      subject: "Password Reset Request",
      html: createTemplate(name, resetUrl),
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(`here is the error: ${error}`);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const result = await transporter.sendMail(mailOptions);

    if (result.response.includes("OK")) {
      return NextResponse.json(
        { message: "Reset link sent successfully" },
        { status: 200 }
      );
    } else {
      return Response.json(
        { error: "Error resetting your password." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 200 });
  }
}
