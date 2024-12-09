import { users } from "@/lib/airtable";
import { auth } from "../../../../auth";

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

        await users.update([
            {
                id: records[0].id,
                fields: { password: newPassword },
            },
        ]);

        return Response.json({ message: 'Password updated successfully' }, { status: 200 });

    } catch (error) {
        return Response.json({ error: error });
    }
}