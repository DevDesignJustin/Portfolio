"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
// ── Data ─────────────────────────────────────────────────────────────────────
const projects = [
  {
    num: "01",
    title: "Commerce Platform",
    category: "Web Application",
    stack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    desc: "Full-stack e-commerce platform with real-time inventory management, multi-currency checkout, and a custom admin dashboard. Built to handle 10,000+ daily transactions.",
    year: "2024",
  },
  {
    num: "02",
    title: "Design System",
    category: "Design Engineering",
    stack: ["React", "Storybook", "Figma", "Tailwind"],
    desc: "Component library and design system used across 4 products. Includes Figma documentation, usage guidelines, and automated visual regression testing.",
    year: "2023",
  },
  {
    num: "03",
    title: "Analytics Dashboard",
    category: "Data Visualization",
    stack: ["React", "D3.js", "Python", "FastAPI"],
    desc: "Real-time analytics platform with interactive D3 charts, CSV export, and role-based access for teams.",
    year: "2023",
  },
];
const allSkills = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion",
  "Node.js", "Python", "PostgreSQL", "Redis", "GraphQL",
  "Git", "Figma", "Docker", "AWS", "Vercel",
];
const experience = [
  {
    role: "Senior Frontend Developer",
    company: "Acme Corp",
    period: "2023 — Present",
    desc: "Lead frontend architecture for a SaaS platform serving 50k+ users. Reduced bundle size by 40%.",
  },
  {
    role: "Frontend Developer",
    company: "Studio Blue",
    period: "2021 — 2023",
    desc: "Built interactive web experiences for Fortune 500 clients. Obsessed over every detail.",
  },
  {
    role: "Junior Developer",
    company: "Freelance",
    period: "2019 — 2021",
    desc: "Full-stack applications and websites for small businesses and startups.",
  },
];
const roles = ["Web Developer", "UI Engineer", "Problem Solver", "Full-Stack Dev"];
const NAV_SECTIONS = ["about", "projects", "skills", "experience", "contact"];
// ── MagneticButton ────────────────────────────────────────────────────────────
function MagneticButton({
  href,
  className,
  children,
  onClick,
  dataCursor,
}: {
  href: string;
  className: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  dataCursor?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width / 2) * 0.28,
      y: (e.clientY - r.top - r.height / 2) * 0.28,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const onLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
  };
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      data-cursor={dataCursor}
    >
      {children}
    </a>
  );
}
// ── AnimatedCounter ───────────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
      onUpdate() { el.textContent = Math.floor(obj.val) + suffix; },
    });
  }, [end, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
// ── Page ──────────────────────────────────────────────────────────────────────
export default function V2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const justin = useRef<HTMLSpanElement>(null);
  const kim = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const marquee1 = useRef<HTMLDivElement>(null);
  const marquee2 = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  // Role cycler
  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);
  // Animate role text in on change
  const isFirstRole = useRef(true);
  useEffect(() => {
    if (isFirstRole.current) { isFirstRole.current = false; return; }
    const el = roleRef.current;
    if (!el) return;
    gsap.fromTo(el, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
  }, [roleIdx]);
  // Copy email
  const copyEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText("kimkt.iu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // Marquee pause
  const pauseMarquee = () => {
    [marquee1.current, marquee2.current].forEach((el) => {
      if (el) el.style.animationPlayState = "paused";
    });
  };
  const resumeMarquee = () => {
    [marquee1.current, marquee2.current].forEach((el) => {
      if (el) el.style.animationPlayState = "running";
    });
  };
  useGSAP(
    () => {
      // Scroll progress bar
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: "top top", end: "bottom bottom", scrub: true },
      });
      // Active nav tracking
      NAV_SECTIONS.forEach((id) => {
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
      // Hero name clip reveal
      gsap.from([justin.current, kim.current], {
        y: "110%",
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.05,
      });
      // Hero sub-elements fade
      gsap.from(".hero-sub", {
        y: 22,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.75,
      });
      // Generic reveals
      gsap.utils.toArray<Element>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
      // Project cards alternating slide
      gsap.utils.toArray<Element>(".proj-item").forEach((el, i) => {
        gsap.from(el, {
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
      // Timeline line scrub
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: "#experience",
          start: "top 65%",
          end: "bottom 75%",
          scrub: 1,
        },
      });
      // Timeline dots pop
      gsap.utils.toArray<Element>(".timeline-dot").forEach((el) => {
        gsap.from(el, {
          scale: 0,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    },
    { scope: containerRef }
  );
  return (
    <div ref={containerRef} className="bg-white text-neutral-900 min-h-screen">
      {/* Progress bar */}
      <div
        ref={progressRef}
        className="fixed top-0 inset-x-0 z-[100] h-[2px] bg-neutral-900 origin-left scale-x-0"
      />
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-black text-sm tracking-tight">Justin Kim</span>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {NAV_SECTIONS.map((s) => {
              const isActive = activeSection === s;
              return (
                <a
                  key={s}
                  href={`#${s}`}
                  className={`relative capitalize transition-colors flex items-center gap-1.5 ${isActive ? "text-neutral-900 font-semibold" : "text-neutral-500 hover:text-neutral-900"}`}
                >
                  <span
                    className={`w-1 h-1 rounded-full bg-neutral-900 transition-all duration-300 ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                  />
                  {s}
                </a>
              );
            })}
            <Link href="/" className="font-semibold text-neutral-900 hover:text-neutral-500 transition-colors">
              ← V1
            </Link>
            <Link href="/v3" className="font-semibold text-neutral-900 hover:text-neutral-500 transition-colors">
              V3 →
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="pt-32 pb-24 min-h-[90vh] flex flex-col justify-center">
          <div className="mb-1 overflow-hidden">
            <span
              ref={justin}
              className="block font-black text-[clamp(5.5rem,15vw,11rem)] leading-[0.88] tracking-tight"
            >
              JUSTIN
            </span>
          </div>
          <div className="overflow-hidden pl-[0.22em]">
            <span
              ref={kim}
              className="block font-black text-[clamp(5.5rem,15vw,11rem)] leading-[0.88] tracking-tight"
            >
              KIM
            </span>
          </div>
          <div className="mt-8 flex items-center gap-6 flex-wrap">
            <p
              ref={roleRef}
              className="hero-sub font-mono text-[11px] tracking-[0.2em] text-neutral-500 uppercase"
            >
              {roles[roleIdx]}
            </p>
            <span className="hero-sub inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Available
            </span>
          </div>
          <p className="hero-sub mt-6 text-base text-neutral-500 max-w-md leading-relaxed">
            I build precise, performant web experiences — from pixel-perfect
            interfaces to robust backend systems. Currently based in San Francisco.
          </p>
          <div className="hero-sub mt-8 flex items-center gap-3">
            <MagneticButton
              href="#projects"
              dataCursor="EXPLORE"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-700 transition-colors"
            >
              View Work
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </MagneticButton>
            <MagneticButton
              href="#contact"
              dataCursor="HELLO ↗"
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-200 text-neutral-700 text-sm font-medium rounded-full hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all"
            >
              Get in Touch
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </MagneticButton>
          </div>
        </section>
        <hr className="border-neutral-100" />
        {/* About */}
        <section id="about" className="py-24">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-12">
            02 — About
          </p>
          <div className="reveal grid grid-cols-3 gap-6 mb-14 pb-14 border-b border-neutral-100">
            {[
              { end: 5, suffix: "+", label: "Years experience" },
              { end: 50, suffix: "k+", label: "Users served" },
              { end: 3, suffix: "", label: "Industries" },
            ].map(({ end, suffix, label }) => (
              <div key={label}>
                <p className="font-black text-5xl md:text-6xl tracking-tight mb-1">
                  <Counter end={end} suffix={suffix} />
                </p>
                <p className="font-mono text-[11px] text-neutral-400 tracking-widest uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="reveal grid md:grid-cols-2 gap-14">
            <div className="space-y-4">
              <p className="text-neutral-600 leading-relaxed">
                I&apos;m Justin, a web developer with 5+ years of experience building
                fast, accessible, and well-crafted web applications. I care about
                clean code, thoughtful design, and things that actually work.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Currently open to new opportunities. When I&apos;m not coding, I&apos;m
                probably deep in a design system, reading about performance
                optimization, or on my third coffee of the day.
              </p>
            </div>
            <div>
              {[
                ["Focus", "Full-stack web development"],
                ["Location", "San Francisco, CA"],
                ["Experience", "5+ years"],
                ["Education", "B.S. Computer Science"],
                ["Status", "Available for work"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  className="flex justify-between items-center py-3.5 border-b border-neutral-100"
                >
                  <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                    {label}
                  </span>
                  <span className="text-sm text-neutral-600">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr className="border-neutral-100" />
        {/* Projects */}
        <section id="projects" className="py-24">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-12">
            03 — Projects
          </p>
          <div
            className="space-y-2"
            onMouseLeave={() => setHoveredProject(null)}
          >
            {projects.map((p, i) => (
              <a
                key={p.num}
                href="#"
                data-cursor="VIEW →"
                className={`proj-item group flex gap-0 items-stretch py-8 border-b border-neutral-100 -mx-6 px-6 transition-all duration-200 ${
                  hoveredProject !== null && hoveredProject !== i
                    ? "opacity-25"
                    : "opacity-100 hover:bg-neutral-50"
                }`}
                onMouseEnter={() => setHoveredProject(i)}
              >
                <span className="font-black text-[4.5rem] leading-none text-neutral-100 group-hover:text-neutral-200 transition-colors select-none w-28 shrink-0 self-start mt-1 tabular-nums">
                  {p.num}
                </span>
                <div className="flex-1 pt-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase block mb-1.5">
                        {p.category}
                      </span>
                      <h3 className="font-black text-2xl md:text-3xl tracking-tight group-hover:translate-x-1 transition-transform">
                        {p.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-neutral-400 shrink-0 ml-4">{p.year}</span>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-4 max-w-xl">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-neutral-400 border border-neutral-100 px-2 py-0.5 rounded-full group-hover:border-neutral-200 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-900 transition-colors shrink-0 ml-4 flex items-center gap-1">
                      View
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
        <hr className="border-neutral-100" />
        {/* Skills — dual marquee */}
        <section
          id="skills"
          className="py-24"
          onMouseEnter={pauseMarquee}
          onMouseLeave={resumeMarquee}
        >
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-12">
            04 — Skills
          </p>
          {/* Full-bleed marquee wrapper — breaks out of max-w-5xl */}
          <div className="relative left-1/2 -translate-x-1/2 w-screen overflow-hidden">
            <div
              ref={marquee1}
              className="flex mb-3"
              style={{ animation: "marquee-left 22s linear infinite" }}
            >
              {[...allSkills, ...allSkills].map((s, i) => (
                <span
                  key={i}
                  className="shrink-0 font-mono text-sm text-neutral-500 border border-neutral-200 rounded-full px-4 py-1.5 mr-3 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
            <div
              ref={marquee2}
              className="flex"
              style={{ animation: "marquee-right 28s linear infinite" }}
            >
              {[...allSkills.slice().reverse(), ...allSkills.slice().reverse()].map((s, i) => (
                <span
                  key={i}
                  className="shrink-0 font-mono text-sm text-neutral-400 border border-neutral-100 rounded-full px-4 py-1.5 mr-3 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <p className="reveal mt-8 font-mono text-[11px] text-neutral-300 tracking-widest text-center uppercase">
            Hover to pause
          </p>
        </section>
        <hr className="border-neutral-100" />
        {/* Experience */}
        <section id="experience" className="py-24">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-12">
            05 — Experience
          </p>
          <div className="flex gap-10">
            <div className="relative flex flex-col items-center pt-1.5">
              <div className="timeline-line absolute top-0 bottom-0 w-px bg-neutral-200" />
            </div>
            <div className="flex-1 space-y-0">
              {experience.map((exp) => (
                <div key={exp.company} className="reveal relative flex gap-6 pb-12 last:pb-0 group">
                  <div className="timeline-dot absolute -left-[2.85rem] top-1 w-3 h-3 rounded-full bg-neutral-900 border-2 border-white ring-1 ring-neutral-200 shrink-0 group-hover:scale-125 transition-transform" />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-2">
                      <div>
                        <h3 className="font-black text-lg tracking-tight">{exp.role}</h3>
                        <p className="text-sm text-neutral-500">{exp.company}</p>
                      </div>
                      <span className="font-mono text-xs text-neutral-400 shrink-0">{exp.period}</span>
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr className="border-neutral-100" />
        {/* Contact */}
        <section id="contact" className="py-24">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-12">
            06 — Contact
          </p>
          <div className="reveal">
            <h2 className="font-black text-[clamp(3.5rem,10vw,8rem)] leading-[0.88] tracking-tight mb-10">
              LET&apos;S<br />WORK.
            </h2>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-neutral-100">
              <p className="text-neutral-500 max-w-sm leading-relaxed">
                I&apos;m currently open to new opportunities. Whether you have a
                project in mind or just want to say hello — my inbox is always
                open.
              </p>
              <div className="flex flex-col items-start md:items-end gap-4">
                <MagneticButton
                  href="mailto:kimkt.iu@gmail.com"
                  dataCursor={copied ? "COPIED ✓" : "COPY ↗"}
                  onClick={copyEmail}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-700 transition-all"
                >
                  <span className="transition-all duration-300">
                    {copied ? "Copied! ✓" : "kimkt.iu@gmail.com"}
                  </span>
                  {!copied && (
                    <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                  )}
                </MagneticButton>
                <div className="flex items-center gap-5">
                  {[["GitHub", "#"], ["LinkedIn", "#"], ["Twitter", "#"]].map(([n, h]) => (
                    <a
                      key={n}
                      href={h}
                      data-cursor="OPEN ↗"
                      className="relative text-sm text-neutral-400 hover:text-neutral-700 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-neutral-700 after:transition-all hover:after:w-full"
                    >
                      {n}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="font-mono text-xs text-neutral-400">© 2024 Justin Kim</span>
          <span className="font-mono text-xs text-neutral-400">Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}