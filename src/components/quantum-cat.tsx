"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CatEmotion =
  | "idle"
  | "curious"
  | "startled"
  | "happy"
  | "mesmerized"
  | "sleepy";
type CatPhase = "idle" | "vanishing" | "appearing";
type CatFacing = "left" | "right";
type CatPose = "sitting" | "hopping";

interface Point {
  x: number;
  y: number;
}

const EMOTION_GLYPHS: Record<CatEmotion, string> = {
  idle: "",
  curious: "?",
  startled: "!",
  happy: "♥",
  mesmerized: "ψ",
  sleepy: "z",
};

function motionIsReduced() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function normalizeProgress(progress: number) {
  return ((progress % 1) + 1) % 1;
}

function getPerimeterGeometry() {
  const left = 24;
  const top = Math.min(Math.max(112, window.innerHeight * 0.14), 142);
  const right = Math.max(left + 120, window.innerWidth - 68);
  const bottom = Math.max(top + 80, window.innerHeight - 74);
  const width = right - left;
  const height = bottom - top;

  return { left, top, right, bottom, width, height, perimeter: 2 * (width + height) };
}

function getPerimeterPoint(progress: number): Point {
  const geometry = getPerimeterGeometry();
  let distance = normalizeProgress(progress) * geometry.perimeter;

  if (distance <= geometry.width) {
    return { x: geometry.left + distance, y: geometry.top };
  }

  distance -= geometry.width;
  if (distance <= geometry.height) {
    return { x: geometry.right, y: geometry.top + distance };
  }

  distance -= geometry.height;
  if (distance <= geometry.width) {
    return { x: geometry.right - distance, y: geometry.bottom };
  }

  distance -= geometry.width;
  return { x: geometry.left, y: geometry.bottom - distance };
}

