import { NextResponse } from "next/server";
import { withdrawals } from "@/lib/airtable";

export async function GET() {
  try {
    const records = await withdrawals.select().all();
    const formattedRecords = records
      .filter((record) => Object.keys(record.fields).length > 0) // Filter out empty records
      .map((record) => ({
        id: record.id,
        ...record.fields,
      }));

    return NextResponse.json(
      { withdrawals: formattedRecords },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    return NextResponse.json(
      { error: "Failed to fetch withdrawals" },
      { status: 200 }
    );
  }
}
