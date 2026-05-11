"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  end: number;
  suffix?: string;
}

export default function Counter({ end, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: end, duration: 2.2, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
      onUpdate() { el.textContent = Math.floor(obj.val) + suffix; },
    });
  }, [end, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}
