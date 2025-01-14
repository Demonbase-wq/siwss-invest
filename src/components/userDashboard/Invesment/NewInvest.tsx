"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Timer, Percent, CheckCircle } from "lucide-react";
import Link from "next/link";
import { InvestmentPlan } from "@/lib/investment";
import InvestmentModal from "@/components/investment-modal";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const investmentPlans: InvestmentPlan[] = [
  {
    name: "Starter Plan",
    minDeposit: 500,
    maxDeposit: 1900,
    duration: 6,
    estimatedROI: 30,
    features: [
      "AI-powered trading algorithms",
      "Low-risk investment strategy",
      "Weekly performance reports",
    ],
  },
  {
    name: "Growth Plan",
    minDeposit: 2000,
    maxDeposit: 24900,
    duration: 6,
    estimatedROI: 30,
    features: [
      "Advanced AI optimization",
      "Moderate-risk investment strategy",
      "Daily performance updates",
      "Priority customer support",
    ],
  },
  {
    name: "Premium Plan",
    minDeposit: 25000,
    maxDeposit: Infinity,
    duration: 4,
    estimatedROI: 20,
    features: [
      "Cutting-edge AI trading algorithms",
      "Customized risk-adjusted strategy",
      "Real-time performance tracking",
      "Dedicated account manager",
      "Exclusive market insights",
    ],
  },
];

export default function NewInvest() {
  const { data } = useSWR("/api/get-user", fetcher);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);

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
      <Button asChild className="mb-6">
        <Link href="/dashboard/investments">← Back to Investments</Link>
      </Button>
      <h1 className="text-3xl font-bold mb-6">Choose an Investment Plan</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {investmentPlans.map((plan, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="space-y-2">
                <span className="text-sm text-muted-foreground">
                  Deposit Range
                </span>
                <p className="text-2xl font-semibold">
                  ${plan.minDeposit.toLocaleString()} -{" "}
                  {plan.maxDeposit === Infinity
                    ? "∞"
                    : `$${plan.maxDeposit.toLocaleString()}`}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Timer className="w-4 h-4 mr-2 text-white" />
                  <span>{plan.duration} weeks</span>
                </div>
                <div className="flex items-center text-green-500">
                  <Percent className="w-4 h-4 mr-1" />
                  <span className="font-semibold">
                    Estimated ROI: {plan.estimatedROI}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-sm font-semibold">Key Features:</span>
                <ul className="space-y-1">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-random"
                onClick={() => setSelectedPlan(plan)}
              >
                Select Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedPlan && (
        <InvestmentModal
          plan={selectedPlan}
          balance={data?.balance}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
