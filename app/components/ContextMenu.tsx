"use client";
import { THEMES } from "@/app/data";

interface Props {
  pos: { x: number; y: number };
  accent: string;
  colors: typeof THEMES.dark;
  onClose: () => void;
  onHire: () => void;
  onCopyEmail: () => void;
}

export default function ContextMenu({ pos, accent, colors, onClose, onHire, onCopyEmail }: Props) {
  const { bg, surface, txt, muted, border } = colors;
  const items = [
    { icon: "💼", label: "Hire Justin", action: onHire },
    { icon: "📧", label: "Copy email",  action: onCopyEmail },
  ];

  return (
    <div className="fixed z-9995 min-w-[180px] rounded-2xl border overflow-hidden py-1.5"
      style={{
        left: Math.min(pos.x, window.innerWidth - 200),
        top: Math.min(pos.y, window.innerHeight - 180),
        background: surface, borderColor: border,
        boxShadow: `0 16px 48px ${bg}99`,
      }}>
      <p className="font-mono text-[9px] tracking-widest uppercase px-4 py-2" style={{ color: muted }}>
        justin.kim
      </p>
      {items.map(item => (
        <button key={item.label} onClick={() => { item.action(); onClose(); }}
          className="w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors"
          style={{ color: muted }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = `${accent}18`; el.style.color = txt; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.color = muted; }}>
          <span>{item.icon}</span>{item.label}
        </button>
      ))}
    </div>
  );
}
