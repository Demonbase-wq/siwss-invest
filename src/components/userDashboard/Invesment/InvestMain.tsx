'use client'
import InvestmentCard from "@/components/investment-card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/translations/provider";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function InvestMain() {
  const { data } = useSWR("/api/get-investments", fetcher);
  const { data : userData } = useSWR("/api/get-user", fetcher);
  const [loading, setLoading] = useState(true);
    const { translations } = useTranslation();
  

  useEffect(() => {
    if (data && userData) {
      setLoading(false);
    }
  }, [data, userData]);

  const investments = data?.investments || [];


  return (
    <div className="container mx-auto px-4 py-8">
      <dialog
        id="loading-modal"
        className={`modal bg-primary ${loading ? "opacity-100" : ""}`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className="loading loading-dots loading-lg bg-white"></span>
        </div>
      </dialog>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] md:text-3xl font-bold">{translations?.dashboardInvestment?.text1}</h1>
        <Button asChild>
          <Link href="/dashboard/investments/new">{translations?.dashboardInvestment?.text2}</Link>
        </Button>
      </div>
      {investments.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {investments.map((investment: any) => (
                <InvestmentCard key={investment.id} investment={investment} userTimezone={userData?.timezone}/>
              ))}
            </div>
      ) : (<div>
        <h1 className="text-center text-[20px] md:text-[22px] mt-[50px] md:mt-[90px]">You have no active investments.</h1>
          </div>
        )}
    </div>
  );
}
