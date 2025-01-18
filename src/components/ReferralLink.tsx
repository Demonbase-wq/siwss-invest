"use client"

import React, { useState } from "react"
import { Check, Copy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import useSWR from "swr"
import { useTranslation } from "@/translations/provider"

const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function ReferralLink() {
  const [copied, setCopied] = useState(false)
  const { data, error } = useSWR("/api/get-user", fetcher);
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="referral-link">{translations?.dashboardRefer?.text8}</Label>
        <div className="flex space-x-2">
          <Input
            id="referral-link"
            readOnly
            value={referralLink}
            className="font-mono text-sm"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            className="shrink-0"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy referral link</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

