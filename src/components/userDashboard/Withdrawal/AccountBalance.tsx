import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/util";

export function AccountBalance({ balance }: any) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Account Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${formatNumber(balance)}</p>
      </CardContent>
    </Card>
  );
}
