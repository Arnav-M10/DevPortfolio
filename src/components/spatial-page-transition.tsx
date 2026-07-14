"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type TransitionDirection = "left" | "right" | "up" | "down";

interface PageLayer {
  path: string;
  node: React.ReactNode;
}

const routeOrder = [
  "/about",
  "/projects",
  "/work",
  "/awards",
  "/pics",
  "/contact",
] as const;

const TRANSITION_DURATION = 620;

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
  const [activeLayer, setActiveLayer] = useState<PageLayer>(() => ({
    path: pathname,
    node: children,
  }));
  const activeLayerRef = useRef<PageLayer>(activeLayer);
  const childrenRef = useRef(children);
  const [exitingLayer, setExitingLayer] = useState<PageLayer | null>(null);
  const [direction, setDirection] = useState<TransitionDirection>("right");

  useEffect(() => {
    childrenRef.current = children;
  }, [children]);

  useEffect(() => {
    const currentLayer = activeLayerRef.current;
    if (pathname === currentLayer.path) return;

    const nextDirection = getDirection(currentLayer.path, pathname);
    const nextLayer = { path: pathname, node: childrenRef.current };

    setDirection(nextDirection);
    setExitingLayer(currentLayer);
    activeLayerRef.current = nextLayer;
    setActiveLayer(nextLayer);

    const timeout = window.setTimeout(
      () => setExitingLayer(null),
      TRANSITION_DURATION,
    );

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  return (
    <div className={`spatial-transition direction-${direction}`}>
      {exitingLayer ? (
        <div className="spatial-page spatial-page-exit">{exitingLayer.node}</div>
      ) : null}
      <div
        className={`spatial-page${exitingLayer ? " spatial-page-enter" : ""}`}
      >
        {activeLayer.node}
      </div>
    </div>
  );
}
