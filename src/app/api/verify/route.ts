import { users } from '@/lib/airtable';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    const { email, code } = await request.json();

    try {
        const records = await users.select({
            filterByFormula: `{email} = '${email}'`,
        }).firstPage();

        if (records.length === 0) {
            return Response.json({ message: 'User not found.' }, { status: 404 });
        }

        const user = records[0];
        const vcode = user.fields.verificationCode?.toString()

        if (vcode === code) {
            return Response.json({ user: user }, {status: 200});
        } else {
            return Response.json({ error: 'Invalid verification code.' }, {status: 401});
        }
    } catch (error) {
        return Response.json({ error: error});
    }
}