import { getInvestments } from "@/lib/airtable";
import { NextRequest } from "next/server";
import { auth } from "../../../../auth";


export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
      const investments = await getInvestments(session.user.id as string)
      if (investments) {
        return Response.json({investments: investments });
      } else {
        return Response.json({ error: 'Invalid id' });
      }
    
  } catch (error) {
    return Response.json({ error: error });
  }
}