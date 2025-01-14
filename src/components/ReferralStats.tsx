'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/util";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function ReferralStats() {
  const { data } = useSWR("/api/get-user", fetcher);
  const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      if (data) {
        setLoading(false);
      }
    }, [data]);

    if (loading || !data) {
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

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(data?.referral_earnings)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">205</div>
          <p className="text-xs text-muted-foreground">
            200 verified, 5 pending
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">97.5%</div>
          <p className="text-xs text-muted-foreground">
            +2.5% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

