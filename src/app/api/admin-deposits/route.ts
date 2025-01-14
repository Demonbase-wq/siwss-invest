import { NextResponse } from "next/server";
import { deposits } from "@/lib/airtable";

export async function GET() {
  try {
    const records = await deposits.select().all();
    const formattedRecords = records
      .filter((record) => Object.keys(record.fields).length > 0) // Filter out empty records
      .map((record) => ({
        id: record.id,
        ...record.fields,
      }));
      
    return NextResponse.json({ deposits: formattedRecords }, { status: 200 });
  } catch (error) {
    console.error("Error fetching deposits:", error);
    return NextResponse.json(
      { error: "Failed to fetch deposits" },
      { status: 200 }
    );
  }
}
