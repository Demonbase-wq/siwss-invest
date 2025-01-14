"use client";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MarketInsights({ data }: any) {
  return (
    <div className="space-y-4">
      {data.news.map((newsItem: any) => (
        <Alert key={newsItem.id}>
          {/* Dynamic Icon Based on Category */}
          {newsItem.category.toLowerCase().includes("up") ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : newsItem.category.toLowerCase().includes("down") ? (
            <TrendingDown className="h-4 w-4 text-red-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-blue-500" />
          )}
          <AlertTitle>{newsItem.headline}</AlertTitle>
          <AlertDescription>
            {newsItem.summary}{" "}
            <a
              href={newsItem.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Read more
            </a>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
