"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ── Palette ────────────────────────────────────────────────────────────────────
const THEMES = {
  dark:  { bg:"#070707", surface:"#0c0c0c", txt:"#efefef", muted:"#555",    subtle:"#282828", border:"#161616" },
  light: { bg:"#f5f0e8", surface:"#ece7dc", txt:"#1a1410", muted:"#8a7a6a", subtle:"#d4cdc4", border:"#ddd8d0" },
};

const ACCENT_COLORS = ["#a78bfa","#2dd4bf","#fb923c","#f472b6","#4ade80"];
const ACCENT_NAMES  = ["Violet","Teal","Orange","Pink","Green"];

// ── Constants ──────────────────────────────────────────────────────────────────
const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
const SPARKLE_COLORS = ["#a78bfa","#f0f0f0","#fbbf24","#34d399","#f472b6"];
const TICKER = [
  "NEXT.JS","TYPESCRIPT","REACT","DARK MODE ONLY","FIGMA","LATE NIGHT BUILDS",
  "GSAP","TAILWIND CSS","PERFORMANCE OBSESSED","NODE.JS","OPEN TO WORK",
  "POSTGRESQL","CLEAN CODE","DOCKER","VERCEL","CSS GRID ENTHUSIAST",
];
const GITHUB_USERNAME = "DevDesignJustin";

// ── Data ───────────────────────────────────────────────────────────────────────
const projects = [
  { num:"01", title:"Commerce Platform",   cat:"Web Application",    year:"2024", link:"#",
    stack:["Next.js","TypeScript","Stripe","PostgreSQL"],
    desc:"Full-stack e-commerce platform with real-time inventory management, multi-currency checkout, and a custom admin dashboard built to handle 10k+ daily transactions." },
  { num:"02", title:"Design System",       cat:"Design Engineering", year:"2023", link:"#",
    stack:["React","Storybook","Figma","Tailwind"],
    desc:"Component library used across 4 products with Figma documentation, usage guidelines, and automated visual regression testing." },
  { num:"03", title:"Analytics Dashboard", cat:"Data Visualization", year:"2023", link:"#",
    stack:["React","D3.js","Python","FastAPI"],
    desc:"Real-time analytics platform with interactive D3 charts, CSV export, and role-based access control for teams of all sizes." },
];

const miniProjects = [
  { title:"Dev Portfolio v5",    tag:"This site",        year:"2025", link:"#",
    stack:["Next.js","GSAP","Tailwind"],
    desc:"The portfolio you're looking at — built as a playground for animations, interactions, and UI experiments." },
  { title:"AI Prompt Toolkit",   tag:"Open Source",      year:"2025", link:"#",
    stack:["Python","OpenAI","CLI"],
    desc:"A command-line toolkit for chaining, testing, and versioning LLM prompts across projects." },
  { title:"CSS Grid Playground", tag:"Learning Tool",    year:"2024", link:"#",
    stack:["HTML","CSS","Vanilla JS"],
    desc:"Interactive sandbox for visualizing CSS Grid layouts with live code output and copy-paste snippets." },
  { title:"Palette Thief",       tag:"Browser Extension",year:"2024", link:"#",
    stack:["TypeScript","Chrome API","Canvas"],
    desc:"Chrome extension that extracts a full color palette from any webpage with one click." },
  { title:"Daily UI Archive",    tag:"Design Practice",  year:"2023", link:"#",
    stack:["Figma","CSS","React"],
    desc:"100-day challenge archive — daily UI components built in Figma then coded in React." },
  { title:"GSAP Experiments",    tag:"Sandbox",          year:"2023", link:"#",
    stack:["GSAP","HTML","CSS"],
    desc:"Collection of scroll, morphing, and stagger animation demos exploring the limits of GSAP." },
];

const experience = [
  { role:"Senior Frontend Developer", company:"Acme Corp",   period:"2023 — Present",
    desc:"Lead frontend architecture for a SaaS platform serving 50k+ users. Reduced bundle size by 40% and halved first contentful paint." },
  { role:"Frontend Developer",        company:"Studio Blue", period:"2021 — 2023",
    desc:"Built interactive web experiences for Fortune 500 clients. Obsessed over every pixel so they didn't have to." },
  { role:"Junior Developer",          company:"Freelance",   period:"2019 — 2021",
    desc:"Full-stack applications and websites for small businesses and startups finding their footing." },
];

const skills = ["React","Next.js","TypeScript","Tailwind CSS","Framer Motion","GSAP","HTML","CSS","Node.js","Python","PostgreSQL","Redis","GraphQL","Git","Figma","Docker","AWS","Vercel"];
const NAV     = ["about","work","mini","skills","github","experience","contact"];
const PROJ_INITIAL = 2;

// ── Terminal commands ──────────────────────────────────────────────────────────
const TERM_COMMANDS: Record<string,(a:string[])=>string[]> = {
  help:     ()=>["Available commands:","","  whoami    — who is justin?","  skills    — tech stack","  projects  — selected work","  ls        — alias for projects","  contact   — get in touch","  neofetch  — system info","  hire      — best decision ever","  sudo      — try it 😏","  clear     — clear terminal"],
  whoami:   ()=>["Justin Kim","────────────────────────────","Role      Full-Stack & AI Developer","Location  New Jersey, USA","Status    ● Available for work","Email     devdesignjustin@gmail.com","Since     2019"],
  skills:   ()=>["Frontend   React · Next.js · TypeScript · Tailwind · GSAP · HTML · CSS","Backend    Node.js · Python · PostgreSQL · Redis","Tools      Git · Figma · Docker · AWS · Vercel"],
  projects: ()=>["01  Commerce Platform    — Next.js · Stripe · PostgreSQL","02  Design System        — React · Storybook · Figma","03  Analytics Dashboard  — React · D3.js · FastAPI"],
  ls:       (a)=>TERM_COMMANDS.projects(a),
  contact:  ()=>["📧  devdesignjustin@gmail.com","🔗  github.com/"+GITHUB_USERNAME,"    → Scroll down to reach out"],
  hire:     ()=>["Great choice! 🎉","→ Scrolling to contact section...","(or email devdesignjustin@gmail.com directly)"],
  sudo:     ()=>["sudo: you need level 99 credentials","hint: try  sudo hire-me"],
  "sudo hire-me": ()=>["[sudo] password for you: ••••••••","Access granted 🔓","✓ Sending offer letter","✓ Scheduling onboarding","✓ Setting up workspace","Welcome aboard! (email me for real though)"],
  neofetch: ()=>["  ██╗██╗  ██╗","  ██║██║ ██╔╝","  ██║█████╔╝   justin@portfolio","  ██║██╔═██╗   ─────────────────────","  ╚█████╔╝██║  OS: macOS Sequoia","   ╚════╝ ╚═╝  Shell: zsh","              Editor: VS Code","              Browser: Arc","              Drink: Water 💧 /day","              Status: Available"],
};

