import { ticket } from "@/lib/airtable";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { type, details } = await request.json();

    try {
       const data = {
            user_id: session.user.id,
            user_name: session.user.name as string,
            type: type,
            details: details,
       }

       await ticket.create([{
        fields: data
       }])

        return Response.json({ message: 'Ticket added successfully' }, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
