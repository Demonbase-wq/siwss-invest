import { getReferrals } from "@/lib/airtable";
import { NextRequest } from "next/server";
import { auth } from "../../../../auth";


export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
      const referrals = await getReferrals(session.user.id as string)
      if (referrals) {
        return Response.json({ message: 'successful', referrals: referrals });
      } else {
        return Response.json({ error: 'Invalid id' });
      }
    
  } catch (error) {
    return Response.json({ error: error });
  }
}