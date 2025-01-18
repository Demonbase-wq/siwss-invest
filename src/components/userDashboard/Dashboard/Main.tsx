"use client";
import useSWR from "swr";
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MinusCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InvestmentChart from "@/components/investment-chart";
import MarketInsights from "@/components/market-insights";
import { formatNumber } from "@/lib/util";
import InvestmentPieChart from "@/components/InvestmentPieChart";
import React from "react";
import Link from "next/link";
import { useTranslation } from "@/translations/provider";

interface KPI {
  label: string;
  value: number;
  change: number;
  trend: "up" | "down";
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { data: investments } = useSWR("/api/get-investments", fetcher);
  const { data: transactions } = useSWR("/api/transactions", fetcher);
  const { data: user } = useSWR("/api/get-user", fetcher);
  const { data: dailyProfits } = useSWR(`/api/userdailyprofits`, fetcher);
  const { data: marketNews } = useSWR(`/api/market-news`, fetcher);
  const [loading, setLoading] = React.useState(true);
  const { translations } = useTranslation();

  React.useEffect(() => {
    if (investments && transactions && user && dailyProfits && marketNews) {
      setLoading(false);
    }
  }, [investments, transactions, user, dailyProfits, marketNews]);

  if (
    loading ||
    !investments ||
    !transactions ||
    !user ||
    !dailyProfits ||
    !marketNews
  ) {
    return (
      <dialog
        id="loading-modal"
        className={`modal bg-primary ${loading ? "opacity-100" : ""}`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="loading loading-dots loading-lg bg-white"></span>
        </div>
      </dialog>
    );
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  // Convert yesterday's date to ISO format without time
  const yesterdayISO = yesterday.toISOString().split("T")[0];

  // Calculate total profits from the previous day
  // const yesterdayProfits =
  //   dailyProfits?.dailyProfits
  //     .filter((profit: any) => profit.date.startsWith(yesterdayISO)) // Adjusted to check for the date prefix
  //     .reduce((sum: number, profit: any) => sum + profit.profit, 0) || 0;

  // 1. Calculate Portfolio Value
  const portfolioValue = investments.investments
    .filter((investment: any) => investment.fields.status === "Active")
    .reduce(
      (sum: number, investment: any) => sum + investment.fields.amount,
      0
    );

  // 1. Calculate Total Expected Profit
  const totalExpectedProfit = investments.investments
    .filter((investment: any) => investment.fields.status === "Active")
    .reduce(
      (sum: number, investment: any) =>
        sum + investment.fields.amount * investment.fields.roi,
      0
    );

  // 2. Calculate Total Earned So Far
  const totalEarned = dailyProfits.dailyProfits.reduce(
    (sum: number, profit: any) => sum + profit.profit,
    0
  );

  // 3. Calculate Yesterday's Profit
  const yesterdayProfits = dailyProfits.dailyProfits
    .filter((profit: any) => profit.date.startsWith(yesterdayISO))
    .reduce((sum: number, profit: any) => sum + profit.profit, 0);

  // 4. Calculate Net Profit Percentage So Far
  const netProfitPercentage = totalExpectedProfit
    ? ((totalEarned / totalExpectedProfit) * 100).toFixed(2)
    : 0;

  // 5. Calculate Yesterday's Additional Percentage
  const yesterdayProfitPercentage = totalExpectedProfit
    ? ((yesterdayProfits / totalExpectedProfit) * 100).toFixed(2)
    : 0;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight mb-4">
        {translations?.dashboardMain?.text1}
      </h2>

      {/* KPIs Section */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Current Balance Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {translations?.dashboardMain?.text2}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="text-2xl font-bold">
                ${formatNumber(user?.balance)}
              </div>
              <div
                className={`flex items-center ${
                  yesterdayProfits >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {yesterdayProfits >= 0 ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  ${yesterdayProfits.toLocaleString()}{" "}
                  {translations?.dashboardMain?.text3}
                </span>
              </div>
            </div>
            <div className="flex-col gap-3 flex ">
              <div>
                <Link href="/dashboard/deposit">
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />{" "}
                    {translations?.dashboardMain?.text4}
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/dashboard/withdraw">
                  <Button variant="outline" className="w-full">
                    <MinusCircle className="mr-2 h-4 w-4" />{" "}
                    {translations?.dashboardMain?.text5}
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/dashboard/investments/new">
                  <Button variant="secondary" className="w-full">
                    <TrendingUp className="mr-2 h-4 w-4" />{" "}
                    {translations?.dashboardMain?.text6}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Portfolio Value and Net Profit Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {translations?.dashboardMain?.text7}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col gap-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {translations?.dashboardMain?.text8}
                </span>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold">
                ${portfolioValue.toLocaleString()}
              </div>
              <p className="text-xs flex items-center gap-3 text-green-500">
                +{netProfitPercentage}% <TrendingUp className="mr-2 h-4 w-4" />
              </p>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {translations?.dashboardMain?.text9}
                </span>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold">
                ${totalEarned.toLocaleString()} ({netProfitPercentage}%)
              </div>
              <p className="text-xs text-green-500">
                +{yesterdayProfitPercentage}%{" "}
                {translations?.dashboardMain?.text3}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ROI and Referral Profit Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              {translations?.dashboardMain?.text10}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col gap-3">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {translations?.dashboardMain?.text11}
                </span>
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-2xl font-bold flex items-center text-green-500 gap-5">
                {netProfitPercentage}% <TrendingUp className="mr-2 h-4 w-4" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {translations?.dashboardMain?.text12}
                </span>
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-2xl font-bold">
                ${formatNumber(user?.referral_earnings)}
              </div>
            </div>
            <Link href="/dashboard/refer&earn">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />{" "}
                {translations?.dashboardMain?.text13}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="flex flex-col md:flex-row items-start gap-4 w-full">
        <div className="w-full lg:w-[60%]">
          <InvestmentChart data={dailyProfits} timezone={user?.timezone} />
        </div>

        <div className="w-full lg:w-[40%]">
          <InvestmentPieChart data={transactions} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-start gap-4 w-full">
        {/* Market Insights Card */}
        <Card className="w-full lg:w-[60%]">
          <CardHeader>
            <CardTitle>{translations?.dashboardMain?.text20}</CardTitle>
          </CardHeader>
          <CardContent>
            <MarketInsights data={marketNews} />
          </CardContent>
        </Card>

        {/* Investment Breakdown Card */}
        <Card className="w-full lg:w-[40%]">
          <CardHeader>
            <CardTitle>{translations?.dashboardMain?.text21}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Process and display active investments */}
              {investments?.investments
                .filter(
                  (investment: any) => investment.fields.status === "Active"
                )
                .map((investment: any) => {
                  // Calculate total profit earned so far for this investment
                  const totalProfitEarned = dailyProfits?.dailyProfits
                    .filter(
                      (profit: any) => profit.investment_id === investment.id
                    )
                    .reduce(
                      (sum: number, profit: any) => sum + profit.profit,
                      0
                    );

                  // Calculate current profit ROI as a percentage
                  const expectedTotalProfit =
                    investment.fields.amount * investment.fields.roi;
                  const currentProfitROI = expectedTotalProfit
                    ? ((totalProfitEarned / expectedTotalProfit) * 100).toFixed(
                        2
                      )
                    : 0;

                  return (
                    <div key={investment.id} className="flex items-center">
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {investment.fields.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${investment.fields.amount.toLocaleString()}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center gap-4 font-medium text-green-500">
                        {currentProfitROI}% <TrendingUp className="h-4 w-4" />
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
