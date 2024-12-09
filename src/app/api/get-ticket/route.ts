import { getTickets } from "@/lib/airtable";
import { auth } from "../../../../auth";


export async function GET(req: Request) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
      const tickets = await getTickets(session.user.id as string)
      if (tickets) {
        return Response.json({ message: 'successful', tickets: tickets });
      } else {
        return Response.json({ error: 'Invalid id' });
      }
  } catch (error) {
    return Response.json({ error: error });
  }
}