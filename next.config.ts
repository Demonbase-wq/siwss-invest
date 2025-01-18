import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "es", "fr", "de", "it"],
    defaultLocale: "en",
  },
  /* config options here */
};

export default nextConfig;
