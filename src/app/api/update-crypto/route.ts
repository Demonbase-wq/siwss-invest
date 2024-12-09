import { check, crypto } from "@/lib/airtable";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id, img } = await request.json();
    console.log({id, img})

    try {
        const record = await crypto.find(id as string);

        if (!record) {
            return Response.json({ errror: 'Crypto deposit not found.' }, { status: 200 });
        }

        await crypto.update([
            {
                id: record.id,
                fields: { img: img },
            },
        ]);

        return Response.json({ message: 'Your Crypto deposit request is being reviewed...' }, { status: 200 });

    } catch (error) {
        return Response.json({ error: 'Internal Server error' }, { status: 200 });
    }
}