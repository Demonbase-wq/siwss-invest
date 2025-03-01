import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/util";
import { useTranslation } from "@/translations/provider";

export function AccountBalance({ balance }: any) {
  const { translations } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{translations?.dashboardWithdraw?.text2}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">${formatNumber(balance)}</p>
      </CardContent>
    </Card>
  );
}
