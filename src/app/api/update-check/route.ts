import { check } from "@/lib/airtable";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
    const session = await auth();
    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { id, img } = await request.json();

    try {
        const record = await check.find(id as string);

        if (!record) {
            return Response.json({ errror: 'Check deposit not found.' }, { status: 200 });
        }

        await check.update([
            {
                id: record.id,
                fields: { img: img },
            },
        ]);

        return Response.json({ message: 'Your check deposit request is being reviewed...' }, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Internal Server error' }, { status: 200 });
    }
}