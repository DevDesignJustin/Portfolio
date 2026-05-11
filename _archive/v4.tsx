"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
const bg      = "#080808";
const surface = "#101010";
const txt     = "#f0f0f0";
const muted   = "#888";
const subtle  = "#444";
const border  = "#222";
const accent  = "#a78bfa";
const projects = [
  {
    num: "01", title: "Commerce Platform", category: "Web Application", year: "2024",
    stack: ["Next.js","TypeScript","Stripe","PostgreSQL"],
    desc: "Full-stack e-commerce platform with real-time inventory management, multi-currency checkout, and a custom admin dashboard built to handle 10,000+ daily transactions.",
    link: "#",
  },
  {
    num: "02", title: "Design System", category: "Design Engineering", year: "2023",
    stack: ["React","Storybook","Figma","Tailwind"],
    desc: "Component library used across 4 products. Figma documentation, usage guidelines, and automated visual regression testing keep it airtight.",
    link: "#",
  },
  {
    num: "03", title: "Analytics Dashboard", category: "Data Visualization", year: "2023",
    stack: ["React","D3.js","Python","FastAPI"],
    desc: "Real-time analytics platform with interactive D3 charts, CSV export, and role-based access control for teams of all sizes.",
    link: "#",
  },
];
const allSkills = [
  "React","Next.js","TypeScript","Tailwind CSS","Framer Motion",
  "Node.js","Python","PostgreSQL","Redis","GraphQL",
  "Git","Figma","Docker","AWS","Vercel",
];
const experience = [
  { role:"Senior Frontend Developer", company:"Acme Corp", period:"2023 — Present",
    desc:"Lead frontend architecture for a SaaS platform serving 50k+ users. Reduced bundle size by 40% and halved first contentful paint." },
  { role:"Frontend Developer", company:"Studio Blue", period:"2021 — 2023",
    desc:"Built interactive web experiences for Fortune 500 clients. Obsessed over every pixel so they didn't have to." },
  { role:"Junior Developer", company:"Freelance", period:"2019 — 2021",
    desc:"Full-stack applications and websites for small businesses and startups finding their footing." },
];
const ROLE_STATIC = "Web Developer — Full Stack";
const NAV_SECTIONS = ["about","projects","skills","experience","contact"];
function MagneticButton({ href, className, style, children, onClick, dataCursor }: {
  href: string; className?: string; style?: React.CSSProperties; children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; dataCursor?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x:(e.clientX-r.left-r.width/2)*0.28, y:(e.clientY-r.top-r.height/2)*0.28, duration:0.3, ease:"power2.out" });
  };
  const onLeave = () => gsap.to(ref.current, { x:0, y:0, duration:0.6, ease:"elastic.out(1,0.45)" });
  return (
    <a ref={ref} href={href} className={className} style={style}
      onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} data-cursor={dataCursor}>
      {children}
    </a>
  );
}
function Counter({ end, suffix="" }: { end:number; suffix?:string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end, duration: 1.8, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%" },
      onUpdate() { el.textContent = Math.floor(obj.val) + suffix; },
    });
  }, [end, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}
