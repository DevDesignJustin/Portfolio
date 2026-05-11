"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    gsap.set(ring, { width: 28, height: 28 });
    gsap.set(dot, { scale: 0, opacity: 0 });

    const quickX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const quickY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let shown = false;
    let mode = "default";
    let currentLabel = "";

    const toDefault = () => {
      mode = "default";
      currentLabel = "";
      gsap.to(ring, {
        width: 28, height: 28,
        backgroundColor: "transparent",
        borderColor: "#b8a898",
        borderWidth: 1,
        duration: 0.45,
        ease: "expo.out",
      });
      gsap.to(label, { opacity: 0, duration: 0.1 });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    };

    // On links: ring collapses inward to a small filled dot — opposite of the typical expand
    const toLink = () => {
      mode = "link";
      currentLabel = "";
      gsap.to(ring, {
        width: 8, height: 8,
        backgroundColor: "#1a1410",
        borderColor: "#1a1410",
        borderWidth: 1,
        duration: 0.3,
        ease: "expo.inOut",
      });
      gsap.to(label, { opacity: 0, duration: 0.1 });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
    };

    const toLabeled = (text: string) => {
      mode = "label";
      currentLabel = text;
      label.textContent = text;
      gsap.to(ring, {
        width: 82, height: 82,
        backgroundColor: "#1a1410",
        borderColor: "#1a1410",
        borderWidth: 1,
        duration: 0.35,
        ease: "expo.out",
      });
      gsap.to(label, { opacity: 1, duration: 0.2, delay: 0.1 });
      gsap.to(dot, { scale: 0, opacity: 0, duration: 0.15 });
    };

    const update = (target: Element | null) => {
      if (!target) return;
      const cursorEl = target.closest("[data-cursor]");
      const linkEl = target.closest("a, button");
      const newText = cursorEl?.getAttribute("data-cursor") ?? "";

      if (cursorEl) {
        if (mode === "label" && newText === currentLabel) return;
        toLabeled(newText);
      } else if (linkEl) {
        if (mode === "link") return;
        toLink();
      } else {
        if (mode === "default") return;
        toDefault();
      }
    };

    const onMove = (e: MouseEvent) => {
      if (!shown) {
        gsap.to(ring, { opacity: 1, duration: 0.5 });
        shown = true;
      }
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      quickX(e.clientX);
      quickY(e.clientY);
      update(e.target as Element);
    };

    const onLeave = () => gsap.to(ring, { opacity: 0, duration: 0.35 });
    const onEnter = () => { if (shown) gsap.to(ring, { opacity: 1, duration: 0.3 }); };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      {/* Precise dot — no lag */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-0 rounded-full"
        style={{ width: 5, height: 5, backgroundColor: "#1a1410" }}
      />
      {/* Trailing ring — lags behind for depth */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full -translate-x-1/2 -translate-y-1/2 opacity-0 flex items-center justify-center overflow-hidden"
        style={{ border: "1px solid #c4b8a8" }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] uppercase tracking-widest font-bold text-white opacity-0 select-none whitespace-nowrap px-1"
        />
      </div>
    </>
  );
}
