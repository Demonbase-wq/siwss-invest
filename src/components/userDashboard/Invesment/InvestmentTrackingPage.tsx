"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, Timer, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import { DateTime } from "luxon";
import { DailyProfitChart } from "./dailyChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { formatNumber } from "@/lib/util";
import { useTranslation } from "@/translations/provider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function InvestmentTrackingPage() {
  const { data, mutate } = useSWR("/api/get-investments", fetcher);
  const { data: userData } = useSWR("/api/get-user", fetcher);
  const [id, setId] = useState<string | null>(null);
  const { translations } = useTranslation();

  // Extract token from URL on the client
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idFromUrl = urlParams.get("id");
    if (idFromUrl) setId(idFromUrl);
  }, [id]);

  const { data: dailyProfitsResponse } = useSWR(
    `/api/getdailyprofits?id=${id}`,
    fetcher
  );

  const [loading, setLoading] = useState(true);
  const [investment, setInvestment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [increaseAmount, setIncreaseAmount] = useState("");
  const [selectedBalance, setSelectedBalance] = useState("");

  useEffect(() => {
    if (id && data) {
      const foundInvestment = data?.investments?.find(
        (transaction: any) => transaction.id === id
      );
      setInvestment(foundInvestment);
      setLoading(false);
    }
  }, [id, data]);

  const timezone = userData?.timezone || "UTC";

  const handleIncreaseInvestment = async () => {
    if (!increaseAmount || !selectedBalance) {
      toast.error("Please fill in all fields");
      return;
    }

    const amount = parseFloat(increaseAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const availableBalance =
      selectedBalance === "balance"
        ? userData.balance
        : userData.referral_earnings;
    if (amount > availableBalance) {
      toast.error("Insufficient funds");
      return;
    }

    const toastId = toast.loading("Increasing investment...");

    try {
      const response = await axios.post("/api/increase-investment", {
        amount,
        investment_id: id,
        balance_type: selectedBalance,
      });
      const message = response.data.message;
      const error = response.data.error;
      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        setIsModalOpen(false);
        setIncreaseAmount("");
        setSelectedBalance("");
        mutate("/api/get-investments");
      }
      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
        setIsModalOpen(false);
        setIncreaseAmount("");
        setSelectedBalance("");
      }
    } catch (error) {
      setIsModalOpen(false);
      setIncreaseAmount("");
      setSelectedBalance("");
      toast.error("Failed to increase investment");
    }
  };

  if (loading || !investment) {
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

  const startDate = DateTime.fromISO(investment.fields.start_date).setZone(
    timezone
  );
  const endDate = DateTime.fromISO(investment.fields.end_date).setZone(
    timezone
  );

  const formattedStartDate = startDate.toLocaleString(DateTime.DATE_MED);
  const formattedEndDate = endDate.toLocaleString(DateTime.DATE_MED);

  const now = DateTime.now().setZone(timezone);

  const totalDuration = endDate.diff(startDate, "days").days;
  const elapsed = Math.max(0, now.diff(startDate, "days").days);
  const progress = Math.min(100, (elapsed / totalDuration) * 100);

  const daysLeft = Math.max(0, Math.floor(totalDuration - elapsed));

  const dailyProfits = dailyProfitsResponse?.dailyProfits || [];
  const currentProfit = dailyProfits.reduce(
    (sum: any, record: any) => sum + record.fields.profit,
    0
  );

  const totalExpectedProfit = investment.fields.amount * investment.fields.roi;
  const currentPercentage = (
    (currentProfit / totalExpectedProfit) *
    100
  ).toFixed(2);

  

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild className="mb-6">
        <Link href="/dashboard/investments">← {translations?.dashboardInvestmentDetail?.text1}</Link>
      </Button>
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl capitalize">
            {investment.fields.name}
          </CardTitle>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent">{translations?.dashboardInvestmentDetail?.text2}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{translations?.dashboardInvestmentDetail?.text2}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="amount" className="text-right">
                  {translations?.dashboardInvestmentDetail?.text13}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    className="col-span-3"
                    value={increaseAmount}
                    onChange={(e) => setIncreaseAmount(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="balance" className="text-right">
                  {translations?.dashboardInvestmentDetail?.text14}
                  </Label>
                  <Select
                    onValueChange={setSelectedBalance}
                    value={selectedBalance}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder={translations?.dashboardInvestmentDetail?.text16} />
                    </SelectTrigger>
                    <SelectContent className="bg-primary">
                      <SelectItem value="balance">
                      {translations?.dashboardInvestmentDetail?.text15} (${formatNumber(userData?.balance)})
                      </SelectItem>
                      <SelectItem value="referral_earnings">
                      {translations?.dashboardMain?.text12} ($
                        {formatNumber(userData?.referral_earnings)})
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="bg-accent" onClick={handleIncreaseInvestment}>
              {translations?.dashboardInvestmentDetail?.text2}
              </Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
              {translations?.dashboardInvestmentDetail?.text3}
              </span>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-white" />
                <span className="text-2xl font-semibold">
                  ${investment.fields.amount.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">
              {translations?.dashboardInvestmentDetail?.text4}
              </span>
              <div className="flex items-center text-green-500">
                <ArrowUpRight className="w-5 h-5 mr-2" />
                <span className="text-2xl font-semibold">
                  ${currentProfit.toFixed(2)} ({currentPercentage}%)
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{translations?.dashboardInvestment?.text4}</span>
              <span className="text-sm font-medium">
                {progress.toFixed(0)}%
              </span>
            </div>
            <Progress value={progress} className="w-full bg-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">{translations?.dashboardInvestmentDetail?.text5}</span>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-white" />
                <span className="font-medium">{formattedStartDate}</span>
              </div>
            </div>
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">{translations?.dashboardInvestmentDetail?.text6}</span>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-white" />
                <span className="font-medium">{formattedEndDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-5">
            <Timer className="w-5 h-5 mr-2 text-white" />
            <span className="text-lg font-medium">
              {daysLeft > 0 ? `${daysLeft} ${translations?.dashboardInvestmentDetail?.text7}` : "Completed"}
            </span>
          </div>
        </CardContent>
      </Card>

      <DailyProfitChart id={id} />
    </div>
  );
}
