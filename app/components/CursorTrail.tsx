interface TrailPoint {
  id: number;
  x: number;
  y: number;
  age: number;
}

interface Props {
  items: TrailPoint[];
  accent: string;
}

export default function CursorTrail({ items, accent }: Props) {
  return (
    <>
      {items.map((p, i) => (
        <div key={p.id}
          className="pointer-events-none fixed z-9990 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ left: p.x, top: p.y, width: 3, height: 3, background: accent, opacity: (i / items.length) * 0.35 }}
        />
      ))}
    </>
  );
}
