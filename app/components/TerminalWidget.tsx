"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { TERM_COMMANDS, THEMES } from "@/app/data";

interface Props {
  accent: string;
  colors: typeof THEMES.dark;
}

export default function TerminalWidget({ accent, colors }: Props) {
  const { bg, surface, txt, muted, border } = colors;
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{ type: "in" | "out"; text: string }[]>([
    { type: "out", text: "Justin Kim — Portfolio Terminal v1.0" },
    { type: "out", text: "Type 'help' for available commands." },
    { type: "out", text: "" },
  ]);
  const [input, setInput] = useState("");
  const [cmdHist, setCmdHist] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(panelRef.current, {
      y: open ? 0 : 20, opacity: open ? 1 : 0,
      pointerEvents: open ? "all" : "none",
      duration: 0.4, ease: open ? "power3.out" : "power2.in",
    });
    if (open) setTimeout(() => inputRef.current?.focus(), 420);
  }, [open]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const runCmd = (raw: string) => {
    const cmd = raw.trim(); if (!cmd) return;
    setCmdHist(h => [cmd, ...h]); setHistIdx(-1);
    const lower = cmd.toLowerCase();
    if (lower === "clear") { setHistory([]); setInput(""); return; }
    const handler = TERM_COMMANDS[lower];
    const lines = handler ? handler([]) : [`command not found: ${cmd.split(" ")[0]}`, "run 'help' to see available commands"];
    setHistory(h => [...h, { type: "in", text: `$ ${cmd}` }, ...lines.map(l => ({ type: "out" as const, text: l })), { type: "out", text: "" }]);
    setInput("");
    if (lower === "hire") setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 800);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key === "Enter") { runCmd(input); return; }
    if (e.key === "ArrowUp") { e.preventDefault(); const i = Math.min(histIdx + 1, cmdHist.length - 1); setHistIdx(i); setInput(cmdHist[i] ?? ""); }
    if (e.key === "ArrowDown") { e.preventDefault(); const i = Math.max(histIdx - 1, -1); setHistIdx(i); setInput(i === -1 ? "" : cmdHist[i] ?? ""); }
  };

  return (
    <div className="fixed bottom-6 right-6 z-300 flex flex-col items-end gap-3" style={{ pointerEvents: "none" }}>
      {/* Panel */}
      <div ref={panelRef} className="rounded-2xl overflow-hidden border opacity-0"
        style={{ width: 380, background: bg, borderColor: border, pointerEvents: "none", maxWidth: "calc(100vw - 48px)" }}
        onClick={() => inputRef.current?.focus()}>
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: border, background: surface }}>
          <span className="w-2.5 h-2.5 rounded-full cursor-pointer" style={{ background: "#ff5f57" }}
            onClick={e => { e.stopPropagation(); setOpen(false); }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
          <span className="flex-1 text-center font-mono text-[10px]" style={{ color: muted }}>justin@portfolio — bash</span>
        </div>
        {/* Output */}
        <div className="overflow-y-auto p-4" style={{ height: 260, scrollbarWidth: "none" }}>
          {history.map((l, i) => (
            <p key={i} className="font-mono text-[13px] leading-relaxed whitespace-pre"
              style={{ color: l.type === "in" ? accent : l.text.includes("not found") ? "#f87171" : muted }}>
              {l.text || " "}
            </p>
          ))}
          <div ref={endRef} />
        </div>
        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-t" style={{ borderColor: border }}>
          <span className="font-mono text-sm" style={{ color: accent }}>$</span>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
            className="flex-1 bg-transparent font-mono text-[13px] outline-none"
            placeholder="type a command…"
            style={{ color: txt, caretColor: accent }} autoComplete="off" spellCheck={false} />
        </div>
      </div>

      {/* Toggle */}
      <button onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-full border font-mono text-[11px] tracking-widest uppercase transition-all"
        style={{ background: open ? accent : surface, borderColor: open ? accent : border, color: open ? bg : muted, pointerEvents: "auto" }}
        onMouseEnter={e => { if (!open) { const el = e.currentTarget as HTMLElement; el.style.borderColor = accent; el.style.color = accent; } }}
        onMouseLeave={e => { if (!open) { const el = e.currentTarget as HTMLElement; el.style.borderColor = border; el.style.color = muted; } }}>
        <span className="font-mono text-base leading-none" style={{ letterSpacing: 0 }}>{open ? "×" : ">_"}</span>
        {open ? "close" : "terminal"}
      </button>
    </div>
  );
}