export default function V4() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLElement>(null);
  const spotRef      = useRef<HTMLDivElement>(null);
  const PROJECTS_INITIAL = 2;
  const [activeSection, setActiveSection] = useState("");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeExp,     setActiveExp]     = useState<number|null>(null);
  const [copied,        setCopied]        = useState(false);
  const onHeroMove = useCallback((e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect(); if (!rect) return;
    gsap.to(spotRef.current, { x: e.clientX-rect.left, y: e.clientY-rect.top, duration:0.9, ease:"power2.out" });
  }, []);
  const copyEmail = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText("kimkt.iu@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useGSAP(() => {
    gsap.to(progressRef.current, {
      scaleX: 1, ease: "none",
      scrollTrigger: { start:"top top", end:"bottom bottom", scrub:true },
    });
    NAV_SECTIONS.forEach(id => {
      ScrollTrigger.create({
        trigger: `#${id}`, start:"top 50%", end:"bottom 50%",
        onEnter:     () => setActiveSection(id),
        onLeave:     () => setActiveSection(""),
        onEnterBack: () => setActiveSection(id),
        onLeaveBack: () => setActiveSection(""),
      });
    });
    gsap.to(".orb-1", { y:-180, ease:"none",
      scrollTrigger:{ start:"top top", end:"bottom bottom", scrub:2.5 } });
    // Hero clip reveals
    gsap.from(".hero-line", {
      y: "105%", duration: 1.1, stagger: 0.1, ease: "power4.out", delay: 0.1,
    });
    gsap.from(".hero-sub", {
      y: 16, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out", delay: 0.55,
    });
    // Generic reveals
    gsap.utils.toArray<Element>(".reveal").forEach(el => {
      gsap.from(el, {
        y:28, opacity:0, duration:0.65, ease:"power2.out",
        scrollTrigger:{ trigger:el, start:"top 92%" },
      });
    });
    // Project rows slide in
    gsap.utils.toArray<Element>(".proj-row").forEach((el, i) => {
      gsap.from(el, {
        x: -40, opacity: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
        delay: i * 0.05,
      });
    });
    // Experience rows
    gsap.utils.toArray<Element>(".exp-row").forEach((el, i) => {
      gsap.from(el, {
        x: i%2===0 ? -70 : 70, opacity:0, duration:0.7, ease:"power3.out",
        scrollTrigger:{ trigger:el, start:"top 88%" },
      });
    });
    // Contact clip reveal
    gsap.from(".contact-word", {
      y:"110%", duration:1.0, stagger:0.08, ease:"power4.out",
      scrollTrigger:{ trigger:"#contact", start:"top 72%" },
    });
  }, { scope: containerRef });
  return (
    <div ref={containerRef} style={{ background:bg, color:txt }} className="min-h-screen">
      {/* Background orb */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb-1 absolute rounded-full" style={{
          width:800, height:800, top:"-20%", left:"-20%", filter:"blur(120px)",
          background:`radial-gradient(circle, ${accent}14 0%, transparent 70%)`,
        }} />
      </div>
      {/* Progress bar */}
      <div ref={progressRef} className="fixed top-0 inset-x-0 z-[100] h-[2px] origin-left scale-x-0"
        style={{ background: accent }} />
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b"
        style={{ background:`${bg}e8`, borderColor:border }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-black text-sm" style={{ color:txt }}>Justin Kim</span>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {NAV_SECTIONS.map(s => (
              <a key={s} href={`#${s}`}
                className="capitalize flex items-center gap-1.5 transition-colors"
                style={{ color: activeSection===s ? txt : muted }}>
                {activeSection===s && <span className="w-1 h-1 rounded-full" style={{ background:accent }} />}
                {s}
              </a>
            ))}
            <Link href="/v3" style={{ color:muted }} className="font-semibold">← V3</Link>
            <Link href="/v5" style={{ color:muted }} className="font-semibold">V5 →</Link>
          </nav>
        </div>
      </header>
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section ref={heroRef}
        className="relative min-h-screen flex flex-col z-10 pt-14 overflow-hidden"
        onMouseMove={onHeroMove}>
        <div ref={spotRef} className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ width:700, height:700, filter:"blur(100px)",
            background:`radial-gradient(circle, ${accent}12 0%, transparent 65%)` }} />
        {/* Top strip */}
        <div className="hero-sub max-w-5xl mx-auto px-6 w-full py-5 flex items-center justify-between"
          style={{ borderBottom:`1px solid ${border}` }}>
          <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color:subtle }}>
            {ROLE_STATIC}
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase" style={{ color:subtle }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:accent }} />
            Available for Work
          </span>
        </div>
        {/* Name */}
        <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto px-6 w-full py-10">
          <div style={{ overflow:"hidden" }}>
            <h1 className="hero-line font-black tracking-tighter leading-[0.85] select-none"
              style={{ fontSize:"clamp(5rem,15vw,11rem)", color:txt }}>
              JUSTIN
            </h1>
          </div>
          <div style={{ overflow:"hidden" }}>
            <h1 className="hero-line font-black tracking-tighter leading-[0.85] select-none"
              style={{ fontSize:"clamp(5rem,15vw,11rem)", color:accent }}>
              KIM.
            </h1>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="max-w-5xl mx-auto px-6 w-full py-8 flex flex-col md:flex-row md:items-end justify-between gap-8"
          style={{ borderTop:`1px solid ${border}` }}>
          <div className="hero-sub">
            <p className="text-base leading-relaxed max-w-sm" style={{ color:muted }}>
              I build precise, performant web experiences —<br />
              from pixel-perfect interfaces to robust backend systems.
            </p>
            <p className="font-mono text-[11px] tracking-widest uppercase mt-3" style={{ color:subtle }}>
              San Francisco, CA · Since 2019
            </p>
          </div>
          <div className="hero-sub flex items-center gap-3 shrink-0">
            <MagneticButton href="#projects" dataCursor="EXPLORE"
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full hover:opacity-85 transition-opacity"
              style={{ background:accent, color:bg }}>
              View Work <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </MagneticButton>
            <MagneticButton href="#contact" dataCursor="HELLO ↗"
              className="group inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border hover:opacity-70 transition-opacity"
              style={{ borderColor:border, color:txt }}>
              Contact <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </MagneticButton>
          </div>
        </div>
      </section>
      {/* ── About ───────────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-28">
          <p className="reveal font-mono text-[11px] tracking-widest uppercase mb-14" style={{ color:accent }}>
            02 — About
          </p>
          <div className="reveal grid grid-cols-3 gap-6 mb-16 pb-16" style={{ borderBottom:`1px solid ${border}` }}>
            {[{end:5,suffix:"+",label:"Years exp."},{end:50,suffix:"k+",label:"Users served"},{end:3,suffix:"",label:"Industries"}].map(({end,suffix,label}) => (
              <div key={label}>
                <p className="font-black tracking-tight mb-1" style={{ fontSize:"clamp(2.5rem,6vw,4rem)", color:accent }}>
                  <Counter end={end} suffix={suffix} />
                </p>
                <p className="font-mono text-[11px] tracking-widest uppercase" style={{ color:subtle }}>{label}</p>
              </div>
            ))}
          </div>
          <div className="reveal grid md:grid-cols-2 gap-14">
            <div className="space-y-4">
              <p className="leading-relaxed" style={{ color:muted }}>
                I&apos;m Justin, a web developer with 5+ years of experience building fast,
                accessible, and well-crafted applications. I care about clean code,
                thoughtful design, and things that actually work.
              </p>
              <p className="leading-relaxed" style={{ color:muted }}>
                Currently open to new opportunities. When I&apos;m not coding I&apos;m probably
                deep in a design rabbit hole or obsessing over performance metrics.
              </p>
            </div>
            <div>
              {[["Focus","Full-stack web development"],["Location","San Francisco, CA"],
                ["Experience","5+ years"],["Education","B.S. Computer Science"],["Status","Available"]].map(([l,v]) => (
                <div key={l} className="flex justify-between items-center py-3.5" style={{ borderBottom:`1px solid ${border}` }}>
                  <span className="font-mono text-[11px] tracking-widest uppercase" style={{ color:subtle }}>{l}</span>
                  <span className="text-sm" style={{ color:muted }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ── Projects ────────────────────────────────────────────────────── */}
      <section id="projects" className="relative z-10" style={{ background:surface }}>
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="reveal font-mono text-[11px] tracking-widest uppercase mb-16" style={{ color:accent }}>
            03 — Projects
          </p>
          {projects.slice(0, showAllProjects ? projects.length : PROJECTS_INITIAL).map((p, i) => {
            const hovered = hoveredProject === i;
            return (
              <div
                key={p.num}
                className="proj-row group"
                style={{ borderTop: `1px solid ${border}` }}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Main row */}
                <div className="flex items-center gap-6 py-7 transition-all duration-300 cursor-default">
                  {/* Ghost number */}
                  <span
                    className="font-black leading-none shrink-0 select-none transition-colors duration-300"
                    style={{
                      fontSize: "clamp(3rem,6vw,5rem)",
                      color: hovered ? accent : border,
                      width: "4rem",
                    }}>
                    {p.num}
                  </span>
                  {/* Title */}
                  <h3
                    className="font-black tracking-tight flex-1 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(1.5rem,3.5vw,2.8rem)",
                      color: hovered ? txt : muted,
                    }}>
                    {p.title}
                  </h3>
                  {/* Meta — hide on hover to give space */}
                  <div className="hidden md:flex items-center gap-8 shrink-0">
                    <span className="font-mono text-[11px] tracking-widest uppercase transition-colors duration-300"
                      style={{ color: hovered ? accent : subtle }}>
                      {p.category}
                    </span>
                    <span className="font-mono text-xs transition-colors duration-300" style={{ color: subtle }}>
                      {p.year}
                    </span>
                  </div>
                  {/* Arrow */}
                  <span
                    className="shrink-0 font-mono text-lg transition-all duration-300"
                    style={{
                      color: hovered ? accent : subtle,
                      transform: hovered ? "translate(4px, -4px)" : "none",
                    }}>
                    ↗
                  </span>
                </div>
                {/* Expandable details */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: hovered ? 200 : 0, opacity: hovered ? 1 : 0 }}>
                  <div className="pl-[calc(4rem+1.5rem)] pb-8 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-5">
                      <p className="text-sm leading-relaxed" style={{ color:muted }}>
                        {p.desc}
                      </p>
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold rounded-full px-4 py-2 transition-opacity hover:opacity-80"
                        style={{ background: accent, color: bg }}
                        data-cursor="VIEW →"
                      >
                        View Website ↗
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-2 content-start md:max-w-[220px]">
                      {p.stack.map(t => (
                        <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                          style={{ border:`1px solid ${border}`, color:subtle }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Bottom border + show more */}
          <div style={{ borderTop:`1px solid ${border}` }} />
          {projects.length > PROJECTS_INITIAL && (
            <button
              onClick={() => setShowAllProjects(v => !v)}
              className="mt-10 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase transition-colors"
              style={{ color: muted }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = txt; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = muted; }}
            >
              <span
                className="transition-transform duration-300"
                style={{ display:"inline-block", transform: showAllProjects ? "rotate(45deg)" : "none" }}>
                +
              </span>
              {showAllProjects
                ? `Show less`
                : `${projects.length - PROJECTS_INITIAL} more project${projects.length - PROJECTS_INITIAL > 1 ? "s" : ""}`}
            </button>
          )}
        </div>
      </section>
      {/* ── Skills ──────────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-28">
          <p className="reveal font-mono text-[11px] tracking-widest uppercase mb-12" style={{ color:accent }}>
            04 — Skills
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {allSkills.map(s => (
              <span key={s}
                className="font-mono text-sm text-center px-3 py-2 rounded-lg border transition-all cursor-default"
                style={{ borderColor:border, color:muted }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${accent}18`; el.style.borderColor = accent; el.style.color = txt;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "transparent"; el.style.borderColor = border; el.style.color = muted;
                }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* ── Experience ──────────────────────────────────────────────────── */}
      <section id="experience" className="relative z-10" style={{ background:surface }}>
        <div className="max-w-5xl mx-auto px-6 py-28">
          <p className="reveal font-mono text-[11px] tracking-widest uppercase mb-12" style={{ color:accent }}>
            05 — Experience
          </p>
          {experience.map((exp, i) => (
            <div key={exp.company} className="exp-row" style={{ borderTop:`1px solid ${border}` }}>
              <button className="w-full text-left" onClick={() => setActiveExp(activeExp===i ? null : i)}>
                <div className="flex items-center justify-between py-7 gap-6">
                  <h3 className="font-black tracking-tight transition-colors duration-300"
                    style={{ fontSize:"clamp(1.4rem,3.5vw,2.5rem)", color: activeExp===i ? accent : txt }}>
                    {exp.role.toUpperCase()}
                  </h3>
                  <div className="flex items-center gap-6 shrink-0">
                    <span className="font-mono text-xs hidden md:block" style={{ color:subtle }}>{exp.period}</span>
                    <span className="font-mono text-xl font-light transition-transform duration-300"
                      style={{ color:accent, transform: activeExp===i ? "rotate(45deg)" : "none" }}>+</span>
                  </div>
                </div>
              </button>
              <div className="overflow-hidden transition-all duration-500"
                style={{ maxHeight: activeExp===i ? 160 : 0, opacity: activeExp===i ? 1 : 0 }}>
                <div className="pb-8 flex flex-col md:flex-row md:items-start gap-6">
                  <p className="text-sm leading-relaxed flex-1" style={{ color:muted }}>{exp.desc}</p>
                  <div className="shrink-0">
                    <p className="font-black text-lg" style={{ color:txt }}>{exp.company}</p>
                    <p className="font-mono text-xs mt-1" style={{ color:subtle }}>{exp.period}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop:`1px solid ${border}` }} />
        </div>
      </section>
      {/* ── Contact ─────────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 min-h-screen flex flex-col justify-center" style={{ background:bg }}>
        <div className="max-w-5xl mx-auto px-6 py-24 w-full">
          <p className="font-mono text-[11px] tracking-widest uppercase mb-14" style={{ color:accent }}>06 — Contact</p>
          <div className="overflow-hidden mb-3">
            <span className="contact-word block font-black leading-[0.85] tracking-tight"
              style={{ fontSize:"clamp(3.5rem,11vw,9rem)", color:txt }}>LET&apos;S</span>
          </div>
          <div className="overflow-hidden mb-14">
            <span className="contact-word block font-black leading-[0.85] tracking-tight"
              style={{ fontSize:"clamp(3.5rem,11vw,9rem)", color:accent }}>WORK.</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-10"
            style={{ borderTop:`1px solid ${border}` }}>
            <p className="max-w-sm leading-relaxed" style={{ color:muted }}>
              Currently open to new opportunities. Whether you have a project in mind
              or just want to say hello — my inbox is always open.
            </p>
            <div className="flex flex-col items-start md:items-end gap-5">
              <MagneticButton href="mailto:kimkt.iu@gmail.com"
                dataCursor={copied ? "COPIED ✓" : "COPY ↗"} onClick={copyEmail}
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full hover:opacity-85 transition-opacity"
                style={{ background:accent, color:bg }}>
                <span>{copied ? "Copied! ✓" : "kimkt.iu@gmail.com"}</span>
                {!copied && <span className="transition-transform group-hover:translate-x-0.5">↗</span>}
              </MagneticButton>
              <div className="flex items-center gap-6">
                {[["GitHub","#"],["LinkedIn","#"],["Twitter","#"]].map(([n,h]) => (
                  <a key={n} href={h} data-cursor="OPEN ↗" className="font-mono text-sm transition-colors"
                    style={{ color:subtle }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = accent; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = subtle; }}>
                    {n}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer style={{ borderTop:`1px solid ${border}` }}>
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="font-mono text-xs" style={{ color:subtle }}>© 2024 Justin Kim</span>
          <span className="font-mono text-xs" style={{ color:subtle }}>Built with Next.js</span>
        </div>
      </footer>
    </div>
  );
}