import { users } from "@/lib/airtable";
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

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email, referralLink } = await request.json();

  try {
    const record = await users.find(session.user.id as string);

    if (!record) {
      return Response.json({ error: "User not found." }, { status: 200 });
    }
    const name = `${record?.fields.first_name} ${record?.fields.last_name}`;
    const existingUser = await users
      .select({
        filterByFormula: `{email} = '${email}'`,
        maxRecords: 1,
      })
      .firstPage();

    if (existingUser.length > 0) {
      return Response.json(
        { error: "User with this email already exists" },
        { status: 200 }
      );
    }

    // Construct the email content

    const emailTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You've Been Invited!</title>
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
        .referral-code {
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
            paddingbackground-color: #ec3f77;
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
            <h1>You've Been Invited!</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>${name} thinks you'd love our platform and has invited you to join!</p>
            <p>As a new member, you'll get exclusive benefits and features.</p>
            <p>Click the link below to join now and start enjoying our services:</p>
            <a href="${referralLink}" class="button">Join Now</a>
            <p>If you have any questions, feel free to contact our support team.</p>
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
      to: email,
      subject: "You've Been Invited To Join SwissPipsAi!",
      html: emailTemplate,
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
      return Response.json(
        { message: "Invite sent successfully!" },
        { status: 200 }
      );
    } else {
      return Response.json(
        { error: "An error occured, please try again" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error sending invite:", error);
    return Response.json(
      { error: "An error occured, please try again" },
      { status: 200 }
    );
  }
}
