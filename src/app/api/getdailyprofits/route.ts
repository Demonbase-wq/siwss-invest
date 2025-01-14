import { NextRequest } from "next/server";
import { getDailyProfits } from "@/lib/airtable";
import { auth } from "../../../../auth";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Extract the 'id' from the query parameters
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 200 });
    }

    // Call the function to get daily profits using the extracted 'id'
    const dailyProfits = await getDailyProfits(id);

    if (dailyProfits) {
      return Response.json({ dailyProfits }, { status: 200 });
    } else {
      return Response.json({ error: "not found" }, { status: 202 });
    }
  } catch (error) {
    console.error("Error fetching daily profits:", error);
    return Response.json({ error: error }, { status: 200 });
  }
}
