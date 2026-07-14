"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { QuantumCat } from "@/components/quantum-cat";

export function LandingQuantumCat() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mounted, setMounted] = useState(isHome);

  useEffect(() => {
    if (isHome) {
      setMounted(true);
      return;
    }

    const timer = window.setTimeout(() => setMounted(false), 520);
    return () => window.clearTimeout(timer);
  }, [isHome]);

  return mounted ? <QuantumCat exiting={!isHome} /> : null;
}
