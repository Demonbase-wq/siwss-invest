"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { useTranslation } from "@/translations/provider";

const chartConfig = {
  chrome: {
    label: "Deposits",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Withdrawals",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function InvestmentPieChart({ data }: any) {
  const { translations } = useTranslation();
  // Process transactions to calculate total deposits and withdrawals
  const transactions = data?.transactions || [];
  const totalDeposits = transactions
    .filter(
      (transaction: any) =>
        transaction.fields.type === "Deposit" &&
        transaction.fields.status === "Approved"
    )
    .reduce((sum: any, transaction: any) => sum + transaction.fields.amount, 0);

  const totalWithdrawals = transactions
    .filter(
      (transaction: any) =>
        transaction.fields.type === "Withdrawal" &&
        transaction.fields.status === "Approved"
    )
    .reduce((sum: any, transaction: any) => sum + transaction.fields.amount, 0);

  // Chart data
  const chartData = [
    { name: "Deposits", amount: totalDeposits, fill: "var(--color-chrome)" },
    {
      name: "Withdrawals",
      amount: totalWithdrawals,
      fill: "var(--color-safari)",
    },
  ];

  return (
    <Card className="flex flex-col flex-grow">
      <CardHeader className="items-center pb-0">
        <CardTitle>{translations?.dashboardMain?.text17}</CardTitle>
        <CardDescription>{translations?.dashboardMain?.text18}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-[20px]">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
        {translations?.dashboardMain?.text19}
        </div>
      </CardFooter>
    </Card>
  );
}
