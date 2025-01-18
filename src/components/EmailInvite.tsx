"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import useSWR from "swr";
import axios from "axios";
import { useTranslation } from "@/translations/provider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EmailInvite({ link }: any) {
  const [email, setEmail] = useState("");
  const { data } = useSWR("/api/get-user", fetcher);
  const [loading, setLoading] = React.useState(true);
  const { translations } = useTranslation();

  React.useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

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

  const referralLink = `https://www.swisspipsai.com/signup?ref=${data?.referral_code}`;

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== "" && emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email before submitting
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const toastId = toast.loading("Sending Invite");
    try {
      const response = await axios.post("/api/new-referral", {
        email,
        referralLink,
      });
      const message = response?.data.message;
      const error = response?.data.error;
      if (message) {
        toast.dismiss(toastId);
        toast.success(message);
        setEmail("");
      }
      if (error) {
        toast.dismiss(toastId);
        toast.error(error);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("An error occurred, please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">{translations?.dashboardRefer?.text9}</Label>
        <div className="flex space-x-2">
          <Input
            id="email"
            type="email"
            placeholder="friend@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="bg-accent shrink-0">
          {translations?.dashboardRefer?.text10}
          </Button>
        </div>
      </div>
    </form>
  );
}
