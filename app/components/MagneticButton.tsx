"use client";
import gsap from "gsap";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  dataCursor?: string;
}

export default function MagneticButton({ href, className, style, children, onClick, dataCursor }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1,0.45)" });

  return (
    <Link ref={ref} href={href} className={className} style={style}
      onMouseMove={move} onMouseLeave={leave} onClick={onClick} data-cursor={dataCursor}>
      {children}
    </Link>
  );
}
