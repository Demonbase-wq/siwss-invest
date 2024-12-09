import { users } from "@/lib/airtable";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { verificationCode, newPassword } = await request.json();

    try {
        const records = await users.select({
            filterByFormula: `{id} = '${session.user.id}'`,
        }).firstPage();

        if (records.length === 0) {
            return Response.json({ message: 'User not found.' }, { status: 404 });
        }

        const user = records[0];
        const vcode = user.fields.verificationCode?.toString()

        if (verificationCode !== vcode) {
            return Response.json({ message: 'Invalid verification code.' }, { status: 401 });
        }

        await users.update([
            {
                id: records[0].id,
                fields: { password: newPassword },
            },
        ]);

        return Response.json({ message: 'Password updated successfully' }, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