function easeInOut(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

export function QuantumCat() {
  const catRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0.72);
  const positionRef = useRef<Point | null>(null);
  const directionRef = useRef(1);
  const motionVersionRef = useRef(0);
  const isTeleportingRef = useRef(false);
  const emotionRef = useRef<CatEmotion>("idle");
  const interactionUntilRef = useRef(0);
  const timersRef = useRef<number[]>([]);
  const pointerRef = useRef<Point | null>(null);
  const [emotion, setEmotion] = useState<CatEmotion>("idle");
  const [phase, setPhase] = useState<CatPhase>("idle");
  const [facing, setFacing] = useState<CatFacing>("right");
  const [pose, setPose] = useState<CatPose>("sitting");
  const [isWatching, setIsWatching] = useState(false);

  const updateEmotion = useCallback((nextEmotion: CatEmotion) => {
    if (emotionRef.current === nextEmotion) return;
    emotionRef.current = nextEmotion;
    setEmotion(nextEmotion);
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const timer = window.setTimeout(callback, delay);
    timersRef.current.push(timer);
  }, []);

  const placeAtProgress = useCallback((progress: number) => {
    const cat = catRef.current;
    if (!cat) return;

    const point = getPerimeterPoint(progress);
    positionRef.current = point;
    cat.style.left = `${point.x}px`;
    cat.style.top = `${point.y}px`;
  }, []);

  const teleport = useCallback(() => {
    if (motionIsReduced() || isTeleportingRef.current) return;

    isTeleportingRef.current = true;
    motionVersionRef.current += 1;
    interactionUntilRef.current = Date.now() + 900;
    updateEmotion("startled");
    setPhase("vanishing");
    setPose("sitting");

    schedule(() => {
      progressRef.current = normalizeProgress(progressRef.current + 0.47);
      placeAtProgress(progressRef.current);
      updateEmotion("curious");
      setPhase("appearing");

      schedule(() => {
        isTeleportingRef.current = false;
        setPhase("idle");
        updateEmotion("idle");
      }, 250);
    }, 165);
  }, [placeAtProgress, schedule, updateEmotion]);

  const watchPointer = useCallback(
    (allowTeleport: boolean) => {
      const cat = catRef.current;
      const pointer = pointerRef.current;
      if (!cat || !pointer) return;

      const rect = cat.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = pointer.x - centerX;
      const deltaY = pointer.y - centerY;
      const distance = Math.hypot(deltaX, deltaY);
      const watching = distance < 330;

      setIsWatching(watching);
      cat.style.setProperty(
        "--look-x",
        `${Math.max(-2, Math.min(2, deltaX / 70))}px`,
      );
      cat.style.setProperty(
        "--look-y",
        `${Math.max(-1.5, Math.min(1.5, deltaY / 80))}px`,
      );
      cat.style.setProperty(
        "--head-tilt",
        `${Math.max(-5, Math.min(5, deltaX / 90))}deg`,
      );

      if (watching) setFacing(deltaX < 0 ? "left" : "right");
      if (!allowTeleport) return;

      if (distance < 52) {
        teleport();
      } else if (distance < 105) {
        interactionUntilRef.current = Date.now() + 850;
        updateEmotion("startled");
      } else if (distance < 235) {
        interactionUntilRef.current = Date.now() + 650;
        updateEmotion("curious");
      } else if (Date.now() > interactionUntilRef.current) {
        updateEmotion("idle");
      }
    },
    [teleport, updateEmotion],
  );

  useEffect(() => {
    placeAtProgress(progressRef.current);
    if (motionIsReduced()) {
      updateEmotion("sleepy");
      return;
    }

    let disposed = false;
    let frame = 0;

    const wait = (delay: number) =>
      new Promise<void>((resolve) => schedule(resolve, delay));

    const animateHop = (
      targetProgress: number,
      duration: number,
      hopHeight: number,
    ) =>
      new Promise<void>((resolve) => {
        const cat = catRef.current;
        if (!cat) {
          resolve();
          return;
        }

        const startPoint = positionRef.current ?? getPerimeterPoint(progressRef.current);
        const targetPoint = getPerimeterPoint(targetProgress);
        const version = motionVersionRef.current;
        const startTime = window.performance.now();

        if (Math.abs(targetPoint.x - startPoint.x) > 2) {
          setFacing(targetPoint.x < startPoint.x ? "left" : "right");
        }

        setPose("hopping");

        const tick = (time: number) => {
          if (disposed || version !== motionVersionRef.current) {
            setPose("sitting");
            resolve();
            return;
          }

          const rawProgress = Math.min((time - startTime) / duration, 1);
          const easedProgress = easeInOut(rawProgress);
          const hop = Math.sin(rawProgress * Math.PI) * hopHeight;
          const point = {
            x: startPoint.x + (targetPoint.x - startPoint.x) * easedProgress,
            y:
              startPoint.y +
              (targetPoint.y - startPoint.y) * easedProgress -
              hop,
          };

          positionRef.current = point;
          cat.style.left = `${point.x}px`;
          cat.style.top = `${point.y}px`;
          watchPointer(false);

          if (rawProgress < 1) {
            frame = window.requestAnimationFrame(tick);
            return;
          }

          progressRef.current = normalizeProgress(targetProgress);
          positionRef.current = targetPoint;
          setPose("sitting");
          resolve();
        };

        frame = window.requestAnimationFrame(tick);
      });

    const roam = async () => {
      await wait(900);

      while (!disposed) {
        if (isTeleportingRef.current) {
          await wait(380);
          continue;
        }

        if (Math.random() < 0.12) directionRef.current *= -1;
        const hopCount = Math.random() < 0.32 ? 2 : 1;

        if (Date.now() > interactionUntilRef.current) {
          updateEmotion(Math.random() < 0.22 ? "happy" : "idle");
        }

        for (let index = 0; index < hopCount && !disposed; index += 1) {
          if (isTeleportingRef.current) break;

          const distance = 30 + Math.random() * 38;
          const step =
            (distance / getPerimeterGeometry().perimeter) * directionRef.current;
          const targetProgress = normalizeProgress(progressRef.current + step);

          await animateHop(
            targetProgress,
            560 + distance * 4.2,
            7 + Math.random() * 7,
          );

          if (index + 1 < hopCount) await wait(120 + Math.random() * 170);
        }

        if (Date.now() > interactionUntilRef.current) {
          updateEmotion(Math.random() < 0.2 ? "sleepy" : "idle");
        }

        await wait(1200 + Math.random() * 2300);
      }
    };

    const handleResize = () => placeAtProgress(progressRef.current);
    window.addEventListener("resize", handleResize);
    void roam();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [placeAtProgress, schedule, updateEmotion, watchPointer]);

  useEffect(() => {
    if (motionIsReduced()) return;

    let frame = 0;

    const emotionForTarget = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      if (target.closest(".quantum-glyph")) return "mesmerized";
      if (target.closest(".social-link")) return "happy";
      if (target.closest(".site-nav")) return "curious";
      if (target.closest(".visitor-counter")) return "curious";
      if (target.closest(".personal-index")) return "mesmerized";
      return null;
    };

    const reactToTarget = (target: EventTarget | null) => {
      const nextEmotion = emotionForTarget(target);
      if (!nextEmotion) return;
      interactionUntilRef.current = Date.now() + 1700;
      updateEmotion(nextEmotion);
    };

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
      const target = event.target;

      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        watchPointer(true);
        reactToTarget(target);
      });
    };

    const handlePointerOver = (event: PointerEvent) => {
      reactToTarget(event.target);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest("a")) return;
      interactionUntilRef.current = Date.now() + 900;
      updateEmotion("happy");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [updateEmotion, watchPointer]);

  useEffect(
    () => () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  return (
    <div
      ref={catRef}
      className={`quantum-cat emotion-${emotion} is-${phase} pose-${pose}${isWatching ? " is-watching" : ""}`}
      aria-hidden="true"
    >
      <span className="cat-thought">{EMOTION_GLYPHS[emotion]}</span>
      <span className="cat-probability">···</span>
      <span className={`cat-facing cat-facing-${facing}`}>
        <span className="pixel-cat">
          <span className="pixel-tail" />
          <span className="pixel-body">
            <span className="pixel-psi">ψ</span>
          </span>
          <span className="pixel-head">
            <span className="pixel-ear ear-left" />
            <span className="pixel-ear ear-right" />
            <span className="pixel-eye eye-left" />
            <span className="pixel-eye eye-right" />
            <span className="pixel-cheek cheek-left" />
            <span className="pixel-cheek cheek-right" />
            <span className="pixel-nose" />
          </span>
          <span className="pixel-leg leg-left" />
          <span className="pixel-leg leg-right" />
        </span>
      </span>
    </div>
  );
}
