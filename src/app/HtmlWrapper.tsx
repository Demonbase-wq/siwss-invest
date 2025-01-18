"use client";

import React from "react";
import { useTranslation } from "@/translations/provider";

export default function HtmlWrapper({
  children,
}: {
  children: React.ReactNode;
  nunitoClass: string;
}) {
  const { lang = "en" } = useTranslation() || {}; // Fallback to "en" if undefined

  return (
    <html lang={lang} className={` lang-${lang}`}>
      <body>{children}</body>
    </html>
  );
}
