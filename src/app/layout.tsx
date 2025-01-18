import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Cookie from "@/components/Landing/Cookie/Cookie";
import Providers from "./Provider";
import { TranslationProvider } from "@/translations/provider";
import { Toaster } from "sonner";
import HtmlWrapper from "./HtmlWrapper"; // Import the client component
import { LanguageProvider } from "@/components/Landing/Context/LanguageContext";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SwissPipsAI.",
  description: "Your Trusted Partner in Smart Investments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TranslationProvider>
      <LanguageProvider>
        <HtmlWrapper nunitoClass={nunito.className}>
          <Providers>
            <Cookie />
            {children}
            <Toaster />
          </Providers>
          <Script
            src="https://cryptorank.io/widget/marquee.js"
            strategy="lazyOnload"
          />
        </HtmlWrapper>
      </LanguageProvider>
    </TranslationProvider>
  );
}
