import { users } from "@/lib/airtable";
import { auth } from "../../../../auth";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.PASS,
    }
})

export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { currentPassword, newPassword } = await request.json();

    try {
        const records = await users.select({
            filterByFormula: `{id} = '${session.user.id}'`,
        }).firstPage();

        if (records.length === 0) {
            return Response.json({ message: 'User not found.' }, { status: 404 });
        }

        const user = records[0];

        if (currentPassword !== user.fields.password) {
            return Response.json({ message: 'Invalid password.' }, { status: 401 });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        await users.update([
            {
                id: records[0].id,
                fields: { verificationCode },
            },
        ]);

        // Send verification code to user's email
        const mailOptions = {
            from: `Crest Bank ${process.env.MY_EMAIL}`,
            to: user.fields.email as string,
            subject: "Password Change Verification Code",
            text: `Your verification code is ${verificationCode}`,
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
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
