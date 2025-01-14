import { NextResponse } from "next/server";
import {  users } from "@/lib/airtable";

export async function GET() {
  try {
    const records = await users.select().all();
    const formattedRecords = records
      .filter((record) => Object.keys(record.fields).length > 0) // Filter out empty records
      .map((record) => ({
        id: record.id,
        ...record.fields,
      }));

    return NextResponse.json(
      { users: formattedRecords },
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
