"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

const BG     = "#070707";
const ACCENT = "#a78bfa";
const MUTED  = "#555";
const BORDER = "#161616";
const SUBTLE = "#282828";

export default function NotFound() {
  const glitchRef = useRef<HTMLHeadingElement>(null);
  const btnRef    = useRef<HTMLAnchorElement>(null);

  useEffect(()=>{
    const el = glitchRef.current;
    if (!el) return;

    // Clip-up entrance
    gsap.from(el, { y: "100%", duration: 0.9, ease: "power4.out", delay: 0.1,
      clipPath: "inset(100% 0% 0% 0%)",
      onStart(){ el.style.clipPath = "inset(100% 0% 0% 0%)"; },
    });
    gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9, ease: "power4.out", delay: 0.1 });

    // Glitch fire
    const fireGlitch = () => {
      const tl = gsap.timeline();
      tl.to(el, { x: -6, skewX: 4,  duration: 0.06, ease: "none" })
        .to(el, { x:  8, skewX: -3, duration: 0.06, ease: "none" })
        .to(el, { x: -4, skewX: 2,  duration: 0.05, ease: "none" })
        .to(el, { x:  5, skewX: -4, duration: 0.06, ease: "none" })
        .to(el, { x:  0, skewX: 0,  duration: 0.1,  ease: "power2.out" });
    };

    const t = setTimeout(fireGlitch, 500);
    const id = setInterval(fireGlitch, 4000);
    return () => { clearTimeout(t); clearInterval(id); };
  }, []);

  const onBtnMove = (e: React.MouseEvent) => {
    const el = btnRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3, ease: "power2.out" });
  };
  const onBtnLeave = () => gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.45)" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: BG, color: MUTED }}>

      {/* Ambient glow */}
      <div className="absolute rounded-full pointer-events-none"
        style={{ width: 800, height: 800, top: "50%", left: "50%", transform: "translate(-50%,-60%)",
          filter: "blur(160px)", background: `radial-gradient(circle, ${ACCENT}10 0%, transparent 65%)` }}/>

      {/* Main content */}
      <div className="relative z-10 text-center px-8">
        {/* 404 glitch */}
        <div style={{ overflow: "hidden", lineHeight: 1 }}>
          <h1 ref={glitchRef}
            className="font-black select-none"
            style={{ fontSize: "clamp(8rem,22vw,18rem)", color: ACCENT, letterSpacing: "-0.05em",
              textShadow: `0 0 60px ${ACCENT}40` }}>
            404
          </h1>
        </div>

        <p className="font-mono text-base mt-6 mb-2" style={{ color: MUTED }}>
          This page doesn&apos;t exist.
        </p>
        <p className="font-mono text-sm mb-14" style={{ color: SUBTLE }}>
          Probably Justin&apos;s fault.
        </p>

        {/* Magnetic Go Home button */}
        <Link ref={btnRef} href="/"
          onMouseMove={onBtnMove} onMouseLeave={onBtnLeave}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-opacity hover:opacity-80"
          style={{ background: ACCENT, color: BG }}>
          Go Home →
        </Link>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <Link href="/"
          className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
          style={{ color: BORDER }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.color = MUTED; }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { (e.currentTarget as HTMLElement).style.color = BORDER; }}>
          ← back to the portfolio
        </Link>
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${SUBTLE}08 1px, transparent 1px), linear-gradient(90deg, ${SUBTLE}08 1px, transparent 1px)`,
          backgroundSize: "80px 80px" }}/>
    </div>
  );
}
