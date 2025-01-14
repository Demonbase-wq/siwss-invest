'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/util";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReferralStats() {
  const { data } = useSWR("/api/get-user", fetcher); // Fetch user details
  const { data: referrals } = useSWR("/api/get-referrals", fetcher); // Fetch referrals
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (data && referrals) {
      setLoading(false);
    }
  }, [data, referrals]);

  // Calculate stats
  const totalReferrals = referrals?.referrals?.length || 0;
  const verifiedReferrals = referrals?.referrals?.filter(
    (referral: any) => referral.fields.status === "Verified"
  ).length || 0;
  const pendingReferrals = totalReferrals - verifiedReferrals;
  const conversionRate =
    totalReferrals > 0
      ? ((verifiedReferrals / totalReferrals) * 100).toFixed(1)
      : "0.0"; // Prevent division by zero


  if (loading || !data || !referrals) {
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
      {/* Total Earnings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${formatNumber(data?.referral_earnings)}</div>
        </CardContent>
      </Card>

      {/* Total Referrals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalReferrals}</div>
          <p className="text-xs text-muted-foreground">
            {verifiedReferrals} verified, {pendingReferrals} pending
          </p>
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{conversionRate}%</div>
        </CardContent>
      </Card>
    </div>
  );
}