// ── MagneticButton ─────────────────────────────────────────────────────────────
function MagneticButton({ href, className, style, children, onClick, dataCursor }: {
  href:string; className?:string; style?:React.CSSProperties; children:ReactNode;
  onClick?:(e:React.MouseEvent<HTMLAnchorElement>)=>void; dataCursor?:string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e:React.MouseEvent) => {
    const el=ref.current; if (!el) return;
    const r=el.getBoundingClientRect();
    gsap.to(el,{x:(e.clientX-r.left-r.width/2)*0.3,y:(e.clientY-r.top-r.height/2)*0.3,duration:0.3,ease:"power2.out"});
  };
  const leave = () => gsap.to(ref.current,{x:0,y:0,duration:0.7,ease:"elastic.out(1,0.45)"});
  return (
    <a ref={ref} href={href} className={className} style={style}
      onMouseMove={move} onMouseLeave={leave} onClick={onClick} data-cursor={dataCursor}>
      {children}
    </a>
  );
}

// ── Counter ────────────────────────────────────────────────────────────────────
function Counter({ end, suffix="" }: { end:number; suffix?:string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    const el=ref.current; if (!el) return;
    const obj={val:0};
    gsap.to(obj,{
      val:end, duration:2.2, ease:"power3.out",
      scrollTrigger:{trigger:el,start:"top 88%"},
      onUpdate(){ el.textContent=Math.floor(obj.val)+suffix; },
    });
  },[end,suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ── CursorTrail ────────────────────────────────────────────────────────────────
function CursorTrail({ items, accent }:{ items:{id:number,x:number,y:number,age:number}[]; accent:string }) {
  return (
    <>
      {items.map((p,i)=>(
        <div key={p.id} className="pointer-events-none fixed z-[9990] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{left:p.x,top:p.y,width:3,height:3,background:accent,opacity:(i/items.length)*0.35}}/>
      ))}
    </>
  );
}

// ── Toast ──────────────────────────────────────────────────────────────────────
function Toast({ message, visible, accent }:{ message:string; visible:boolean; accent:string }) {
  return (
    <div className="fixed bottom-8 left-1/2 z-[9999] pointer-events-none"
      style={{transform:"translateX(-50%)",transition:"all 0.5s cubic-bezier(.16,1,.3,1)",
        opacity:visible?1:0,translate:visible?"0 0":"0 14px"}}>
      <div className="px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap"
        style={{background:accent,color:"#070707"}}>{message}</div>
    </div>
  );
}

// ── ContextMenu ────────────────────────────────────────────────────────────────
function ContextMenu({ pos, accent, colors, onClose, onHire, onCopyEmail, onKonami, onTheme }:{
  pos:{x:number,y:number}; accent:string; colors:typeof THEMES.dark;
  onClose:()=>void; onHire:()=>void; onCopyEmail:()=>void; onKonami:()=>void; onTheme:()=>void;
}) {
  const { bg, surface, txt, muted, border } = colors;
  const items=[
    {icon:"💼",label:"Hire Justin",  action:onHire},
    {icon:"📧",label:"Copy email",   action:onCopyEmail},
    {icon:"🎮",label:"Konami code",  action:onKonami},
    {icon:"🎨",label:"Change theme", action:onTheme},
  ];
  return (
    <div className="fixed z-[9995] min-w-[180px] rounded-2xl border overflow-hidden shadow-2xl py-1.5"
      style={{left:Math.min(pos.x,window.innerWidth-200),top:Math.min(pos.y,window.innerHeight-180),background:surface,borderColor:border,
        boxShadow:`0 16px 48px ${bg}99`}}>
      <p className="font-mono text-[9px] tracking-widest uppercase px-4 py-2" style={{color:muted}}>justin.kim</p>
      {items.map(item=>(
        <button key={item.label} onClick={()=>{item.action();onClose();}}
          className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors"
          style={{color:muted}}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background=`${accent}18`;el.style.color=txt;}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="transparent";el.style.color=muted;}}>
          <span>{item.icon}</span>{item.label}
        </button>
      ))}
    </div>
  );
}

// ── KonamiOverlay ──────────────────────────────────────────────────────────────
function KonamiOverlay({ onClose, accent }:{ onClose:()=>void; accent:string }) {
  const confetti=Array.from({length:40},(_,i)=>({
    id:i, color:SPARKLE_COLORS[i%SPARKLE_COLORS.length],
    tx:`${(Math.random()-0.5)*600}px`, ty:`${Math.random()*400+100}px`,
    rot:`${(Math.random()-0.5)*720}deg`, x:Math.random()*100,
    size:6+Math.random()*8, delay:Math.random()*0.5,
  }));
  return (
    <div className="fixed inset-0 z-[9000] flex items-center justify-center overflow-hidden"
      style={{background:"rgba(0,0,0,0.97)"}}>
      {confetti.map(c=>(
        <div key={c.id} className="absolute top-1/3 rounded-sm pointer-events-none"
          style={{
            left:`${c.x}%`,width:c.size,height:c.size,background:c.color,
            animation:`confetti-fly 1.2s ease-out ${c.delay}s forwards`,
            // @ts-expect-error css vars
            "--tx":c.tx,"--ty":c.ty,"--rot":c.rot,
          }}/>
      ))}
      <div className="relative text-center px-8 max-w-lg">
        <p className="font-mono text-[11px] tracking-widest uppercase mb-6" style={{color:accent}}>
          🎮 easter egg unlocked
        </p>
        <pre className="font-mono text-xs leading-relaxed mb-8 select-none" style={{color:"#282828"}}>
{`  ↑ ↑ ↓ ↓ ← → ← → B A\n\n    you actually did it.`}
        </pre>
        <h2 className="font-black text-5xl mb-4" style={{color:"#efefef"}}>Secret Unlocked 🎉</h2>
        <p className="leading-relaxed mb-8" style={{color:"#555"}}>
          You&apos;ve discovered the Konami Code.<br/>
          As a reward — my honest bio:<br/><br/>
          <span style={{color:"#efefef"}}>
            I name variables poorly on the first try,
            and Google flexbox every single time. But I ship things people love.
          </span>
        </p>
        <button onClick={onClose}
          className="px-6 py-3 rounded-full font-bold text-sm hover:opacity-80 transition-opacity"
          style={{background:accent,color:"#070707"}}>
          Back to the portfolio ↩
        </button>
      </div>
    </div>
  );
}

// ── SectionHeader ──────────────────────────────────────────────────────────────
function SectionHeader({ num, label, accent, border, muted }:{ num:string; label:string; accent:string; border:string; muted:string }) {
  return (
    <div className="reveal flex items-center gap-5 mb-20">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase shrink-0" style={{color:accent}}>{num}</span>
      <div className="section-line flex-1 h-px" style={{background:border}}/>
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase shrink-0" style={{color:muted}}>{label}</span>
    </div>
  );
}

