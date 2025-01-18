import { NextRequest } from "next/server";
import { auth } from "../../../../auth";
import { kyc, users } from "@/lib/airtable";
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
    <title>KYC Request Received</title>
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
            <h1>KYC Request Received</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We have received your Know Your Customer (KYC) verification request.</p>
            <p>Our compliance team will review your submitted documents as soon as possible. This process typically takes 1-3 business days.</p>
            <p>You will receive another email once your KYC verification has been completed or if we require any additional information.</p>
            <p>If you have any questions or concerns, please don't hesitate to contact our support team.</p>
            <a href="https://swisspipsai.com/dashboard" class="button">Check KYC Status</a>
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
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    nin,
    idFront,
    idBack,
    passportPhoto,
    credentialsNotExpired,
    documentVisible,
  } = await req.json();

  if (!credentialsNotExpired) {
    return Response.json({ error: "Credentials Expired." }, { status: 200 });
  }

  if (!documentVisible) {
    return Response.json(
      { error: "Document Is Not Visible." },
      { status: 200 }
    );
  }

  try {
    const user = await users.find(session.user.id as string);

    if (!user) {
      return Response.json({ error: "User not found." }, { status: 200 });
    }

    // Update corresponding transaction
    const foundKyc = await kyc
      .select({
        filterByFormula: `AND({user_id} = '${session.user.id}', {status} = "Pending")`,
      })
      .firstPage();
    // console.log(foundKyc);

    if (foundKyc.length) {
      return Response.json(
        {
          error:
            "You've already submitted a kyc, kindly wait for a response from the support team.",
        },
        { status: 200 }
      );
    }

    await kyc.create([
      {
        fields: {
          nin: nin,
          passport: passportPhoto,
          front: idFront,
          back: idBack,
          user_id: user.id,
        },
      },
    ]);

    const name = `${user?.fields.first_name} ${user?.fields.last_name}`;
    const email = user?.fields.email as string;

    const mailOptions = {
      from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
      to: email,
      subject: "KYC Request Received",
      html: createTemplate(name),
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(`here is the error: ${error}`);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const result = await transporter.sendMail(mailOptions);

    console.log(result.response);

    if (result.response.includes("Ok")) {
      return Response.json(
        { message: "KYC data summited successfully, kindly wait for approval" },
        { status: 200 }
      );
    } else {
      return Response.json(
        { error: "Something went wrong, please try again..." },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error saving KYC data:", error);
    return Response.json(
      {
        error: "Internal Server Error",
      },
      { status: 200 }
    );
  }
}
