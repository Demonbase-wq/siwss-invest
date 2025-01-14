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
      const success = await response.data.success;
      const error = await response.data.error;
      if (success) {
        toast.dismiss(toastId);
        toast.success(success);
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
          <DialogTitle>Confirm Your Investment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="col-span-4 text-sm">Plan: {plan.name}</span>
            <span className="col-span-4 text-sm">
              Estimated ROI: {plan.estimatedROI}%
            </span>
            <span className="col-span-4 text-sm">
              Duration: {plan.duration} weeks
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className=" text-sm">
              Investment Name
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
              Amount
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
              Projected Returns: ${calculateReturns().toFixed(2)}
            </div>
          )}
          <div className="text-sm">Your Balance: ${formatNumber(balance)}</div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Confirm Investment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
