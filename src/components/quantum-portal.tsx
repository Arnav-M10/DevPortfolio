"use client";

import { useEffect, useState } from "react";

export function QuantumPortal() {
  const [burst, setBurst] = useState<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const handleBurst = (event: Event) => {
      const detail = (event as CustomEvent<{ x: number; y: number }>).detail;
      if (!detail) return;
      setBurst({ id: Date.now(), x: detail.x, y: detail.y });
    };

    window.addEventListener("quantum-cat-burst", handleBurst);
    return () => window.removeEventListener("quantum-cat-burst", handleBurst);
  }, []);

  if (!burst) return null;

  return (
    <div
      key={burst.id}
      className="quantum-portal-burst"
      style={{ left: burst.x, top: burst.y }}
      onAnimationEnd={() => setBurst(null)}
      aria-hidden="true"
    >
      <span className="portal-core" />
      {Array.from({ length: 10 }, (_, index) => (
        <span className="portal-spark" key={index} style={{ ["--spark-index" as string]: index }} />
      ))}
    </div>
  );
}
