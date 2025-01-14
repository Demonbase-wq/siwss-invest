import { dailyProfits, investmentsTable } from "@/lib/airtable";
import { NextRequest } from "next/server";
import { auth } from "../../../../auth";

export async function GET(req: NextRequest) {
  const session = await auth(); // Replace with your session/auth method
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const userId = session.user.id;

    // Fetch all active investments of the user
    const activeInvestments = await investmentsTable
      .select({
        filterByFormula: `AND({user_id} = '${userId}', {status} = 'Active')`,
      })
      .all();

    const activeInvestmentIds = activeInvestments.map(
      (investment) => investment.id
    );

    if (activeInvestmentIds.length === 0) {
      return Response.json({ dailyProfits: [] }, { status: 200 });
    }

    // Fetch all daily profits for active investments
    const dailyProfitsRecords = await dailyProfits
      .select({
        filterByFormula: `OR(${activeInvestmentIds
          .map((id) => `{investment_id} = '${id}'`)
          .join(",")})`,
      })
      .all();

    const dailyProfitsData = dailyProfitsRecords.map((record) => ({
      id: record.id,
      ...record.fields,
    }));

    return Response.json({ dailyProfits: dailyProfitsData }, { status: 200 });
  } catch (error) {
    console.error("Error fetching daily profits:", error);
    return Response.json({ error: error }, { status: 500 });
  }
}
