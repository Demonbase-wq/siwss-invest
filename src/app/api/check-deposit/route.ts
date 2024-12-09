import { check, ticket } from "@/lib/airtable";
import { auth } from "../../../../auth";


export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const data = {
            user_id: session.user.id,
            user_name: session.user.name as string,
        }

        const ticketData = {
            user_id: session.user.id,
            user_name: session.user.name as string,
            type: 'Funds',
            details: 'Check Deposit',
        }


        const savedCheck = await check.create([{
            fields: data,
        }])

        const id = savedCheck[0].id;

        await ticket.create([{
            fields: ticketData,
       }])

        return Response.json({ id: id }, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 200 });
    }
}
