import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Rendered server-side by app/api/cv (CV PDF download)
  serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
