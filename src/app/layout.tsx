import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";

import { SiteHeader } from "@/components/site-header";
import { QuantumCat } from "@/components/quantum-cat";
import { SpatialPageTransition } from "@/components/spatial-page-transition";
import { VisitorCount } from "@/components/visitor-count";

import "./globals.css";

export const metadata: Metadata = {
  title: "eigenstate — Arnav Mittal",
  description:
    "Arnav Mittal — a student interested in theoretical physics, mathematics, technology, and more.",
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
        <SpatialPageTransition>{children}</SpatialPageTransition>
      </body>
    </html>
  );
}
