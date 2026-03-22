import type { Metadata } from "next";
import { Bungee } from "next/font/google";
import "./globals.css";

export const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee",
});

export const metadata: Metadata = {
  title: "Portfolio OS",
  description: "A Pop!_OS inspired desktop portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bungee.variable}>
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
