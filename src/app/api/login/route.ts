import  bcrypt from 'bcryptjs';
import { users } from '@/lib/airtable';
import nodemailer from 'nodemailer';

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
})

function createTemplate(name: string, vcode: any){
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Verification Code</title>
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
        .verification-code {
            background-color: #f0f0f0;
            border: 1px solid #ec3f77;
            border-radius: 5px;
            padding: 10px;
            margin: 20px 0;
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 5px;
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
            <h1>Your Verification Code</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>You have requested a verification code. Please use the following code to complete your action:</p>
            <div class="verification-code">${vcode}</div>
            <p>If you did not request this code, please ignore this email.</p>
            <p>If you have any questions or concerns, please contact our support team.</p>
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
    const { email, password } = await request.json();
    const formattedEmail = email.toLowerCase();


    try {
        const records = await users.select({
            filterByFormula: `{email} = '${formattedEmail}'`,
        }).firstPage();

        if (records.length === 0) {
            return Response.json({ error: 'User not found.' }, { status: 404 });
        }

        const user = records[0];
        const hashedPassword = user.fields.password as string;

        const isMatch = await bcrypt.compare(password, hashedPassword);


        if (!isMatch) {
            return Response.json({ error: 'Invalid password.' }, { status: 200 });
        }


        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        await users.update(user.id, { verificationCode });
        const name = `${user.fields.first_name} ${user.fields.last_name}`

        const mailOptions = {
            from: '"Swiss Pips AI" <noreply@swisspipsai.com>',
            to: email,
            subject: "Email Verification",
            html: createTemplate(name, verificationCode),
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
            return Response.json({ message: "Verification code sent to email." }, { status: 200 });
        } else {
            return Response.json({ error: "Error logging in." }, { status: 200 });
        }
    } catch (error) {
        console.log(error)
        return Response.json({ catchError: error }, { status: 200 });
    }
}