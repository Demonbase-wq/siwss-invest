import { getTransactions } from "@/lib/airtable";
import { NextRequest } from "next/server";
import { auth } from "../../../../auth";


export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
      const transactions = await getTransactions(session.user.id as string)
      if (transactions) {
        return Response.json({ message: 'successful', transactions: transactions });
      } else {
        return Response.json({ error: 'Invalid id' });
      }
    
  } catch (error) {
    return Response.json({ error: error });
  }
}