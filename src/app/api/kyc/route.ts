import { NextRequest } from "next/server";
import { auth } from "../../../../auth";
import { kyc, users } from "@/lib/airtable";


export async function POST(req: NextRequest) {
    const session = await auth();

    if (!session) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
        ssn,
        idNumber,
        idFront,
        idBack,
        passportPhoto,
        credentialsNotExpired,
        documentVisible,
    } = await req.json();

    if(!credentialsNotExpired){
        return Response.json({ error: 'Credentials Expired.' }, { status: 500 });
    }

    if(!documentVisible){
        return Response.json({ error: 'Document Is Not Visible.' }, { status: 500 });
    }

    try {
        const user = await users.find(session.user.id as string)

        if (!user) {
            return Response.json({ error: 'User not found.' }, { status: 404 });
        }

        await kyc.create([{
            fields: {
              ssn: ssn,
              id_number: idNumber,
              passport: passportPhoto,
              front: idFront,
              back: idBack,
              user_id: user.id,
              user_name: session.user.name as string,
            },
        }]);

        await users.update([
            {
                id: user.id,
                fields: {
                    kyc_pending: 'YES'
                },
            },
        ]);

        return Response.json({message: 'KYC data saved successfully'}, { status: 200 });
    } catch (error) {
        console.error('Error saving KYC data:', error);
        return Response.json({ error: 'Error saving KYC data' });
    }
}