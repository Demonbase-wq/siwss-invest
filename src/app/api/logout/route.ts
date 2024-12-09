import { NextRequest } from "next/server";
import { auth, signOut } from "../../../../auth";


export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        await signOut({ redirectTo: '/login', redirect: true });

        return Response.json({ message: 'Signed out successfully' }, { status: 200 });
    } catch (error) {
        return Response.json({ error: error });
    }
}