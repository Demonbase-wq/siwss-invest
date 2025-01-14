"use client";

import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from "swr";
import { AccountBalance } from "./AccountBalance";
import { formatNumber } from "@/lib/util";
import axios from "axios";
import { toast } from "sonner";

const formSchema = z.object({
  amount: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Amount must be a positive number"),
  wallet_address: z.string().min(1, "Wallet address is required"),
  method: z.enum(["BTC", "ETH", "USDT"]),
  network: z.string().min(1, "Network is required"),
});

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WithdrawalForm() {
  const { data } = useSWR("/api/get-user", fetcher);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      wallet_address: "",
      method: "BTC",
      network: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const withdrawalAmount = parseFloat(values.amount);
    if (withdrawalAmount > data?.balance) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      const toastId = toast.loading("Processing withdrawal request");

      const response = await axios.post("/api/withdraw", values);
      const error = await response?.data.error;
      const message = await response?.data.message;

      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        form.reset();
      }
      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
      }
    } catch (error) {
      toast.error("Failed to process withdrawal. Please try again.");
    }
  }

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
    <div className="space-y-6">
      <AccountBalance balance={data?.balance} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the amount you wish to withdraw (max: $
                  {formatNumber(data?.balance)})
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wallet_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your wallet address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Withdrawal Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a withdrawal method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-primary">
                    <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                    <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                    <SelectItem value="USDT">Tether (USDT)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the network" {...field} />
                </FormControl>
                <FormDescription>
                  Specify the network for your withdrawal (e.g., ERC20, TRC20)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-accent" disabled={form.formState.isSubmitting}>
            Submit Withdrawal Request
          </Button>
        </form>
      </Form>
    </div>
  );
}
