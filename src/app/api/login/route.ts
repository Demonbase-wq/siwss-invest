import { users } from '@/lib/airtable';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.PASS,
    }
})

export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const records = await users.select({
            filterByFormula: `{email} = '${email}'`,
        }).firstPage();

        if (records.length === 0) {
            return Response.json({ error: 'User not found.' }, { status: 404 });
        }

        const user = records[0];

        if (user.fields.password !== password) {
            return Response.json({ error: 'Invalid password.' }, { status: 401 });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);
        await users.update(user.id, { verificationCode });

        const mailOptions = {
            from: `CmTradingPro`,
            to: email,
            subject: "Email Verification",
            text: `Your verification code is: ${verificationCode}`,
        }

        transporter.verify(function (error, success) {
            if (error) {
                console.log(`here is the error: ${error}`);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

        const result = await transporter.sendMail(mailOptions);

        if (result.response.includes("OK")) {
            return Response.json({ message: "Verification code sent to email." }, { status: 200 });
        } else {
            return Response.json({ error: "Error logging in user." }, { status: 500 });
        }
    } catch (error) {
        console.log(error)
        return Response.json({ error: error });
    }
}