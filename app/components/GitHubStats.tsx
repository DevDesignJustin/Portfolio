"use client";
import { useEffect, useState } from "react";
import { GITHUB_USERNAME, THEMES } from "@/app/data";

interface Props {
  accent: string;
  colors: typeof THEMES.dark;
}

export default function GitHubStats({ accent, colors }: Props) {
  const { txt, muted, subtle, border } = colors;
  const [repoCount, setRepoCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
      .then(r => r.json())
      .then(d => { if (d.public_repos !== undefined) setRepoCount(d.public_repos); })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-16">
      {/* Repo count */}
      <div className="reveal pb-16" style={{ borderBottom: `1px solid ${border}` }}>
        <p className="font-black leading-none mb-3" style={{ fontSize: "clamp(2.8rem,6vw,5rem)", color: accent }}>
          {repoCount ?? 0}
        </p>
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase" style={{ color: muted }}>Public repos</p>
      </div>

      {/* Contribution chart */}
      <div className="reveal">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase mb-6" style={{ color: muted }}>Contribution activity</p>
        <img
          src={`https://ghchart.rshah.org/${accent.replace("#", "")}/${GITHUB_USERNAME}`}
          alt="GitHub contributions"
          className="w-full rounded-lg opacity-70"
        />
      </div>

    </div>
  );
}
