"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type TransitionDirection = "left" | "right" | "up" | "down";

const routeOrder = [
  "/about",
  "/projects",
  "/work",
  "/awards",
  "/pics",
  "/contact",
] as const;

function getDirection(from: string, to: string): TransitionDirection {
  if (to === "/") return "up";
  if (from === "/") return "down";

  const fromIndex = routeOrder.indexOf(from as (typeof routeOrder)[number]);
  const toIndex = routeOrder.indexOf(to as (typeof routeOrder)[number]);

  if (fromIndex === -1 || toIndex === -1) return "right";
  return toIndex > fromIndex ? "right" : "left";
}

export function SpatialPageTransition({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const previousPathRef = useRef(pathname);
  const [direction, setDirection] = useState<TransitionDirection>("right");
  const [hasNavigated, setHasNavigated] = useState(false);

  useLayoutEffect(() => {
    const previousPath = previousPathRef.current;
    if (previousPath === pathname) return;

    previousPathRef.current = pathname;
    setDirection(getDirection(previousPath, pathname));
    setHasNavigated(true);
  }, [pathname]);

  return (
    <div className={`spatial-transition direction-${direction}`}>
      <div
        key={pathname}
        className={`spatial-page${hasNavigated ? " spatial-page-enter" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
