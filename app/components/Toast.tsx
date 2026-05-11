interface Props {
  message: string;
  visible: boolean;
  accent: string;
}

export default function Toast({ message, visible, accent }: Props) {
  return (
    <div className="fixed bottom-8 left-1/2 z-9999 pointer-events-none"
      style={{
        transform: "translateX(-50%)",
        transition: "all 0.5s cubic-bezier(.16,1,.3,1)",
        opacity: visible ? 1 : 0,
        translate: visible ? "0 0" : "0 14px",
      }}>
      <div className="px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap"
        style={{ background: accent, color: "#070707" }}>
        {message}
      </div>
    </div>
  );
}
