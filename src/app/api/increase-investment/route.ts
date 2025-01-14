import { investmentsTable, users } from "@/lib/airtable";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function POST(req: Request) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { amount, investment_id, balance_type } = await req.json();

    // Fetch the current investment
    const investment = await investmentsTable.find(investment_id as string);

    // console.log(investment);

    if (!investment) {
      return NextResponse.json(
        { error: "Investment not found" },
        { status: 200 }
      );
    }

    const currentAmount = investment.get("amount") as number;
    const newAmount = currentAmount + amount;

    const roi = investment.fields.roi as number;
    // console.log(roi);
    const totalEarnings = newAmount + newAmount * roi;
    const netProfit = totalEarnings - newAmount;
    // console.log(netProfit, totalEarnings);

    // Update the investment
    await investmentsTable.update(investment.id, {
      amount: newAmount,
      total_earnings: totalEarnings,
      net_profit: netProfit,
    });

    // Update user's balance
    const user = await users.find(investment.fields.user_id as string)

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 200 });
    }

    const currentBalance = user.get(balance_type) as number;
    const newBalance = currentBalance - amount;

    await users.update(user.id, {
      [balance_type]: newBalance,
    });

    return NextResponse.json(
      { message: "Investment increased successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error increasing investment:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 200 });
  }
}
