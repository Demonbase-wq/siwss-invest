import { NextRequest } from "next/server";
import { auth } from "../../../../auth";
import { users } from "@/lib/airtable";


export async function GET(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const user = await users.find(session.user.id as string)

        if (!user) {
            return Response.json({ message: 'User not found.' }, { status: 404 });
        }

        const { password, verificationCode, ...filteredUser } = user.fields

        return Response.json(filteredUser, { status: 200 });
    } catch (error) {
        return Response.json({ error: error });
    }
}