// ── GitHubStats ────────────────────────────────────────────────────────────────
function GitHubStats({ accent, colors }: { accent:string; colors:typeof THEMES.dark }) {
  const { txt, muted, subtle, border } = colors;
  const [repoCount, setRepoCount] = useState<number|null>(null);
  const [repos, setRepos] = useState<{name:string,description:string|null,stargazers_count:number,language:string|null}[]>([]);

  useEffect(()=>{
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(r=>r.json())
      .then(d=>{ if (d.public_repos !== undefined) setRepoCount(d.public_repos); })
      .catch(()=>{});
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=6`)
      .then(r=>r.json())
      .then(d=>{ if (Array.isArray(d)) setRepos(d); })
      .catch(()=>{});
  },[]);

  return (
    <div className="space-y-16">
      {/* Repos count */}
      <div className="reveal pb-16" style={{borderBottom:`1px solid ${border}`}}>
        <p className="font-black leading-none mb-3" style={{fontSize:"clamp(2.8rem,6vw,5rem)",color:accent}}>
          {repoCount??0}
        </p>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{color:muted}}>Public repos</p>
      </div>

      {/* Contribution chart */}
      <div className="reveal">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6" style={{color:muted}}>Contribution activity</p>
        <img
          src={`https://ghchart.rshah.org/${accent.replace('#','')}/${GITHUB_USERNAME}`}
          alt="GitHub contributions"
          className="w-full rounded-lg opacity-70"
        />
      </div>

      {/* Top repos */}
      {repos.length > 0 && (
        <div className="reveal">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-8" style={{color:muted}}>Top repositories</p>
          <div className="grid md:grid-cols-3 gap-4">
            {repos.slice(0,3).map(repo=>(
              <a key={repo.name} href={`https://github.com/${GITHUB_USERNAME}/${repo.name}`}
                target="_blank" rel="noopener noreferrer"
                className="block p-5 rounded-2xl border transition-all duration-200"
                style={{borderColor:border,background:"transparent"}}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor=accent;el.style.background=`${accent}08`;}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor=border;el.style.background="transparent";}}>
                <p className="font-bold text-sm mb-2 truncate" style={{color:txt}}>{repo.name}</p>
                {repo.description && (
                  <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{color:muted}}>{repo.description}</p>
                )}
                <div className="flex items-center gap-4 mt-auto">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 font-mono text-[10px]" style={{color:muted}}>
                      <span className="w-2 h-2 rounded-full" style={{background:accent}}/>
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 font-mono text-[10px]" style={{color:subtle}}>
                    ★ {repo.stargazers_count}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Terminal widget ────────────────────────────────────────────────────────────
function TerminalWidget({ accent, colors }: { accent:string; colors:typeof THEMES.dark }) {
  const { bg, surface, txt, muted, subtle, border } = colors;
  const [open,    setOpen]    = useState(false);
  const [history, setHistory] = useState<{type:"in"|"out",text:string}[]>([
    {type:"out",text:"Justin Kim — Portfolio Terminal v1.0"},
    {type:"out",text:"Type 'help' for available commands."},
    {type:"out",text:""},
  ]);
  const [input,   setInput]   = useState("");
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const panelRef  = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);
  const endRef    = useRef<HTMLDivElement>(null);

  // Slide panel in/out
  useEffect(()=>{
    gsap.to(panelRef.current,{
      y: open ? 0 : 20,
      opacity: open ? 1 : 0,
      pointerEvents: open ? "all" : "none",
      duration: 0.4,
      ease: open ? "power3.out" : "power2.in",
    });
    if (open) setTimeout(()=>inputRef.current?.focus(), 420);
  },[open]);

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[history]);

  const runCmd=(raw:string)=>{
    const cmd=raw.trim(); if (!cmd) return;
    setCmdHist(h=>[cmd,...h]); setHistIdx(-1);
    const lower=cmd.toLowerCase();
    if (lower==="clear"){ setHistory([]); setInput(""); return; }
    const handler=TERM_COMMANDS[lower];
    const lines=handler?handler([]):[`command not found: ${cmd.split(" ")[0]}`,"run 'help' to see available commands"];
    setHistory(h=>[...h,{type:"in",text:`$ ${cmd}`},...lines.map(l=>({type:"out" as const,text:l})),{type:"out",text:""}]);
    setInput("");
    if (lower==="hire") setTimeout(()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}),800);
  };

  const onKey=(e:React.KeyboardEvent)=>{
    if (e.key==="Escape"){setOpen(false);return;}
    if (e.key==="Enter"){runCmd(input);return;}
    if (e.key==="ArrowUp"){e.preventDefault();const i=Math.min(histIdx+1,cmdHist.length-1);setHistIdx(i);setInput(cmdHist[i]??"");}
    if (e.key==="ArrowDown"){e.preventDefault();const i=Math.max(histIdx-1,-1);setHistIdx(i);setInput(i===-1?"":cmdHist[i]??"");}
  };

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-3">
      {/* Floating panel */}
      <div ref={panelRef} className="rounded-2xl overflow-hidden border opacity-0"
        style={{
          width:380, background:bg, borderColor:border,
          pointerEvents:"none",
        }}
        onClick={()=>inputRef.current?.focus()}>
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{borderColor:border,background:surface}}>
          <span className="w-2.5 h-2.5 rounded-full" style={{background:"#ff5f57"}}
            onClick={e=>{e.stopPropagation();setOpen(false);}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.opacity="0.7";}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.opacity="1";}}/>
          <span className="w-2.5 h-2.5 rounded-full" style={{background:"#ffbd2e"}}/>
          <span className="w-2.5 h-2.5 rounded-full" style={{background:"#28c840"}}/>
          <span className="flex-1 text-center font-mono text-[10px]" style={{color:muted}}>
            justin@portfolio — bash
          </span>
        </div>
        {/* Output */}
        <div className="overflow-y-auto p-4" style={{height:260,scrollbarWidth:"none"}}>
          {history.map((l,i)=>(
            <p key={i} className="font-mono text-[13px] leading-relaxed whitespace-pre"
              style={{color:l.type==="in"?accent:l.text.includes("not found")?"#f87171":muted}}>
              {l.text||" "}
            </p>
          ))}
          <div ref={endRef}/>
        </div>
        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-t" style={{borderColor:border}}>
          <span className="font-mono text-sm" style={{color:accent}}>$</span>
          <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
            className="flex-1 bg-transparent font-mono text-[13px] outline-none"
            placeholder="type a command…"
            style={{color:txt,caretColor:accent}} autoComplete="off" spellCheck={false}/>
        </div>
      </div>

      {/* Toggle button */}
      <button onClick={()=>setOpen(v=>!v)}
        className="flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full border font-mono text-[11px] tracking-widest uppercase transition-all"
        style={{
          background: open ? accent : surface,
          borderColor: open ? accent : border,
          color: open ? bg : muted,
        }}
        onMouseEnter={e=>{if(!open){const el=e.currentTarget as HTMLElement;el.style.borderColor=accent;el.style.color=accent;}}}
        onMouseLeave={e=>{if(!open){const el=e.currentTarget as HTMLElement;el.style.borderColor=border;el.style.color=muted;}}}>
        <span className="font-mono text-base leading-none" style={{letterSpacing:0}}>
          {open ? "×" : ">_"}
        </span>
        {open ? "close" : "terminal"}
      </button>
    </div>
  );
}

