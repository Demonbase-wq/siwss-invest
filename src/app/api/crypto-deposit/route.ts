import { check, crypto, ticket, transactions, users } from "@/lib/airtable";
import { auth } from "../../../../auth";


export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, wallet } = await request.json();

    try {

        const record = await users.find(session.user.id as string)

        if (!record) {
            return Response.json({ error: 'User not found.' }, { status: 404 });
        }
        const data = {
            user_id: session.user.id,
            user_name: session.user.name as string,
            amount: parseFloat(amount),
            wallet,
        }

        const ticketData = {
            user_id: session.user.id,
            user_name: session.user.name as string,
            type: 'Funds',
            details: 'Crypto Deposit',
        }

        const transactionData = {
            user_id: session.user.id,
            user_name: session.user.name as string,
            type: "Crypto Deposit",
            payment_account: `${record.fields.current_account} (Current)`,
            amount: parseFloat(amount),
        }


        const savedCrypto = await crypto.create([{
            fields: data,
        }])

        const id = savedCrypto[0].id;

        await ticket.create([{
            fields: ticketData,
        }])

        await transactions.create([{
            fields: transactionData
        }])


        return Response.json({ id: id }, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 200 });
    }
}
