import { NextResponse } from "next/server";
import { kyc } from "@/lib/airtable";

export async function GET() {
  try {
    const records = await kyc.select().all();
    const formattedRecords = records
      .filter((record) => Object.keys(record.fields).length > 0) // Filter out empty records
      .map((record) => ({
        id: record.id,
        ...record.fields,
      }));

    return NextResponse.json(
      { kycRequests: formattedRecords },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching KYC requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch KYC requests" },
      { status: 200 }
    );
  }
}
