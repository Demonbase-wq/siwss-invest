'use client'
import { Suspense } from "react"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ReferralStats from "@/components/ReferralStats"
import ReferralLink from "@/components/ReferralLink"
import EmailInvite from "@/components/EmailInvite"
import ReferralTable from "@/components/ReferralTable"
import { useTranslation } from "@/translations/provider"

export default function ReferralPage() {
const { translations } = useTranslation();

  return (
    <div className="container px-4 lg:pl-12 lg:px-0 py-6 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{translations?.dashboardRefer?.text1}</h1>
        <p className="text-muted-foreground">
        {translations?.dashboardRefer?.text2}
        </p>
      </div>

      <div className="grid gap-6">
        <Suspense fallback={<Skeleton className="h-[200px]" />}>
          <ReferralStats />
        </Suspense>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <ReferralLink />
          </Card>
          <Card className="p-6">
            <EmailInvite />
          </Card>
        </div>

        <Card className="p-6">
          <Suspense fallback={<Skeleton className="h-[400px]" />}>
            <ReferralTable />
          </Suspense>
        </Card>
      </div>
    </div>
  )
}

