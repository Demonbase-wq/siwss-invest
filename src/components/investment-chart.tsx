"use client";

import { GitCommitVertical } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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

// Helper function to process data
const processChartData = (dailyProfits: any[], timezone: string) => {
  // Group profits by date and sum them
  const groupedData: { [key: string]: number } = dailyProfits.reduce(
    (acc: { [key: string]: number }, profit: any) => {
      const date = new Date(profit.date).toLocaleString("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }); // Adjust to user's timezone
      acc[date] = (acc[date] || 0) + profit.profit;
      return acc;
    },
    {}
  );

  // Convert grouped data to array format for the chart
  const sortedData = Object.entries(groupedData)
    .map(([date, profit]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      timestamp: new Date(date).getTime(), // Use timestamp for sorting
      profit,
    }))
    .sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp

  return sortedData;
};

const chartConfig = {
  profit: {
    label: "",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function InvestmentChart({
  data,
  timezone = "UTC", // Default to UTC if no timezone is provided
}: {
  data: { dailyProfits: any[] };
  timezone?: string;
}) {
  const chartData = processChartData(data.dailyProfits, timezone);

  return (
    <Card className="flex-grow">
      <CardHeader>
        <CardTitle>Investment Daily Profits</CardTitle>
        <CardDescription>
          Daily total profits for all active investments
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 20,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="profit"
              type="monotone"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={({ cx, cy, payload }) => {
                const r = 8;
                return (
                  <GitCommitVertical
                    key={payload.timestamp}
                    x={cx - r / 2}
                    y={cy - r / 2}
                    width={r}
                    height={r}
                    fill="hsl(var(--background))"
                    stroke="hsl(var(--chart-1))"
                  />
                );
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total daily profits for all active investments.
        </div>
      </CardFooter>
    </Card>
  );
}
