'use client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Timer } from "lucide-react";
import Link from "next/link";
import { DateTime } from "luxon"; // For timezone handling
import useSWR from "swr"; // Fetch daily profits
import { useTranslation } from "@/translations/provider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface InvestmentCardProps {
  investment: {
    id: string;
    fields: {
      name: string;
      amount: number;
      roi: number;
      duration: number;
      start_date: string;
      end_date: string;
      total_earnings?: number; // Optional for future use
      net_profit?: number; // Optional for future use
    };
  };
  userTimezone: string; // Pass user's timezone as a prop
}

export default function InvestmentCard({
  investment,
  userTimezone,
}: InvestmentCardProps) {
  const { fields } = investment;
      const { translations } = useTranslation();
  

  // Fetch daily profits for the investment
  const { data: dailyProfitsResponse } = useSWR(
    `/api/getdailyprofits?id=${investment.id}`,
    fetcher
  );

  const dailyProfits = dailyProfitsResponse?.dailyProfits || [];

  // Calculate total profit earned so far
  const totalProfitEarned = dailyProfits.reduce(
    (sum: number, record: any) => sum + parseFloat(record.fields.profit || "0"),
    0
  );

  // Calculate total expected profit
  const totalExpectedProfit = fields.amount * fields.roi;

  // Calculate percentage earned so far
  const percentageEarned = totalExpectedProfit
    ? ((totalProfitEarned / totalExpectedProfit) * 100).toFixed(2)
    : "0";

  // Parse dates and convert them to the user's timezone
  const startDate = DateTime.fromISO(fields.start_date, { zone: "UTC" })
    .setZone(userTimezone)
    .startOf("day"); // Start of the day in user's timezone

  const endDate = DateTime.fromISO(fields.end_date, { zone: "UTC" })
    .setZone(userTimezone)
    .startOf("day");

  const now = DateTime.now().setZone(userTimezone).startOf("day");

  // Calculate progress
  const totalDuration = endDate.diff(startDate, "days").days; // Total duration in days
  let elapsed = now.diff(startDate, "days").days; // Elapsed days
  elapsed = Math.max(0, elapsed); // Ensure elapsed is non-negative

  const progress = Math.min(100, (elapsed / totalDuration) * 100);

  // Calculate total days, elapsed days, and days left
  const totalDays = Math.ceil(totalDuration);
  const elapsedDays = Math.ceil(elapsed);

  let daysLeft;
  if (now < startDate) {
    daysLeft = totalDays; // Investment hasn't started yet
  } else if (now >= endDate) {
    daysLeft = 0; // Investment has ended
  } else {
    daysLeft = totalDays - elapsedDays; // Ongoing investment
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="capitalize">{fields.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">{translations?.dashboardInvestment?.text3}</span>
          <span className="font-semibold">
            ${fields.amount.toLocaleString()}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{translations?.dashboardInvestment?.text4}</span>
            <span className="text-sm font-medium">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="w-full bg-white" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Timer className="w-4 h-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {daysLeft > 0 ? `${daysLeft} days left` : "Completed"}
            </span>
          </div>
          <div className="flex items-center text-green-500">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span className="font-semibold">
              {percentageEarned}% 
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-accent">
          <Link href={`/dashboard/investments/investment?id=${investment.id}`}>
          {translations?.dashboardInvestment?.text5}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
