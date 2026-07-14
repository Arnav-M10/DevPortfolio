"use client";

import { useEffect, useState } from "react";

const VISIT_KEY = "eigenstate-visitor-counted-v1";

interface VisitorResponse {
  count: number | null;
}

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = window.localStorage.getItem(VISIT_KEY) === "yes";
    const method = alreadyCounted ? "GET" : "POST";

    if (!alreadyCounted) window.localStorage.setItem(VISIT_KEY, "yes");

    const controller = new AbortController();

    fetch("/api/visits", {
      method,
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => response.json() as Promise<VisitorResponse>)
      .then((payload) => setCount(payload.count))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        if (!alreadyCounted) window.localStorage.removeItem(VISIT_KEY);
      });

    return () => controller.abort();
  }, []);

  return (
    <aside
      className="visitor-counter"
      aria-label={count === null ? "Visitor count loading" : `${count} visitors`}
      aria-live="polite"
      title="Approximate unique browsers"
    >
      <span className="visitor-dot" aria-hidden="true" />
      <span>lifetime visitors:</span>
      <strong>{count === null ? "····" : count.toLocaleString("en-US")}</strong>
    </aside>
  );
}
