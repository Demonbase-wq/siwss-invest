import { NextRequest } from "next/server";
import { auth } from "../../../../auth";
import { fetchMarketNews } from "@/lib/finnhub";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const category = "general";
    const news = await fetchMarketNews(category);
    return Response.json({ news }, { status: 200 });
  } catch (error) {
    return Response.json({ error: error });
  }
}
