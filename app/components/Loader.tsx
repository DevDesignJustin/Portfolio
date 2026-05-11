"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface Props {
  accent: string;
  onDone: () => void;
}

export default function Loader({ accent, onDone }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const ringRef    = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { val: 0 };
    const tl = gsap.timeline({ onComplete: onDone });

    tl
      .from(ringRef.current, { scale: 0.6, opacity: 0, duration: 0.5, ease: "power3.out" })
      .to(counter, {
        val: 100, duration: 1.1, ease: "power2.inOut",
        onUpdate() {
          const v = Math.floor(counter.val);
          if (counterRef.current) counterRef.current.textContent = String(v).padStart(3, "0");
          if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
        },
      }, "-=0.2")
      .to(ringRef.current, { scale: 1.15, duration: 0.18, ease: "power2.out" })
      .to(ringRef.current, { scale: 1,    duration: 0.18, ease: "power2.in"  })
      .to({}, { duration: 0.15 })
      .to(overlayRef.current, { clipPath: "circle(0% at 50% 50%)", duration: 0.8, ease: "power4.inOut" });

    return () => { tl.kill(); };
  }, [onDone]);

  return (
    <div ref={overlayRef}
      className="fixed inset-0 z-9998 pointer-events-none select-none flex flex-col items-center justify-center"
      style={{ background: "#070707", clipPath: "circle(150% at 50% 50%)" }}>

      <div ref={ringRef}
        className="flex items-center justify-center rounded-full mb-8"
        style={{ width: 72, height: 72, border: `1.5px solid ${accent}`, boxShadow: `0 0 28px ${accent}44` }}>
        <div className="rounded-full" style={{ width: 8, height: 8, background: accent }} />
      </div>

      <span ref={counterRef}
        className="font-mono tabular-nums"
        style={{ fontSize: "clamp(3rem,8vw,6rem)", fontWeight: 900, color: "#efefef", letterSpacing: "-0.04em", lineHeight: 1 }}>
        000
      </span>
      <span className="font-mono text-xs tracking-[0.25em] uppercase mt-2" style={{ color: "#333" }}>loading</span>

      <div className="absolute bottom-0 inset-x-0 h-px overflow-hidden" style={{ background: "#111" }}>
        <div ref={barRef} className="h-full origin-left" style={{ background: accent, transform: "scaleX(0)", transition: "none" }} />
      </div>
    </div>
  );
}
