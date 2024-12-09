import { users } from "@/lib/airtable";
import { auth } from "../../../../auth";

export async function POST(request: Request) {
    const { pin } = await request.json();
    console.log(pin)

    try {
        const records = await users.select({
            filterByFormula: `{pincode} = '${pin}'`,
        }).firstPage();

        if (records.length === 0) {
            return Response.json({ message: 'User not found.' }, { status: 404 });
        }

        const user = records[0];
        const vcode = user.fields.pincode?.toString()

        if (pin !== vcode) {
            return Response.json({ message: 'Invalid pincode.' }, { status: 401 });
        }

        return Response.json({ sucess: true }, { status: 200 });

    } catch (error) {
        console.log(error)
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
