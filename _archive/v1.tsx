"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
gsap.registerPlugin(ScrollTrigger, useGSAP);
const projects = [
  {
    num: "01",
    title: "Commerce Platform",
    category: "Web Application",
    stack: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    desc: "Full-stack e-commerce platform with real-time inventory management, multi-currency checkout, and a custom admin dashboard. Built to handle 10,000+ daily transactions without breaking a sweat.",
    year: "2024",
    featured: true,
  },
  {
    num: "02",
    title: "Design System",
    category: "Design Engineering",
    stack: ["React", "Storybook", "Figma", "Tailwind"],
    desc: "Component library and design system used across 4 products. Includes Figma documentation, usage guidelines, and automated visual regression testing.",
    year: "2023",
    featured: false,
  },
  {
    num: "03",
    title: "Analytics Dashboard",
    category: "Data Visualization",
    stack: ["React", "D3.js", "Python", "FastAPI"],
    desc: "Real-time analytics platform with interactive D3 charts, CSV export, and role-based access for teams.",
    year: "2023",
    featured: false,
  },
];
const skills: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  Backend: ["Node.js", "Python", "PostgreSQL", "Redis", "REST / GraphQL"],
  Tools: ["Git", "Figma", "Docker", "AWS", "Vercel"],
};
const experience = [
  {
    role: "Senior Frontend Developer",
    company: "Acme Corp",
    period: "2023 — Present",
    desc: "Lead frontend architecture for a SaaS platform serving 50k+ users. Reduced bundle size by 40% and cut first contentful paint in half.",
  },
  {
    role: "Frontend Developer",
    company: "Studio Blue",
    period: "2021 — 2023",
    desc: "Built interactive web experiences for clients including Fortune 500 companies. Obsessed over details so they didn't have to.",
  },
  {
    role: "Junior Developer",
    company: "Freelance",
    period: "2019 — 2021",
    desc: "Developed full-stack applications and websites for small businesses and startups.",
  },
];
export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.from(".hero-item", {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.utils.toArray<Element>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 18,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    },
    { scope: containerRef }
  );
  return (
    <div ref={containerRef} className="bg-white text-neutral-900 min-h-screen">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-bold text-base">
            Justin Kim
          </span>
          <nav className="hidden md:flex items-center gap-7 text-sm">
            {["about", "projects", "skills", "experience", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="relative capitalize text-neutral-500 hover:text-neutral-900 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-neutral-900 after:transition-all hover:after:w-full"
              >
                {s}
              </a>
            ))}
            <Link href="/v2" className="font-semibold text-neutral-900 hover:text-neutral-500 transition-colors">
              V2 →
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="pt-36 pb-28">
          <p className="hero-item font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-7">
            01 — Portfolio
          </p>
          <h1 className="hero-item font-black text-[clamp(4rem,10vw,7rem)] leading-[0.9] mb-5">
            Justin Kim
          </h1>
          <p className="hero-item text-xl text-neutral-400 font-light mb-7 tracking-wide">
            Web Developer
          </p>
          <p className="hero-item text-base text-neutral-500 max-w-md mb-10 leading-relaxed">
            I build precise, performant web experiences — from pixel-perfect
            interfaces to robust backend systems. Currently based in San
            Francisco.
          </p>
          <div className="hero-item flex items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-medium rounded-full transition-all hover:bg-neutral-700"
            >
              View Work
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-200 text-neutral-700 text-sm font-medium rounded-full transition-all hover:bg-neutral-900 hover:text-white hover:border-neutral-900"
            >
              Get in Touch
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        </section>
        <hr className="border-neutral-100" />
        {/* About */}
        <section id="about" className="py-20">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-10">
            02 — About
          </p>
          <div className="reveal grid md:grid-cols-2 gap-14">
            <div className="space-y-4">
              <p className="text-neutral-600 leading-relaxed">
                I&apos;m Justin, a web developer with 5+ years of experience building
                fast, accessible, and well-crafted web applications. I care
                about clean code, thoughtful design, and things that actually
                work.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Currently open to new opportunities. When I&apos;m not coding, I&apos;m
                probably deep in a design system, reading about performance
                optimization, or on my third coffee of the day.
              </p>
            </div>
            <div>
              {[
                ["Focus", "Full-Stack & AI development"],
                ["Location", "New Jersey, USA"],
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
        <section id="projects" className="py-20">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-10">
            03 — Projects
          </p>
          {/* Featured project */}
          {projects
            .filter((p) => p.featured)
            .map((p) => (
              <div
                key={p.num}
                className="reveal mb-5 rounded-2xl bg-neutral-50 border border-neutral-100 p-8 md:p-10"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                    {p.category}
                  </span>
                  <span className="font-mono text-xs text-neutral-400">{p.year}</span>
                </div>
                <h3 className="font-black text-3xl md:text-4xl text-neutral-900 mb-4 leading-tight">
                  {p.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed mb-6 max-w-2xl">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] text-neutral-500 bg-white border border-neutral-200 px-2.5 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 text-white text-xs font-medium rounded-full hover:bg-neutral-700 transition-all"
                  >
                    Live Site
                    <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                  </a>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-200 text-neutral-700 text-xs font-medium rounded-full hover:border-neutral-400 transition-all"
                  >
                    GitHub
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </a>
                </div>
              </div>
            ))}
          {/* Secondary projects */}
          <div className="reveal grid md:grid-cols-2 gap-5">
            {projects
              .filter((p) => !p.featured)
              .map((p) => (
                <div
                  key={p.num}
                  className="group rounded-2xl border border-neutral-100 p-7 flex flex-col gap-4 hover:border-neutral-200 hover:bg-neutral-50/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
                      {p.category}
                    </span>
                    <span className="font-mono text-xs text-neutral-400">{p.year}</span>
                  </div>
                  <div>
                    <h3 className="font-black text-2xl text-neutral-900 mb-2 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{p.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] text-neutral-400 bg-neutral-50 border border-neutral-100 px-2 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors w-fit"
                  >
                    View Project
                    <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
                  </a>
                </div>
              ))}
          </div>
        </section>
        <hr className="border-neutral-100" />
        {/* Skills */}
        <section id="skills" className="py-20">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-10">
            04 — Skills
          </p>
          <div className="reveal grid md:grid-cols-3 gap-10">
            {Object.entries(skills).map(([cat, items]) => (
              <div key={cat}>
                <h3 className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-5">
                  {cat}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-sm text-neutral-600 border border-neutral-200 px-3 py-1 rounded-full hover:border-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        <hr className="border-neutral-100" />
        {/* Experience */}
        <section id="experience" className="py-20">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-10">
            05 — Experience
          </p>
          <div>
            {experience.map((exp) => (
              <div
                key={exp.company}
                className="reveal py-8 border-b border-neutral-100"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                  <div>
                    <h3 className="font-semibold text-neutral-900">{exp.role}</h3>
                    <p className="text-sm text-neutral-500">{exp.company}</p>
                  </div>
                  <span className="font-mono text-xs text-neutral-400 shrink-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
                  {exp.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
        <hr className="border-neutral-100" />
        {/* Contact */}
        <section id="contact" className="py-20">
          <p className="reveal font-mono text-[11px] tracking-widest text-neutral-400 uppercase mb-8">
            06 — Contact
          </p>
          <div className="reveal">
            <h2 className="font-black text-4xl md:text-5xl text-neutral-900 mb-4 leading-tight">
              Let&apos;s work together.
            </h2>
            <p className="text-neutral-500 mb-8 max-w-md leading-relaxed">
              I&apos;m currently open to new opportunities. Whether you have a
              project in mind or just want to say hello — my inbox is always
              open.
            </p>
            <a
              href="mailto:devdesignjustin@gmail.com"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-700 transition-all"
            >
              devdesignjustin@gmail.com
              <span className="transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
            <div className="flex items-center gap-5 mt-8">
              {[["GitHub", "#"], ["LinkedIn", "#"], ["Twitter", "#"]].map(
                ([name, href]) => (
                  <a
                    key={name}
                    href={href}
                    className="relative text-sm text-neutral-400 hover:text-neutral-700 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-neutral-700 after:transition-all hover:after:w-full"
                  >
                    {name}
                  </a>
                )
              )}
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