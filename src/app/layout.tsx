import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";

import { SiteHeader } from "@/components/site-header";
import { QuantumCat } from "@/components/quantum-cat";
import { VisitorCount } from "@/components/visitor-count";

import "./globals.css";

export const metadata: Metadata = {
  title: "eigenstate — akhil",
  description:
    "A minimal placeholder portfolio about mathematical physics, scientific computing, and small useful programs.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistMono.variable}>
      <body>
        <SiteHeader />
        <QuantumCat />
        <VisitorCount />
        {children}
      </body>
    </html>
  );
}