// ── Loader ────────────────────────────────────────────────────────────────────
function Loader({ accent, onDone }: { accent:string; onDone:()=>void }) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const ringRef     = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLSpanElement>(null);
  const barRef      = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const counter = { val:0 };
    const tl = gsap.timeline({ onComplete: onDone });

    tl
      // Ring fades + scales in
      .from(ringRef.current,{ scale:0.6, opacity:0, duration:0.5, ease:"power3.out" })
      // Counter + bar run together
      .to(counter,{
        val:100, duration:1.1, ease:"power2.inOut",
        onUpdate(){
          const v = Math.floor(counter.val);
          if (counterRef.current) counterRef.current.textContent = String(v).padStart(3,"0");
          if (barRef.current) barRef.current.style.transform = `scaleX(${v/100})`;
        },
      },"-=0.2")
      // Ring pulses once
      .to(ringRef.current,{ scale:1.15, duration:0.18, ease:"power2.out" })
      .to(ringRef.current,{ scale:1,    duration:0.18, ease:"power2.in"  })
      // Brief hold
      .to({},{duration:0.15})
      // Iris close: clip-path circle shrinks to nothing
      .to(overlayRef.current,{
        clipPath:"circle(0% at 50% 50%)",
        duration:0.8,
        ease:"power4.inOut",
      });

    return ()=>{ tl.kill(); };
  },[onDone]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] pointer-events-none select-none flex flex-col items-center justify-center"
      style={{
        background:"#070707",
        clipPath:"circle(150% at 50% 50%)",
      }}>

      {/* Accent ring */}
      <div ref={ringRef}
        className="flex items-center justify-center rounded-full mb-8"
        style={{
          width:72, height:72,
          border:`1.5px solid ${accent}`,
          boxShadow:`0 0 28px ${accent}44`,
        }}>
        <div className="rounded-full" style={{width:8,height:8,background:accent}}/>
      </div>

      {/* Counter */}
      <span ref={counterRef}
        className="font-mono tabular-nums"
        style={{fontSize:"clamp(3rem,8vw,6rem)",fontWeight:900,color:"#efefef",letterSpacing:"-0.04em",lineHeight:1}}>
        000
      </span>
      <span className="font-mono text-xs tracking-[0.25em] uppercase mt-2" style={{color:"#333"}}>
        loading
      </span>

      {/* Progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-px overflow-hidden" style={{background:"#111"}}>
        <div ref={barRef}
          className="h-full origin-left"
          style={{background:accent, transform:"scaleX(0)", transition:"none"}}/>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function V5() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLElement>(null);
  const spotRef      = useRef<HTMLDivElement>(null);
  const nameRef      = useRef<HTMLDivElement>(null);
  const metaRef      = useRef<HTMLDivElement>(null);
  const heroGridRef  = useRef<HTMLDivElement>(null);
  const themeOverlayRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef    = useRef<HTMLButtonElement>(null);

  const [showLoader,      setShowLoader]      = useState(true);
  const [loaderDone,      setLoaderDone]      = useState(false);
  const [isDark,          setIsDark]          = useState(false);
  const [accentIdx,       setAccentIdx]       = useState(2);
  const [activeSection,   setActiveSection]   = useState("");
  const [hoveredProject,  setHoveredProject]  = useState<number|null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [activeExp,       setActiveExp]       = useState<number|null>(null);
  const [copied,          setCopied]          = useState(false);
  const [trail,           setTrail]           = useState<{id:number,x:number,y:number,age:number}[]>([]);
  const [toast,           setToast]           = useState<{msg:string,visible:boolean}>({msg:"",visible:false});
  const [konamiActive,    setKonamiActive]    = useState(false);
  const [contextMenu,     setContextMenu]     = useState<{x:number,y:number}|null>(null);

  const trailId        = useRef(0);
  const konamiProgress = useRef(0);
  const toastTimer     = useRef<ReturnType<typeof setTimeout>|null>(null);

  const accent = ACCENT_COLORS[accentIdx];

  // Derive colors from theme
  const { bg, surface, txt, muted, subtle, border } = THEMES[isDark ? "dark" : "light"];

  const showToast = useCallback((msg:string)=>{
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({msg,visible:true});
    toastTimer.current=setTimeout(()=>setToast(t=>({...t,visible:false})),3200);
  },[]);

  const cycleAccent = useCallback(()=>{
    setAccentIdx(i=>(i+1)%ACCENT_COLORS.length);
    showToast(`theme: ${ACCENT_NAMES[(accentIdx+1)%ACCENT_COLORS.length]} 🎨`);
  },[accentIdx,showToast]);

  const toggleTheme = useCallback(()=>{
    const btn=toggleBtnRef.current, overlay=themeOverlayRef.current;
    if (!btn||!overlay) return;
    const rect=btn.getBoundingClientRect();
    const x=rect.left+rect.width/2, y=rect.top+rect.height/2;
    const newDark=!isDark;
    gsap.set(overlay,{background:THEMES[newDark?"dark":"light"].bg,display:"block",clipPath:`circle(0% at ${x}px ${y}px)`});
    gsap.to(overlay,{clipPath:`circle(170% at ${x}px ${y}px)`,duration:0.85,ease:"power4.inOut",
      onComplete(){ setIsDark(newDark); gsap.set(overlay,{display:"none"}); }});
  },[isDark]);

  const onLoaderDone = useCallback(()=>{
    setShowLoader(false);
    setLoaderDone(true);
    sessionStorage.setItem("jk_v5","1");
  },[]);

  // ── Effects ────────────────────────────────────────────────────────────────
  // Skip loader for returning visitors this session
  useEffect(()=>{
    if (sessionStorage.getItem("jk_v5")){ setShowLoader(false); setLoaderDone(true); }
  },[]);
  useEffect(()=>{
    const orig=document.title;
    const h=()=>{ document.title=document.hidden?"psst, come back 👀":orig; };
    document.addEventListener("visibilitychange",h);
    return()=>{ document.removeEventListener("visibilitychange",h); document.title=orig; };
  },[]);

  useEffect(()=>{
    const h=(e:MouseEvent)=>{
      const id=trailId.current++;
      setTrail(t=>[...t.slice(-18),{id,x:e.clientX,y:e.clientY,age:Date.now()}]);
      setTimeout(()=>setTrail(t=>t.filter(p=>p.id!==id)),350);
    };
    window.addEventListener("mousemove",h);
    return()=>window.removeEventListener("mousemove",h);
  },[]);

  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{
      if (e.key===KONAMI[konamiProgress.current]){
        konamiProgress.current++;
        if (konamiProgress.current===KONAMI.length){ konamiProgress.current=0; setKonamiActive(true); }
      } else { konamiProgress.current=0; }
    };
    window.addEventListener("keydown",h);
    return()=>window.removeEventListener("keydown",h);
  },[showToast]);

  useEffect(()=>{
    const h=(e:MouseEvent)=>{ e.preventDefault(); setContextMenu({x:e.clientX,y:e.clientY}); };
    const close=()=>setContextMenu(null);
    document.addEventListener("contextmenu",h);
    window.addEventListener("scroll",close,{passive:true});
    return()=>{ document.removeEventListener("contextmenu",h); window.removeEventListener("scroll",close); };
  },[]);

  // ── Hero interactions ──────────────────────────────────────────────────────
  const onHeroMove = useCallback((e:React.MouseEvent)=>{
    const rect=heroRef.current?.getBoundingClientRect(); if (!rect) return;
    gsap.to(spotRef.current,{x:e.clientX-rect.left,y:e.clientY-rect.top,duration:1.4,ease:"power3.out"});
    const cx=rect.width/2, cy=rect.height/2;
    const rx=((e.clientY-rect.top)-cy)/cy*-5;
    const ry=((e.clientX-rect.left)-cx)/cx*5;
    gsap.to(heroGridRef.current,{
      rotateX:rx, rotateY:ry,
      duration:0.8, ease:"power2.out", transformPerspective:1200,
    });
  },[]);

  const onHeroLeave = useCallback(()=>{
    gsap.to(heroGridRef.current,{rotateX:0,rotateY:0,duration:1.4,ease:"elastic.out(1,0.35)"});
  },[]);

  const copyEmail = (e:React.MouseEvent<HTMLAnchorElement>)=>{
    e.preventDefault();
    navigator.clipboard.writeText("devdesignjustin@gmail.com");
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  };

  const onKimDblClick=()=>{
    const letters=document.querySelectorAll(".kim-letter");
    gsap.to(letters,{
      x:()=>gsap.utils.random(-220,220),
      y:()=>gsap.utils.random(-160,160),
      rotation:()=>gsap.utils.random(-180,180),
      opacity:0, duration:0.65, stagger:{each:0.04,from:"random"}, ease:"power3.out",
      onComplete(){ gsap.to(letters,{x:0,y:0,rotation:0,opacity:1,duration:0.9,stagger:{each:0.05,from:"random"},ease:"back.out(1.5)"}); },
    });
  };

  // ── GSAP: scroll-based (runs on mount) ────────────────────────────────────
  useGSAP(()=>{
    // Progress bar
    gsap.to(progressRef.current,{scaleX:1,ease:"none",scrollTrigger:{start:"top top",end:"bottom bottom",scrub:true}});

    // Active section nav dots
    NAV.forEach(id=>{
      ScrollTrigger.create({
        trigger:`#${id}`,start:"top 50%",end:"bottom 50%",
        onEnter:()=>setActiveSection(id), onLeave:()=>setActiveSection(""),
        onEnterBack:()=>setActiveSection(id), onLeaveBack:()=>setActiveSection(""),
      });
    });

    // Background orb drift
    gsap.to(".orb-1",{y:-250,ease:"none",scrollTrigger:{start:"top top",end:"bottom bottom",scrub:3}});

    // Hero name parallax
    gsap.to(nameRef.current,{
      y:-140, ease:"none",
      scrollTrigger:{trigger:heroRef.current,start:"top top",end:"bottom top",scrub:1.8},
    });

    // Section lines (scale from 0 to 1)
    gsap.utils.toArray<Element>(".section-line").forEach(el=>{
      gsap.from(el,{scaleX:0,transformOrigin:"left",duration:1.1,ease:"power3.inOut",scrollTrigger:{trigger:el,start:"top 88%"}});
    });

    // Generic reveals
    gsap.utils.toArray<Element>(".reveal").forEach(el=>{
      gsap.from(el,{y:36,opacity:0,duration:0.85,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 91%"}});
    });

    // Project rows
    gsap.utils.toArray<Element>(".proj-row").forEach((el,i)=>{
      gsap.from(el,{opacity:0,y:24,duration:0.75,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 92%"},delay:i*0.05});
    });

    // Experience rows (alternate slide)
    gsap.utils.toArray<Element>(".exp-row").forEach((el,i)=>{
      gsap.from(el,{x:i%2===0?-80:80,opacity:0,duration:0.8,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%"}});
    });

    // Contact word clips
    gsap.from(".contact-word",{
      y:"112%", duration:1.2, stagger:0.12, ease:"power4.out",
      scrollTrigger:{trigger:"#contact",start:"top 70%"},
    });
  },{ scope:containerRef });

  // ── GSAP: hero entry (fires once loader is done) ───────────────────────────
  useGSAP(()=>{
    if (!loaderDone) return;
    gsap.from(".hero-line",{y:"110%",duration:1.3,stagger:0.13,ease:"power4.out",delay:0.05});
    gsap.from(".hero-cell",{opacity:0,x:28,duration:0.8,stagger:0.1,ease:"power3.out",delay:0.3});
    gsap.from(".hero-bottom",{opacity:0,y:18,duration:0.9,ease:"power3.out",delay:0.5});
  },{ scope:containerRef, dependencies:[loaderDone] });

  return (
    <div ref={containerRef} style={{background:bg,color:txt}} className="min-h-screen"
      onClick={()=>setContextMenu(null)}>

      {/* Page loader */}
      {showLoader && <Loader accent={accent} onDone={onLoaderDone}/>}

      {/* Layers */}
      <CursorTrail items={trail} accent={accent}/>
      <Toast message={toast.msg} visible={toast.visible} accent={accent}/>
      {konamiActive && <KonamiOverlay onClose={()=>setKonamiActive(false)} accent={accent}/>}
      {contextMenu && (
        <ContextMenu pos={contextMenu} accent={accent} colors={{bg,surface,txt,muted,subtle,border}}
          onClose={()=>setContextMenu(null)}
          onHire={()=>{ document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}); }}
          onCopyEmail={()=>{ navigator.clipboard.writeText("devdesignjustin@gmail.com"); showToast("email copied 📋"); }}
          onKonami={()=>setKonamiActive(true)}
          onTheme={cycleAccent}/>
      )}

      {/* Ambient orb */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="orb-1 absolute rounded-full" style={{
          width:1000,height:1000,top:"-30%",left:"-20%",filter:"blur(160px)",
          background:`radial-gradient(circle, ${accent}${isDark?"0d":"18"} 0%, transparent 65%)`,
        }}/>
      </div>

      {/* Scroll progress */}
      <div ref={progressRef} className="fixed top-0 inset-x-0 z-[100] h-[1px] origin-left scale-x-0"
        style={{background:accent}}/>

      {/* Theme overlay (circle-reveal) */}
      <div ref={themeOverlayRef} className="fixed inset-0 z-[9994] pointer-events-none hidden"/>

      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50"
        style={{borderBottom:`1px solid ${border}`,background:`${bg}f2`,backdropFilter:"blur(16px)"}}>
        <div className="max-w-[1400px] mx-auto px-10 h-14 flex items-center justify-between">
          <button
            className="font-mono text-[10px] tracking-[0.25em] uppercase select-none transition-colors"
            style={{color:muted}}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=txt;}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color=muted;}}>
            JK
          </button>
          <nav className="hidden md:flex items-center gap-8">
            {NAV.map(s=>(
              <a key={s} href={`#${s}`}
                className="relative font-mono text-[10px] tracking-[0.2em] uppercase transition-colors flex items-center gap-1.5"
                style={{color:activeSection===s?txt:muted}}>
                {activeSection===s && <span className="w-1 h-1 rounded-full shrink-0" style={{background:accent}}/>}
                {s}
              </a>
            ))}
            {/* Dark/light toggle — circle button */}
            <button ref={toggleBtnRef} onClick={toggleTheme}
              className="relative flex items-center justify-center transition-all"
              style={{
                width:36, height:36, borderRadius:"50%",
                background:"transparent",
                border:`1.5px solid ${border}`,
                flexShrink:0,
                overflow:"hidden",
              }}
              title={isDark?"Switch to light mode":"Switch to dark mode"}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=accent;(e.currentTarget as HTMLElement).style.background=isDark?"#1a1a1a":"#ede8df";}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=border;(e.currentTarget as HTMLElement).style.background="transparent";}}>
              {/* Sun — visible in dark mode */}
              <svg
                style={{
                  position:"absolute", transition:"opacity 0.25s, transform 0.35s",
                  opacity: isDark ? 1 : 0,
                  transform: isDark ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(90deg)",
                }}
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              {/* Moon — visible in light mode */}
              <svg
                style={{
                  position:"absolute", transition:"opacity 0.25s, transform 0.35s",
                  opacity: isDark ? 0 : 1,
                  transform: isDark ? "scale(0.5) rotate(-90deg)" : "scale(1) rotate(0deg)",
                }}
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke={muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col z-10 pt-14 overflow-hidden"
        onMouseMove={onHeroMove} onMouseLeave={onHeroLeave}>

        {/* Moving spotlight */}
        <div ref={spotRef} className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full z-0"
          style={{width:800,height:800,filter:"blur(100px)",
            background:`radial-gradient(circle, ${accent}0c 0%, transparent 60%)`}}/>

        {/* ── Main grid: name left · meta cells right ── */}
        <div ref={heroGridRef} className="relative z-10 flex-1 flex flex-col md:flex-row"
          style={{borderBottom:`1px solid ${border}`,transformStyle:"preserve-3d"}}>

          {/* LEFT — name block */}
          <div ref={nameRef} className="flex-1 flex flex-col justify-between px-10 py-12"
            style={{borderRight:`1px solid ${border}`}}>

            {/* Index label top-left */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{color:subtle}}>
                №001 · Portfolio
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{color:subtle}}>
                2024
              </span>
            </div>

            {/* Name */}
            <div className="py-8">
              <div style={{overflow:"hidden",lineHeight:0.86}}>
                <h1 className="hero-line font-black tracking-[-0.04em] select-none"
                  style={{fontSize:"clamp(5rem,14vw,12rem)",color:txt,display:"block"}}>
                  JUSTIN
                </h1>
              </div>
              <div style={{overflow:"hidden",lineHeight:0.86}}>
                <h1 className="hero-line kim-name font-black tracking-[-0.04em] select-none inline-block"
                  style={{fontSize:"clamp(5rem,14vw,12rem)",color:accent}}
                  onDoubleClick={onKimDblClick}
                  title="hover · double-click">
                  {"KIM.".split("").map((c,i)=>(
                    <span key={i} className="kim-letter inline-block">{c}</span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Bottom of name cell */}
            <p className="font-mono text-[9px] select-none pointer-events-none"
              style={{color:isDark?"#1c1c1c":"#c8c0b4",letterSpacing:"0.3em"}}>
              ↑↑↓↓←→←→ba · right-click · type hireme
            </p>
          </div>

          {/* RIGHT — three stacked meta cells */}
          <div ref={metaRef} className="hidden md:flex flex-col w-80 shrink-0">

            {/* Cell 1 — Role */}
            <div className="hero-cell flex-1 flex flex-col justify-between p-8"
              style={{borderBottom:`1px solid ${border}`}}>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{color:muted}}>
                Role
              </span>
              <div>
                <p className="font-black text-xl leading-tight mb-1" style={{color:txt}}>
                  Full-Stack<br/>Developer
                </p>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-3" style={{color:muted}}>
                  Web · Design · Systems
                </p>
              </div>
            </div>

            {/* Cell 2 — Location */}
            <div className="hero-cell flex-1 flex flex-col justify-between p-8"
              style={{borderBottom:`1px solid ${border}`}}>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{color:muted}}>
                Location
              </span>
              <div>
                <p className="font-black text-xl leading-tight" style={{color:txt}}>
                  New Jersey
                </p>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-2" style={{color:muted}}>
                  New Jersey · EST
                </p>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase mt-1" style={{color:subtle}}>
                  Since 2019
                </p>
              </div>
            </div>

            {/* Cell 3 — Status with rotating badge */}
            <div className="hero-cell flex-1 flex flex-col justify-between p-8">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{color:muted}}>
                Status
              </span>
              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{background:accent}}/>
                    <p className="font-black text-xl" style={{color:txt}}>Available</p>
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{color:muted}}>
                    Open to new work
                  </p>
                </div>

                {/* Rotating circular badge */}
                <div className="relative w-16 h-16 shrink-0">
                  <svg viewBox="0 0 64 64" className="absolute inset-0 w-full h-full"
                    style={{animation:"spin-slow 14s linear infinite"}}>
                    <path id="rp" d="M32,32 m-22,0 a22,22 0 1,1 44,0 a22,22 0 1,1 -44,0" fill="none"/>
                    <text fontSize="6.2" letterSpacing="2.4" fontFamily="monospace">
                      <textPath href="#rp" style={{fill:muted}}>
                        AVAILABLE · FOR WORK · HIRE ME ·
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full" style={{background:accent}}/>
                  </div>
                  <style>{`@keyframes spin-slow{to{transform:rotate(360deg)}}`}</style>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom CTA bar ── */}
        <div className="hero-bottom relative z-10 px-10 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="text-[15px] leading-relaxed max-w-sm" style={{color:muted}}>
            Building precise, performant web experiences —<br className="hidden md:block"/>
            from pixel-perfect UI to robust backend systems.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <MagneticButton href="#work" dataCursor="EXPLORE →"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-full hover:opacity-80 transition-opacity"
              style={{background:accent,color:bg}}>
              View Work →
            </MagneticButton>
            <MagneticButton href="#contact" dataCursor="HELLO ↗"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full border hover:opacity-60 transition-opacity"
              style={{borderColor:border,color:muted}}>
              Contact ↗
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* ── Ticker ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 py-4 overflow-hidden"
        style={{borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`,background:surface}}>
        <div className="flex whitespace-nowrap" style={{animation:"marquee-left 32s linear infinite"}}>
          {[...TICKER,...TICKER].map((item,i)=>(
            <span key={i} className="font-mono text-[10px] tracking-[0.22em] uppercase mx-8 shrink-0"
              style={{color:i%7===0?accent:muted}}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── About ───────────────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-10 py-32">
          <SectionHeader num="01" label="About" accent={accent} border={border} muted={muted}/>

          {/* Stats */}
          <div className="reveal grid grid-cols-3 mb-24 pb-24" style={{borderBottom:`1px solid ${border}`}}>
            {[
              {end:5, suffix:"+", label:"Years experience", note:"since 2019"},
              {end:50,suffix:"k+",label:"Users served",     note:"across all projects"},
              {end:12,suffix:"",  label:"Projects shipped", note:"and counting"},
            ].map(({end,suffix,label,note},i)=>(
              <div key={label} className="px-10 first:pl-0 last:pr-0" style={{borderLeft:i>0?`1px solid ${border}`:"none"}}>
                <p className="font-black leading-none mb-3" title={note}
                  style={{fontSize:"clamp(2.8rem,6vw,5rem)",color:accent}}>
                  <Counter end={end} suffix={suffix}/>
                </p>
                <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{color:muted}}>{label}</p>
              </div>
            ))}
          </div>

          {/* Bio + meta */}
          <div className="reveal grid md:grid-cols-[1.2fr_1fr] gap-24">
            <div className="space-y-5">
              <p className="text-lg leading-relaxed" style={{color:muted}}>
                I&apos;m Justin, a full-stack and AI developer with 5+ years building fast,
                accessible, and well-crafted web applications. I care about clean code,
                thoughtful design, and shipping things people actually love.
              </p>
              <p className="leading-relaxed" style={{color:muted}}>
                Currently open to new opportunities. When I&apos;m not coding I&apos;m probably
                deep in a design rabbit hole, obsessing over performance metrics, or
                down a late-night YouTube rabbit hole about{" "}
                <span style={{color:accent,textDecoration:"underline",textDecorationStyle:"dotted"}}>
                  something completely unrelated
                </span>.
              </p>
            </div>
            <div>
              {[["Focus","Full-Stack & AI"],["Location","New Jersey, USA"],
                ["Experience","5+ years"],["Education","B.S. Computer Science"],["Status","Available"]].map(([l,v])=>(
                <div key={l} className="flex items-center justify-between py-4" style={{borderBottom:`1px solid ${border}`}}>
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{color:muted}}>{l}</span>
                  <span className="text-sm" style={{color:txt}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────────────────────────── */}
      <section id="work" className="relative z-10" style={{background:surface}}>
        <div className="max-w-[1400px] mx-auto px-10 py-32">
          <SectionHeader num="02" label="Selected Work" accent={accent} border={border} muted={muted}/>

          {projects.slice(0,showAllProjects?projects.length:PROJ_INITIAL).map((p,i)=>{
            const hovered=hoveredProject===i;
            return (
              <div key={p.num} className="proj-row relative"
                style={{borderTop:`1px solid ${border}`}}
                onMouseEnter={()=>setHoveredProject(i)}
                onMouseLeave={()=>setHoveredProject(null)}>

                {/* Ghost number watermark */}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 font-black pointer-events-none select-none transition-all duration-500"
                  style={{
                    fontSize:"clamp(7rem,16vw,14rem)",
                    lineHeight:1,
                    letterSpacing:"-0.05em",
                    color:hovered?`${accent}10`:`${txt}04`,
                    transform:"translateY(-50%)",
                  }}>
                  {p.num}
                </span>

                <div className="relative py-8">
                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col gap-1 shrink-0 w-28">
                      <span className="font-mono text-[9px] tracking-[0.2em] uppercase transition-colors duration-300"
                        style={{color:hovered?accent:muted}}>{p.cat}</span>
                      <span className="font-mono text-[9px]" style={{color:subtle}}>{p.year}</span>
                    </div>
                    <h3 className="font-black tracking-tight flex-1 transition-all duration-400"
                      style={{
                        fontSize:"clamp(1.8rem,4.5vw,4rem)",
                        color:hovered?txt:`${txt}60`,
                        letterSpacing:"-0.02em",
                      }}>
                      {p.title}
                    </h3>
                    <span className="shrink-0 text-xl transition-all duration-300"
                      style={{color:hovered?accent:muted,transform:hovered?"translate(5px,-5px)":"none"}}>↗</span>
                  </div>

                  {/* Expand */}
                  <div className="overflow-hidden transition-all duration-500"
                    style={{maxHeight:hovered?200:0,opacity:hovered?1:0}}>
                    <div className="pt-6 pb-8 md:pl-[calc(7rem+1.5rem)] flex flex-col md:flex-row gap-8">
                      <div className="flex-1 space-y-5">
                        <p className="text-sm leading-relaxed" style={{color:muted}}>{p.desc}</p>
                        <a href={p.link} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-bold rounded-full px-4 py-2 hover:opacity-80 transition-opacity"
                          style={{background:accent,color:bg}} data-cursor="VIEW →">
                          View Website ↗
                        </a>
                      </div>
                      <div className="flex flex-wrap gap-2 content-start md:max-w-[200px]">
                        {p.stack.map(t=>(
                          <span key={t} className="font-mono text-[10px] px-2.5 py-1 rounded-full"
                            style={{border:`1px solid ${border}`,color:muted}}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{borderTop:`1px solid ${border}`}}/>
          {projects.length>PROJ_INITIAL && (
            <button onClick={()=>setShowAllProjects(v=>!v)}
              className="mt-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.22em] uppercase transition-colors"
              style={{color:muted}}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=txt;}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color=muted;}}>
              <span className="inline-block transition-transform duration-300"
                style={{transform:showAllProjects?"rotate(45deg)":"none"}}>+</span>
              {showAllProjects?"Show less":`${projects.length-PROJ_INITIAL} more project${projects.length-PROJ_INITIAL>1?"s":""}`}
            </button>
          )}
        </div>
      </section>

      {/* ── Mini Projects ───────────────────────────────────────────────────── */}
      <section id="mini" className="relative z-10" style={{background:bg}}>
        <div className="max-w-[1400px] mx-auto px-10 py-32">
          <SectionHeader num="03" label="Mini Projects" accent={accent} border={border} muted={muted}/>

          {/* Bento grid: featured (2/3) + side (1/3) on row 1, three equal on row 2 */}
          <div className="reveal grid grid-cols-3 grid-rows-2 gap-0" style={{border:`1px solid ${border}`}}>
            {miniProjects.map((p, i) => {
              const featured = i === 0;
              return (
                <a key={p.title} href={p.link} target="_blank" rel="noopener noreferrer"
                  className="mini-card relative flex flex-col justify-between overflow-hidden"
                  style={{
                    padding:"2rem",
                    gridColumn: featured ? "span 2" : undefined,
                    borderRight: (i === 0 || i === 3 || i === 4) ? `1px solid ${border}` : undefined,
                    borderBottom: i < 3 ? `1px solid ${border}` : undefined,
                    minHeight: featured ? 340 : 220,
                  }}
                  onMouseEnter={e=>{
                    const el=e.currentTarget as HTMLElement;
                    el.style.background=`${accent}08`;
                    const bar=el.querySelector(".mini-bar") as HTMLElement|null;
                    if(bar) bar.style.transform="scaleX(1)";
                    const num=el.querySelector(".mini-num") as HTMLElement|null;
                    if(num) num.style.color=`${accent}22`;
                  }}
                  onMouseLeave={e=>{
                    const el=e.currentTarget as HTMLElement;
                    el.style.background="transparent";
                    const bar=el.querySelector(".mini-bar") as HTMLElement|null;
                    if(bar) bar.style.transform="scaleX(0)";
                    const num=el.querySelector(".mini-num") as HTMLElement|null;
                    if(num) num.style.color=`${txt}06`;
                  }}>

                  {/* Ghost index number */}
                  <span className="mini-num absolute bottom-0 right-4 font-black select-none pointer-events-none leading-none transition-colors duration-500"
                    style={{
                      fontSize: featured ? "clamp(6rem,14vw,11rem)" : "clamp(4rem,8vw,7rem)",
                      color:`${txt}06`,
                      lineHeight:0.85,
                    }}>
                    {String(i+1).padStart(2,"0")}
                  </span>

                  {/* Top row */}
                  <div className="flex items-start justify-between gap-4 relative z-10">
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase"
                      style={{color:accent}}>{p.tag}</span>
                    <span className="font-mono text-[9px] shrink-0" style={{color:muted}}>{p.year}</span>
                  </div>

                  {/* Content */}
                  <div className="relative z-10 mt-auto">
                    <h3 className={`font-black leading-tight mb-3 ${featured?"text-3xl":"text-xl"}`}
                      style={{color:txt, letterSpacing:"-0.02em"}}>
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{color:muted,maxWidth:featured?"520px":"none"}}>
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.map(t=>(
                        <span key={t} className="font-mono text-[9px] px-2 py-0.5"
                          style={{border:`1px solid ${border}`,color:subtle}}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Accent bar — slides in on hover */}
                  <span className="mini-bar absolute bottom-0 left-0 h-[2px] w-full origin-left"
                    style={{background:accent, transform:"scaleX(0)", transition:"transform 0.4s cubic-bezier(.16,1,.3,1)"}}/>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Skills ──────────────────────────────────────────────────────────── */}
      <section id="skills" className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-10 py-32">
          <SectionHeader num="04" label="Stack" accent={accent} border={border} muted={muted}/>
          <div className="reveal flex flex-wrap gap-3">
            {skills.map(s=>(
              <span key={s}
                className="font-mono text-sm px-4 py-2 rounded-full border transition-all duration-200 cursor-default"
                style={{borderColor:border,color:muted}}
                onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background=`${accent}15`;el.style.borderColor=accent;el.style.color=txt;}}
                onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="transparent";el.style.borderColor=border;el.style.color=muted;}}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GitHub ─────────────────────────────────────────────────────────── */}
      <section id="github" className="relative z-10" style={{background:surface}}>
        <div className="max-w-[1400px] mx-auto px-10 py-32">
          <SectionHeader num="05" label="GitHub" accent={accent} border={border} muted={muted}/>
          <GitHubStats accent={accent} colors={{bg,surface,txt,muted,subtle,border}}/>
        </div>
      </section>

      {/* ── Experience ──────────────────────────────────────────────────────── */}
      <section id="experience" className="relative z-10">
        <div className="max-w-[1400px] mx-auto px-10 py-32">
          <SectionHeader num="06" label="Experience" accent={accent} border={border} muted={muted}/>

          {experience.map((exp,i)=>(
            <div key={exp.company} className="exp-row" style={{borderTop:`1px solid ${border}`}}>
              <button className="w-full text-left" onClick={()=>setActiveExp(activeExp===i?null:i)}>
                <div className="flex items-start md:items-center justify-between py-9 gap-8">
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-2.5 transition-colors duration-300"
                      style={{color:activeExp===i?accent:muted}}>
                      {exp.period}
                    </p>
                    <h3 className="font-black tracking-tight transition-colors duration-300"
                      style={{fontSize:"clamp(1.4rem,3.5vw,2.8rem)",color:activeExp===i?txt:`${txt}60`,letterSpacing:"-0.02em"}}>
                      {exp.role}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <span className="font-black text-xl hidden md:block transition-colors duration-300"
                      style={{color:activeExp===i?txt:muted}}>{exp.company}</span>
                    <span className="font-mono text-2xl font-light transition-transform duration-400"
                      style={{color:accent,transform:activeExp===i?"rotate(45deg)":"none"}}>+</span>
                  </div>
                </div>
              </button>
              <div className="overflow-hidden transition-all duration-500"
                style={{maxHeight:activeExp===i?140:0,opacity:activeExp===i?1:0}}>
                <div className="pb-8 md:pl-8">
                  <p className="text-sm leading-relaxed max-w-2xl" style={{color:muted}}>{exp.desc}</p>
                </div>
              </div>
            </div>
          ))}
          <div style={{borderTop:`1px solid ${border}`}}/>
        </div>
      </section>

      {/* ── Terminal widget ───────────────────────────────────────────────── */}
      <TerminalWidget accent={accent} colors={{bg,surface,txt,muted,subtle,border}}/>

      {/* ── Contact ─────────────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 min-h-screen flex flex-col justify-center">
        <div className="max-w-[1400px] mx-auto px-10 py-24 w-full">
          <SectionHeader num="07" label="Contact" accent={accent} border={border} muted={muted}/>


          <div className="mb-20">
            <div style={{overflow:"hidden"}}>
              <span className="contact-word block font-black tracking-tight leading-[0.86]"
                style={{fontSize:"clamp(4rem,13vw,11rem)",color:txt}}>
                LET&apos;S
              </span>
            </div>
            <div style={{overflow:"hidden"}}>
              <span className="contact-word block font-black tracking-tight leading-[0.86]"
                style={{fontSize:"clamp(4rem,13vw,11rem)",color:accent}}>
                WORK.
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pt-12"
            style={{borderTop:`1px solid ${border}`}}>
            <p className="max-w-sm leading-relaxed" style={{color:muted}}>
              Open to new opportunities. Whether you have a project in mind or just
              want to say hello — my inbox is always open.
            </p>
            <div className="flex flex-col items-start md:items-end gap-5">
              <MagneticButton href="mailto:devdesignjustin@gmail.com"
                dataCursor={copied?"COPIED ✓":"COPY ↗"} onClick={copyEmail}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-full hover:opacity-80 transition-opacity"
                style={{background:accent,color:bg}}>
                {copied?"Copied! ✓":"devdesignjustin@gmail.com ↗"}
              </MagneticButton>
              <div className="flex items-center gap-6">
                {[["GitHub","#"],["LinkedIn","#"],["Twitter","#"]].map(([n,h])=>(
                  <a key={n} href={h} data-cursor="OPEN ↗"
                    className="font-mono text-[10px] tracking-[0.2em] uppercase transition-colors"
                    style={{color:muted}}
                    onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.color=accent;}}
                    onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.color=muted;}}>
                    {n}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer style={{borderTop:`1px solid ${border}`}}>
        <div className="max-w-[1400px] mx-auto px-10 py-8 flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{color:muted}}>
            © 2026 Justin Kim
          </span>
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{color:muted}}>
            Built with Next.js
          </span>
        </div>
      </footer>
    </div>
  );
}
