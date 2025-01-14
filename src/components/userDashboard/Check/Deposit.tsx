"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { toast } from "sonner";
import { BTCIcon, USDTIcon } from "@/lib/util";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  currency: z.enum(["BTC", "USDT"]),
  amount: z.string().min(1, "Amount is required"),
  walletAddress: z.string().min(1, "Wallet address is required"),
  transactionHash: z.string().min(1, "Transaction hash is required"),
});

const walletAddresses = {
  BTC: "bc1q3fav2vcee5cjv88xnjllwkulx4x0zcj0gyalvm",
  USDT: "0x1fe419143B8156DfA18779D9d6Ca4678CDBF69e3",
};

const currencyIcons = {
  BTC: BTCIcon,
  USDT: USDTIcon,
};

export default function DepositForm() {
  const [selectedCurrency, setSelectedCurrency] =
    useState<keyof typeof walletAddresses>("BTC");
//   const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "BTC",
      amount: "",
      walletAddress: walletAddresses.BTC,
      transactionHash: "",
    },
  });

  useEffect(() => {
    form.setValue("walletAddress", walletAddresses[selectedCurrency]);
  }, [selectedCurrency, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Submitting deposit...");

    try {
      const res = await axios.post("/api/crypto-deposit", values);
      const message = await res.data.message;
      const err = await res.data.error;
      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        form.reset({
          currency: "BTC",
          amount: "",
          walletAddress: walletAddresses.BTC,
          transactionHash: "",
        });
        setSelectedCurrency("BTC");

        router.push("/dashboard/history");
      }
      if (err) {
        toast.dismiss(toastId);
        toast.error(err);
      }
    } catch (error) {
      toast.error("Failed to submit deposit. Please try again.");
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Wallet address copied to clipboard!");
  };

  const CurrencyIcon = currencyIcons[selectedCurrency];

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Deposit Cryptocurrency</CardTitle>
        <CardDescription>
          Choose your preferred currency and follow the steps to make a deposit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Currency</FormLabel>
                  <Select
                    onValueChange={(value: keyof typeof walletAddresses) => {
                      field.onChange(value);
                      setSelectedCurrency(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl className="p-6">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-primary">
                      {Object.keys(walletAddresses).map((currency) => {
                        const Icon =
                          currencyIcons[currency as keyof typeof currencyIcons];
                        return (
                          <SelectItem key={currency} value={currency}>
                            <div className="flex items-center">
                              <Icon />
                              <span className="ml-2">{currency}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-4 bg-random rounded-lg space-y-4">
              <div className="flex items-center space-x-4">
                <CurrencyIcon />
                <div className="flex-grow">
                  <p className="text-sm font-medium">Deposit Address</p>
                  <p className="text-xs text-muted-foreground break-all">
                    {walletAddresses[selectedCurrency]}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    copyToClipboard(walletAddresses[selectedCurrency])
                  }
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={walletAddresses[selectedCurrency]}
                  size={200}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl className="p-6">
                    <Input placeholder="Enter deposit amount" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the amount you've deposited in {selectedCurrency}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deposit Wallet Address</FormLabel>
                  <FormControl className="p-6">
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormDescription>
                    This is the address you're sending funds to.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionHash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Hash</FormLabel>
                  <FormControl className="p-6">
                    <Input placeholder="Enter transaction hash" {...field} />
                  </FormControl>
                  <FormDescription>
                    The unique identifier for your transaction.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button className="bg-accent hover:bg-accent" onClick={form.handleSubmit(onSubmit)}>
          I Have Paid
        </Button>
      </CardFooter>
    </Card>
  );
}
