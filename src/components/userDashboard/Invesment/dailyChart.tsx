"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { DateTime } from "luxon"; // For timezone handling

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
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function DailyProfitChart({ id }: any) {
  const { data: dailyProfitsData } = useSWR(`/api/getdailyprofits?id=${id}`, fetcher);
  const { data: userData } = useSWR(`/api/get-user`, fetcher);

  // Get user's timezone or fallback to UTC
  const userTimezone = userData?.timezone || "UTC";

  // Transform backend response to chart-compatible format
  const chartData = dailyProfitsData?.dailyProfits
    .map((record: any) => {
      const localDate = DateTime.fromISO(record.fields.date, { zone: "UTC" })
        .setZone(userTimezone)
        .toFormat("MMM dd"); // Convert to user timezone and format date
      return {
        day: localDate,
        profit: record.fields.profit, // Extract profit
        rawDate: DateTime.fromISO(record.fields.date, { zone: "UTC" }), // Raw date for sorting
      };
    })
    .sort((a: any, b: any) => a.rawDate - b.rawDate); // Sort by raw date

  const chartConfig = {
    profit: {
      label: "",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full max-w-3xl mt-5">
      <CardHeader>
        <CardTitle>Daily Profits</CardTitle>
        <CardDescription>Investment Performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value.toFixed(2)}`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="profit"
              type="natural"
              stroke="var(--color-profit)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-profit)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Profits displayed for the last {chartData?.length || 0} days
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Hover over the chart to view exact profits per day.
        </div>
      </CardFooter>
    </Card>
  );
}
