"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { InvestmentPlan } from "@/lib/investment";
import axios from "axios";
import { toast } from "sonner";
import { formatNumber } from "@/lib/util";
import { useTranslation } from "@/translations/provider";

interface InvestmentModalProps {
  plan: InvestmentPlan;
  balance: any;
  onClose: () => void;
}

interface InvestmentDetails {
  name: string;
  amount: number;
  estimatedROI: number;
  duration: number;
}

export default function InvestmentModal({
  plan,
  balance,
  onClose,
}: InvestmentModalProps) {
  const [investmentDetails, setInvestmentDetails] = useState<InvestmentDetails>(
    {
      name: "",
      amount: 0,
      estimatedROI: plan.estimatedROI,
      duration: plan.duration,
    }
  );
  const [error, setError] = useState("");
  const { translations } = useTranslation();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvestmentDetails((prev) => ({ ...prev, [name]: value }));
    setError("");

    if (name === "amount") {
      const numValue = parseFloat(value);
      if (
        isNaN(numValue) ||
        numValue < plan.minDeposit ||
        numValue > plan.maxDeposit
      ) {
        setError(
          `Please enter an amount between $${plan.minDeposit} and $${plan.maxDeposit}`
        );
      }
    }
  };

  const calculateReturns = () => {
    return investmentDetails.amount * (1 + plan.estimatedROI / 100);
  };

  const handleSubmit = async () => {
    if (!investmentDetails.name.trim()) {
      setError("Please enter a name for your investment");
      return;
    }

    if (
      isNaN(investmentDetails.amount) ||
      investmentDetails.amount < plan.minDeposit ||
      investmentDetails.amount > plan.maxDeposit
    ) {
      setError(
        `Please enter an amount between $${plan.minDeposit} and $${plan.maxDeposit}`
      );
      return;
    }

    if (investmentDetails.amount > balance) {
      setError(
        "You don't have sufficient funds. Please deposit and try again."
      );
      return;
    }

    const data = {
      name: investmentDetails.name,
      amount: parseFloat(investmentDetails.amount.toString()),
      estimatedROI: plan.estimatedROI,
      duration: plan.duration,
    };

    const toastId = toast.loading("Processing your investment...");

    try {
      const response = await axios.post("/api/new-investment", data);
      const message = await response.data.message;
      const error = await response.data.error;
      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        setInvestmentDetails({
          name: "",
          amount: 0,
          estimatedROI: plan.estimatedROI,
          duration: plan.duration,
        });
        router.push("/dashboard/investments");
      }
      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to create new investment. Please try again.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{translations?.newInvestment?.text18}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-4 text-sm">{translations?.newInvestment?.text19}: {plan.name}</span>
            <span className="col-span-4 text-sm">
              {translations?.newInvestment?.text4}: {plan.estimatedROI}%
            </span>
            <span className="col-span-4 text-sm">
              {translations?.newInvestment?.text20}: {plan.duration} weeks
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className=" text-sm">
              {translations?.newInvestment?.text21}
            </label>
            <Input
              id="name"
              name="name"
              value={investmentDetails.name}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder="Enter investment name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="amount" className="text-sm">
              {translations?.newInvestment?.text22}
            </label>
            <Input
              id="amount"
              name="amount"
              type="number"
              value={investmentDetails.amount || ""}
              onChange={handleInputChange}
              className="col-span-3"
              placeholder={`Min: $${plan.minDeposit}`}
              min={plan.minDeposit}
              max={plan.maxDeposit}
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          {!error && investmentDetails.amount > 0 && (
            <div className="text-sm">
              {translations?.newInvestment?.text26}: ${calculateReturns().toFixed(2)}
            </div>
          )}
          <div className="text-sm">{translations?.newInvestment?.text23}: ${formatNumber(balance)}</div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {translations?.newInvestment?.text24}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
