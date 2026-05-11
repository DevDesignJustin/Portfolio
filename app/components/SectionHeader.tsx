interface Props {
  num: string;
  label: string;
  accent: string;
  border: string;
  muted: string;
}

export default function SectionHeader({ num, label, accent, border, muted }: Props) {
  return (
    <div className="reveal flex items-center gap-5 mb-20">
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase shrink-0" style={{ color: accent }}>{num}</span>
      <div className="section-line flex-1 h-px" style={{ background: border }} />
      <span className="font-mono text-[10px] tracking-[0.25em] uppercase shrink-0" style={{ color: muted }}>{label}</span>
    </div>
  );
}
