"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  ACCENT_COLORS,
  NAV,
  PROJ_INITIAL,
  THEMES,
  TICKER,
  experience,
  miniProjects,
  projects,
  skillCategories,
} from "@/app/data";
import ContextMenu from "@/app/components/ContextMenu";
import Counter from "@/app/components/Counter";
import CursorTrail from "@/app/components/CursorTrail";
import GitHubStats from "@/app/components/GitHubStats";
import Loader from "@/app/components/Loader";
import MagneticButton from "@/app/components/MagneticButton";
import SectionHeader from "@/app/components/SectionHeader";
import TerminalWidget from "@/app/components/TerminalWidget";
import Toast from "@/app/components/Toast";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

export default function Portfolio() {
  // ── Refs ──────────────────────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);
  const themeOverlayRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const trailId = useRef(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── State ─────────────────────────────────────────────────────────────────
  const [showLoader, setShowLoader] = useState(true);
  const [loaderDone, setLoaderDone] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [accentIdx, setAccentIdx] = useState(2);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeExp, setActiveExp] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [trail, setTrail] = useState<
    { id: number; x: number; y: number; age: number }[]
  >([]);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({
    msg: "",
    visible: false,
  });
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  // ── Derived ───────────────────────────────────────────────────────────────
  const accent = ACCENT_COLORS[accentIdx];
  const { bg, surface, txt, muted, subtle, border } = THEMES["light"];

  // ── Callbacks ─────────────────────────────────────────────────────────────
  const showToast = useCallback((msg: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, visible: true });
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, visible: false })),
      3200,
    );
  }, []);

  const toggleTheme = useCallback((srcEl?: HTMLButtonElement) => {
    const btn = srcEl ?? toggleBtnRef.current,
      overlay = themeOverlayRef.current;
    if (!btn || !overlay) return;
    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2,
      y = rect.top + rect.height / 2;
    const newDark = !isDark;
    gsap.set(overlay, {
      background: THEMES[newDark ? "dark" : "light"].bg,
      display: "block",
      clipPath: `circle(0% at ${x}px ${y}px)`,
    });
    gsap.to(overlay, {
      clipPath: `circle(170% at ${x}px ${y}px)`,
      duration: 0.85,
      ease: "power4.inOut",
      onComplete() {
        setIsDark(newDark);
        gsap.set(overlay, { display: "none" });
      },
    });
  }, [isDark]);

  const onLoaderDone = useCallback(() => {
    setShowLoader(false);
    setLoaderDone(true);
    sessionStorage.setItem("jk_v5", "1");
  }, []);

  const onHeroMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    gsap.to(spotRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      duration: 1.4,
      ease: "power3.out",
    });
    const cx = rect.width / 2,
      cy = rect.height / 2;
    const rx = ((e.clientY - rect.top - cy) / cy) * -5;
    const ry = ((e.clientX - rect.left - cx) / cx) * 5;
    gsap.to(heroGridRef.current, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.8,
      ease: "power2.out",
      transformPerspective: 1200,
    });
  }, []);

  const onHeroLeave = useCallback(() => {
    gsap.to(heroGridRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 1.4,
      ease: "elastic.out(1,0.35)",
    });
  }, []);

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id?: string) => {
    e.preventDefault();
    const target = id ?? (e.currentTarget.getAttribute("href") ?? "").replace("#", "");
    const el = document.getElementById(target);
    if (!el) return;
    gsap.to(window, { scrollTo: { y: el, offsetY: 56 }, duration: 1.1, ease: "power3.inOut" });
  }, []);

  const copyEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText("devdesignjustin@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onKimDblClick = () => {
    const letters = document.querySelectorAll(".kim-letter");
    gsap.to(letters, {
      x: () => gsap.utils.random(-220, 220),
      y: () => gsap.utils.random(-160, 160),
      rotation: () => gsap.utils.random(-180, 180),
      opacity: 0,
      duration: 0.65,
      stagger: { each: 0.04, from: "random" },
      ease: "power3.out",
      onComplete() {
        gsap.to(letters, {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.9,
          stagger: { each: 0.05, from: "random" },
          ease: "back.out(1.5)",
        });
      },
    });
  };

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem("jk_v5")) {
      setShowLoader(false);
      setLoaderDone(true);
    }
  }, []);

  useEffect(() => {
    const orig = document.title;
    const h = () => {
      document.title = document.hidden ? "psst, come back 👀" : orig;
    };
    document.addEventListener("visibilitychange", h);
    return () => {
      document.removeEventListener("visibilitychange", h);
      document.title = orig;
    };
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      const id = trailId.current++;
      setTrail((t) => [
        ...t.slice(-18),
        { id, x: e.clientX, y: e.clientY, age: Date.now() },
      ]);
      setTimeout(() => setTrail((t) => t.filter((p) => p.id !== id)), 350);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    };
    const close = () => setContextMenu(null);
    document.addEventListener("contextmenu", h);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      document.removeEventListener("contextmenu", h);
      window.removeEventListener("scroll", close);
    };
  }, []);

  // ── GSAP animations ───────────────────────────────────────────────────────
  useGSAP(
    () => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: "top top", end: "bottom bottom", scrub: true },
      });

      NAV.forEach((id) => {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveSection(id),
          onLeave: () => setActiveSection(""),
          onEnterBack: () => setActiveSection(id),
          onLeaveBack: () => setActiveSection(""),
        });
      });

      gsap.to(".orb-1", {
        y: -250,
        ease: "none",
        scrollTrigger: { start: "top top", end: "bottom bottom", scrub: 3 },
      });
      gsap.to(nameRef.current, {
        y: -140,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      gsap.utils.toArray<Element>(".section-line").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.utils.toArray<Element>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 91%" },
        });
      });
      gsap.utils.toArray<Element>(".proj-row").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
          delay: i * 0.05,
        });
      });
      gsap.utils.toArray<Element>(".exp-row").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      gsap.from(".contact-word", {
        y: "112%",
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: { trigger: "#contact", start: "top 70%" },
      });
    },
    { scope: containerRef },
  );

  useGSAP(
    () => {
      if (!loaderDone) return;
      gsap.from(".hero-line", {
        y: "110%",
        duration: 1.3,
        stagger: 0.13,
        ease: "power4.out",
        delay: 0.05,
      });
      gsap.from(".hero-cell", {
        opacity: 0,
        x: 28,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".hero-bottom", {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.5,
      });
    },
    { scope: containerRef, dependencies: [loaderDone] },
  );

  useEffect(() => {
    if (!skillsGridRef.current) return;
    const pills = skillsGridRef.current.querySelectorAll(".skill-pill");
    gsap.fromTo(
      pills,
      { opacity: 0, y: 16, scale: 0.88 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: { each: 0.04, from: "start" },
        ease: "back.out(1.8)",
        clearProps: "transform,opacity",
      },
    );
  }, [activeCategory]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{ background: bg, color: txt }}
      className="min-h-screen"
      onClick={() => setContextMenu(null)}
    >
      {/* Overlays */}
      {showLoader && <Loader accent={accent} onDone={onLoaderDone} />}
      <CursorTrail items={trail} accent={accent} />
      <Toast message={toast.msg} visible={toast.visible} accent={accent} />
      {contextMenu && (
        <ContextMenu
          pos={contextMenu}
          accent={accent}
          colors={{ bg, surface, txt, muted, subtle, border }}
          onClose={() => setContextMenu(null)}
          onHire={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          onCopyEmail={() => {
            navigator.clipboard.writeText("devdesignjustin@gmail.com");
            showToast("email copied 📋");
          }}
        />
      )}

      {/* Ambient orb */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="orb-1 absolute rounded-full"
          style={{
            width: 1000,
            height: 1000,
            top: "-30%",
            left: "-20%",
            filter: "blur(160px)",
            background: `radial-gradient(circle, ${accent}18 0%, transparent 65%)`,
          }}
        />
      </div>

      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 inset-x-0 z-100 h-px origin-left scale-x-0"
        style={{ background: accent }}
      />


      {/* ── Nav ──────────────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{
          borderBottom: `1px solid ${border}`,
          background: `${bg}f2`,
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-14 flex items-center justify-between">
          <button
            className="font-mono text-[10px] tracking-[0.25em] uppercase select-none transition-colors"
            style={{ color: muted }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = txt; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
          >
            JK
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((s) => (
              <Link
                key={s}
                href={`#${s}`}
                onClick={(e) => smoothScroll(e)}
                className="relative font-mono text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-1.5"
                style={{ color: activeSection === s ? txt : muted }}
              >
                {activeSection === s && (
                  <span className="w-1 h-1 rounded-full shrink-0" style={{ background: accent }} />
                )}
                {s}
              </Link>
            ))}
          </nav>

          {/* Desktop right controls */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setAccentIdx(i => (i + 1) % ACCENT_COLORS.length)}
              aria-label="Cycle accent color"
              className="w-4 h-4 rounded-full transition-transform hover:scale-125"
              style={{ background: accent, boxShadow: `0 0 8px ${accent}88` }}
            />
          </div>

          {/* Mobile right controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setAccentIdx(i => (i + 1) % ACCENT_COLORS.length)}
              aria-label="Cycle accent color"
              className="w-4 h-4 rounded-full transition-transform"
              style={{ background: accent, boxShadow: `0 0 8px ${accent}88` }}
            />
            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="flex flex-col justify-center items-center gap-[5px] w-8 h-8"
              aria-label="Toggle menu"
            >
              <span className="block h-px w-5 transition-all duration-300" style={{ background: muted, transform: mobileMenuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span className="block h-px w-5 transition-all duration-300" style={{ background: muted, opacity: mobileMenuOpen ? 0 : 1 }} />
              <span className="block h-px w-5 transition-all duration-300" style={{ background: muted, transform: mobileMenuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className="md:hidden overflow-hidden transition-all duration-400"
          style={{ maxHeight: mobileMenuOpen ? 400 : 0, borderTop: mobileMenuOpen ? `1px solid ${border}` : "none" }}
        >
          <nav className="px-5 py-6 flex flex-col gap-0">
            {NAV.map((s) => (
              <Link
                key={s}
                href={`#${s}`}
                onClick={(e) => { smoothScroll(e); setMobileMenuOpen(false); }}
                className="flex items-center justify-between py-4 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
                style={{ color: activeSection === s ? txt : muted, borderBottom: `1px solid ${border}` }}
              >
                {s}
                {activeSection === s && <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} />}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col z-10 pt-14 overflow-hidden"
        onMouseMove={onHeroMove}
        onMouseLeave={onHeroLeave}
      >
        <div
          ref={spotRef}
          className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full z-0"
          style={{
            width: 700,
            height: 700,
            filter: "blur(130px)",
            background: `radial-gradient(circle, ${accent}09 0%, transparent 60%)`,
          }}
        />

        <div
          ref={heroGridRef}
          className="relative z-10 flex-1 flex flex-col justify-between px-5 md:px-10 py-10 md:py-14"
          style={{
            borderBottom: `1px solid ${border}`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Top row */}
          <div className="flex items-center justify-between">
            <span
              className="font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: subtle }}
            >
              Full-Stack Developer
            </span>
            <span
              className="font-mono text-[10px] tracking-[0.28em] uppercase"
              style={{ color: subtle }}
            >
              NJ · EST · 2026
            </span>
          </div>

          {/* Name — full viewport width */}
          <div ref={nameRef} className="-mx-1">
            <div style={{ overflow: "hidden", lineHeight: 0.82 }}>
              <h1
                className="hero-line font-black tracking-[-0.05em] select-none block"
                style={{ fontSize: "clamp(3.8rem,14vw,14rem)", color: txt }}
              >
                JUSTIN
              </h1>
            </div>
            <div style={{ overflow: "hidden", lineHeight: 0.82 }}>
              <h1
                className="hero-line kim-name font-black tracking-[-0.05em] select-none inline-block"
                style={{ fontSize: "clamp(3.8rem,14vw,14rem)", color: accent }}
                onDoubleClick={onKimDblClick}
                title="double-click me"
              >
                {"KIM.".split("").map((c, i) => (
                  <span key={i} className="kim-letter inline-block">
                    {c}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          {/* Bottom strip — metadata + CTAs */}
          <div
            className="hero-bottom grid grid-cols-1 md:grid-cols-[1fr_auto] gap-y-6 gap-x-10 pt-8"
            style={{ borderTop: `1px solid ${border}` }}
          >
            <div className="flex flex-wrap gap-x-8 gap-y-4 md:gap-x-12">
              {[
                { label: "Role", value: "Full-Stack Developer" },
                { label: "Location", value: "New Jersey, USA" },
                { label: "Available", value: "Open to work" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p
                    className="font-mono text-[9px] tracking-[0.22em] uppercase mb-1"
                    style={{ color: subtle }}
                  >
                    {label}
                  </p>
                  <p className="text-sm font-semibold" style={{ color: txt }}>
                    {label === "Available" ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: accent }}
                        />
                        {value}
                      </span>
                    ) : (
                      value
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-start md:items-end gap-3">
              <MagneticButton
                href="#work"
                dataCursor="EXPLORE →"
                onClick={smoothScroll}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full hover:opacity-80 transition-opacity"
                style={{ background: accent, color: bg }}
              >
                View Work →
              </MagneticButton>
              <MagneticButton
                href="#contact"
                dataCursor="HELLO ↗"
                onClick={smoothScroll}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border hover:opacity-60 transition-opacity"
                style={{ borderColor: border, color: muted }}
              >
                Contact ↗
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 py-4 overflow-hidden"
        style={{
          borderTop: `1px solid ${border}`,
          borderBottom: `1px solid ${border}`,
          background: surface,
        }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-left 32s linear infinite" }}
        >
          {[...TICKER, ...TICKER].map((item, i) => (
            <span
              key={i}
              className="font-mono text-[10px] tracking-[0.22em] uppercase mx-8 shrink-0"
              style={{ color: i % 7 === 0 ? accent : muted }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── About ────────────────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-32">
          <SectionHeader
            num="01"
            label="About"
            accent={accent}
            border={border}
            muted={muted}
          />
          <div
            className="reveal grid grid-cols-1 sm:grid-cols-3 mb-12 md:mb-24 pb-12 md:pb-24"
            style={{ borderBottom: `1px solid ${border}` }}
          >
            {[
              {
                end: 5,
                suffix: "+",
                label: "Years experience",
                note: "since 2019",
              },
              {
                end: 50,
                suffix: "k+",
                label: "Users served",
                note: "across all projects",
              },
              {
                end: 12,
                suffix: "",
                label: "Projects shipped",
                note: "and counting",
              },
            ].map(({ end, suffix, label, note }, i) => (
              <div
                key={label}
                className={`py-8 sm:py-0 sm:px-10 first:sm:pl-0 last:sm:pr-0 ${i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""}`}
                style={{ borderColor: border }}
              >
                <p
                  className="font-black leading-none mb-3"
                  title={note}
                  style={{ fontSize: "clamp(2.8rem,6vw,5rem)", color: accent }}
                >
                  <Counter end={end} suffix={suffix} />
                </p>
                <p
                  className="font-mono text-[10px] tracking-[0.18em] uppercase"
                  style={{ color: muted }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="reveal grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-24">
            <div className="space-y-5">
              <p className="text-lg leading-relaxed" style={{ color: muted }}>
                I&apos;m Justin, a full-stack and AI developer with 5+ years
                building fast, accessible, and well-crafted web applications. I
                care about clean code, thoughtful design, and shipping things
                people actually love.
              </p>
              <p className="leading-relaxed" style={{ color: muted }}>
                Currently open to new opportunities. When I&apos;m not coding
                I&apos;m probably deep in a design rabbit hole, obsessing over
                performance metrics, or down a late-night YouTube rabbit hole
                about{" "}
                <span
                  style={{
                    color: accent,
                    textDecoration: "underline",
                    textDecorationStyle: "dotted",
                  }}
                >
                  something completely unrelated
                </span>
                .
              </p>
            </div>
            <div>
              {[
                ["Focus", "Full-Stack & AI"],
                ["Location", "New Jersey, USA"],
                ["Experience", "5+ years"],
                ["Education", "B.S. Computer Science"],
                ["Status", "Available"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  className="flex items-center justify-between py-4"
                  style={{ borderBottom: `1px solid ${border}` }}
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.18em] uppercase"
                    style={{ color: muted }}
                  >
                    {l}
                  </span>
                  <span className="text-sm" style={{ color: txt }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ─────────────────────────────────────────────────────────────── */}
      <section
        id="work"
        className="relative z-10"
        style={{ background: surface }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-32">
          <SectionHeader
            num="02"
            label="Selected Work"
            accent={accent}
            border={border}
            muted={muted}
          />
          {projects
            .slice(0, showAllProjects ? projects.length : PROJ_INITIAL)
            .map((p, i) => {
              const hovered = hoveredProject === i;
              return (
                <div
                  key={p.num}
                  className="proj-row relative"
                  style={{ borderTop: `1px solid ${border}` }}
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => setHoveredProject(hoveredProject === i ? null : i)}
                >
                  <span
                    className="absolute right-0 top-1/2 font-black pointer-events-none select-none transition-all duration-500"
                    style={{
                      fontSize: "clamp(7rem,16vw,14rem)",
                      lineHeight: 1,
                      letterSpacing: "-0.05em",
                      color: hovered ? `${accent}10` : `${txt}04`,
                      transform: "translateY(-50%)",
                    }}
                  >
                    {p.num}
                  </span>
                  <div className="relative py-8">
                    <div className="flex items-center gap-6">
                      <div className="hidden md:flex flex-col gap-1 shrink-0 w-28">
                        <span
                          className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-300"
                          style={{ color: hovered ? accent : muted }}
                        >
                          {p.cat}
                        </span>
                        <span
                          className="font-mono text-[9px]"
                          style={{ color: subtle }}
                        >
                          {p.year}
                        </span>
                      </div>
                      <h3
                        className="font-black tracking-tight flex-1 transition-all duration-400"
                        style={{
                          fontSize: "clamp(1.8rem,4.5vw,4rem)",
                          color: hovered ? txt : `${txt}60`,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {p.title}
                      </h3>
                      <span
                        className="shrink-0 text-xl transition-all duration-300"
                        style={{
                          color: hovered ? accent : muted,
                          transform: hovered ? "translate(5px,-5px)" : "none",
                        }}
                      >
                        ↗
                      </span>
                    </div>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: hovered ? 400 : 0,
                        opacity: hovered ? 1 : 0,
                      }}
                    >
                      <div className="pt-6 pb-8 md:pl-[calc(7rem+1.5rem)] flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-5">
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: muted }}
                          >
                            {p.desc}
                          </p>
                          <Link
                            href={p.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-bold rounded-full px-4 py-2 hover:opacity-80 transition-opacity"
                            style={{ background: accent, color: bg }}
                            data-cursor="VIEW →"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View Website ↗
                          </Link>
                        </div>
                        <div className="flex flex-wrap gap-2 content-start md:max-w-[200px]">
                          {p.stack.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                              style={{
                                border: `1px solid ${border}`,
                                color: muted,
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div style={{ borderTop: `1px solid ${border}` }} />
          {projects.length > PROJ_INITIAL && (
            <button
              onClick={() => setShowAllProjects((v) => !v)}
              className="mt-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors"
              style={{ color: muted }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = txt;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = muted;
              }}
            >
              <span
                className="inline-block transition-transform duration-300"
                style={{
                  transform: showAllProjects ? "rotate(45deg)" : "none",
                }}
              >
                +
              </span>
              {showAllProjects
                ? "Show less"
                : `${projects.length - PROJ_INITIAL} more project${projects.length - PROJ_INITIAL > 1 ? "s" : ""}`}
            </button>
          )}
        </div>
      </section>

      {/* ── Mini Projects ────────────────────────────────────────────────────── */}
      <section id="mini" className="relative z-10" style={{ background: bg }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-32">
          <SectionHeader
            num="03"
            label="Mini Projects"
            accent={accent}
            border={border}
            muted={muted}
          />
          <div
            className="reveal grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-px"
            style={{ background: border, border: `1px solid ${border}` }}
          >
            {miniProjects.map((p, i) => {
              const featured = i === 0;
              return (
                <div
                  key={p.title}
                  className={`mini-card relative flex flex-col overflow-hidden ${featured ? "sm:col-span-2 md:col-span-2" : ""} ${featured ? "min-h-[260px] md:min-h-[340px]" : "min-h-[200px] md:min-h-[220px]"}`}
                  style={{ background: bg }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `${accent}08`;
                    (el.querySelector(".mini-bar") as HTMLElement | null)?.style.setProperty("transform", "scaleX(1)");
                    (el.querySelector(".mini-num") as HTMLElement | null)?.style.setProperty("color", `${accent}22`);
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = bg;
                    (el.querySelector(".mini-bar") as HTMLElement | null)?.style.setProperty("transform", "scaleX(0)");
                    (el.querySelector(".mini-num") as HTMLElement | null)?.style.setProperty("color", `${txt}06`);
                  }}
                >
                  {/* Project link wraps all content except GitHub */}
                  <Link
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col flex-1 p-8"
                  >
                    <span
                      className="mini-num absolute bottom-0 right-4 font-black select-none pointer-events-none leading-none transition-colors duration-500"
                      style={{
                        fontSize: featured ? "clamp(6rem,14vw,11rem)" : "clamp(4rem,8vw,7rem)",
                        color: `${txt}06`,
                        lineHeight: 0.85,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: accent }}>
                        {p.tag}
                      </span>
                      <span className="font-mono text-[9px] shrink-0" style={{ color: muted }}>
                        {p.year}
                      </span>
                    </div>
                    <div className="mt-auto pt-6">
                      <h3
                        className={`font-black leading-tight mb-3 ${featured ? "text-3xl" : "text-xl"}`}
                        style={{ color: txt, letterSpacing: "-0.02em" }}
                      >
                        {p.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: muted, maxWidth: featured ? "520px" : "none" }}
                      >
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.stack.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-[9px] px-2 py-0.5"
                            style={{ border: `1px solid ${border}`, color: subtle }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>

                  {/* GitHub — separate link, never nested */}
                  <Link
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors px-8 pb-8"
                    style={{ color: muted }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = txt; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = muted; }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub ↗
                  </Link>

                  <span
                    className="mini-bar absolute bottom-0 left-0 h-[2px] w-full origin-left pointer-events-none"
                    style={{
                      background: accent,
                      transform: "scaleX(0)",
                      transition: "transform 0.4s cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-32">
          <SectionHeader
            num="04"
            label="Stack"
            accent={accent}
            border={border}
            muted={muted}
          />

          {/* Category tabs */}
          <div
            className="reveal flex gap-1 mb-10 p-1 rounded-full w-fit max-w-full overflow-x-auto"
            style={{ background: surface }}
          >
            {skillCategories.map((cat) => {
              const active = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className="relative font-mono text-xs tracking-[0.15em] uppercase px-5 py-2 rounded-full transition-all duration-250 cursor-pointer"
                  style={{
                    background: active ? accent : "transparent",
                    color: active ? bg : muted,
                    fontWeight: active ? 700 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.color = txt;
                  }}
                  onMouseLeave={(e) => {
                    if (!active)
                      (e.currentTarget as HTMLElement).style.color = muted;
                  }}
                >
                  {cat.label}
                  {cat.label !== "All" && (
                    <span className="ml-1.5 text-[9px] opacity-60">
                      {cat.skills.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Pills grid */}
          <div ref={skillsGridRef} className="flex flex-wrap gap-3">
            {(
              skillCategories.find((c) => c.label === activeCategory)?.skills ??
              []
            ).map((s) => (
              <span
                key={s}
                className="skill-pill font-mono text-sm px-5 py-2.5 rounded-full border cursor-default select-none"
                style={{
                  borderColor: border,
                  color: muted,
                  transition:
                    "background 0.18s, border-color 0.18s, color 0.18s, transform 0.18s, box-shadow 0.18s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = accent;
                  el.style.borderColor = accent;
                  el.style.color = bg;
                  el.style.transform = "scale(1.07) translateY(-2px)";
                  el.style.boxShadow = `0 6px 24px ${accent}55`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent";
                  el.style.borderColor = border;
                  el.style.color = muted;
                  el.style.transform = "scale(1) translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GitHub ───────────────────────────────────────────────────────────── */}
      <section
        id="github"
        className="relative z-10"
        style={{ background: surface }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-32">
          <SectionHeader
            num="05"
            label="GitHub"
            accent={accent}
            border={border}
            muted={muted}
          />
          <GitHubStats
            accent={accent}
            colors={{ bg, surface, txt, muted, subtle, border }}
          />
        </div>
      </section>

      {/* ── Experience ───────────────────────────────────────────────────────── */}
      <section id="experience" className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-32">
          <SectionHeader
            num="06"
            label="Experience"
            accent={accent}
            border={border}
            muted={muted}
          />
          {experience.map((exp, i) => (
            <div
              key={exp.company}
              className="exp-row"
              style={{ borderTop: `1px solid ${border}` }}
            >
              <button
                className="w-full text-left"
                onClick={() => setActiveExp(activeExp === i ? null : i)}
              >
                <div className="flex items-start md:items-center justify-between py-9 gap-8">
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2.5 transition-colors duration-300"
                      style={{ color: activeExp === i ? accent : muted }}
                    >
                      {exp.period}
                    </p>
                    <h3
                      className="font-black tracking-tight transition-colors duration-300"
                      style={{
                        fontSize: "clamp(1.4rem,3.5vw,2.8rem)",
                        color: activeExp === i ? txt : `${txt}60`,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {exp.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <span
                      className="font-black text-xl hidden md:block transition-colors duration-300"
                      style={{ color: activeExp === i ? txt : muted }}
                    >
                      {exp.company}
                    </span>
                    <span
                      className="font-mono text-2xl font-light transition-transform duration-400"
                      style={{
                        color: accent,
                        transform: activeExp === i ? "rotate(45deg)" : "none",
                      }}
                    >
                      +
                    </span>
                  </div>
                </div>
              </button>
              <div
                className="overflow-hidden transition-all duration-500"
                style={{
                  maxHeight: activeExp === i ? 140 : 0,
                  opacity: activeExp === i ? 1 : 0,
                }}
              >
                <div className="pb-8 md:pl-8">
                  <p
                    className="text-sm leading-relaxed max-w-2xl"
                    style={{ color: muted }}
                  >
                    {exp.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: `1px solid ${border}` }} />
        </div>
      </section>

      {/* ── Terminal ─────────────────────────────────────────────────────────── */}
      <TerminalWidget
        accent={accent}
        colors={{ bg, surface, txt, muted, subtle, border }}
      />

      {/* ── Contact ──────────────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="relative z-10 min-h-screen flex flex-col justify-center"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-16 md:py-24 w-full">
          <SectionHeader
            num="07"
            label="Contact"
            accent={accent}
            border={border}
            muted={muted}
          />
          <div className="mb-20">
            <div style={{ overflow: "hidden" }}>
              <span
                className="contact-word block font-black tracking-tight leading-[0.86]"
                style={{ fontSize: "clamp(4rem,13vw,11rem)", color: txt }}
              >
                LET&apos;S
              </span>
            </div>
            <div style={{ overflow: "hidden" }}>
              <span
                className="contact-word block font-black tracking-tight leading-[0.86]"
                style={{ fontSize: "clamp(4rem,13vw,11rem)", color: accent }}
              >
                WORK.
              </span>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-12"
            style={{ borderTop: `1px solid ${border}` }}
          >
            <p className="max-w-sm leading-relaxed" style={{ color: muted }}>
              Open to new opportunities. Whether you have a project in mind or
              just want to say hello — my inbox is always open.
            </p>
            <div className="flex flex-col items-start md:items-end gap-5">
              <MagneticButton
                href="mailto:devdesignjustin@gmail.com"
                dataCursor={copied ? "COPIED ✓" : "COPY ↗"}
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full hover:opacity-80 transition-opacity"
                style={{ background: accent, color: bg }}
              >
                {copied ? "Copied! ✓" : "devdesignjustin@gmail.com ↗"}
              </MagneticButton>
              <div className="flex items-center gap-6">
                {[
                  ["GitHub", "#"],
                ].map(([n, h]) => (
                  <Link
                    key={n}
                    href={h}
                    data-cursor="OPEN ↗"
                    className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
                    style={{ color: muted }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = accent;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = muted;
                    }}
                  >
                    {n}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${border}` }}>
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-8 flex items-center justify-between">
          <span
            className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: muted }}
          >
            © 2026 Justin Kim
          </span>
          <span
            className="font-mono text-[10px] tracking-[0.18em] uppercase"
            style={{ color: muted }}
          >
            Built with Next.js
          </span>
        </div>
      </footer>
    </div>
  );
}
