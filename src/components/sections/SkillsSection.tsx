"use client";

import React, { useState } from "react";
import { portfolioData, SkillCategory } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Code2,
  Cpu,
  Server,
  Brain,
  Database,
  Terminal,
  Layers,
  Sparkles,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  Server: <Server className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
  Database: <Database className="h-5 w-5" />,
  Terminal: <Terminal className="h-5 w-5" />,
};

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        number="03"
        badge="AVIONICS & TOOLING"
        title="Technical Skills & Competencies"
        subtitle="Grouped architecture toolsets covering low-level algorithmic mastery to distributed AI systems."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.skills.map((cat: SkillCategory, idx: number) => {
          const isSelected = activeCategory === cat.category;

          return (
            <div
              key={cat.category}
              onMouseEnter={() => setActiveCategory(cat.category)}
              onMouseLeave={() => setActiveCategory(null)}
              className={`glass-card rounded-2xl p-6 border transition-all duration-300 relative group overflow-hidden ${
                isSelected
                  ? "border-cyan-400 shadow-[0_0_30px_rgba(0,240,255,0.2)] -translate-y-1"
                  : "border-sky-500/20 hover:border-sky-400/40"
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-400/25 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    {ICON_MAP[cat.iconName] || <Layers className="h-5 w-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors">
                      {cat.category}
                    </h3>
                    <span className="font-mono text-[10px] text-sky-400/60 uppercase tracking-wider">
                      {cat.skills.length} Competencies
                    </span>
                  </div>
                </div>

                <span className="font-mono text-xs text-sky-500/40">
                  0{idx + 1}
                </span>
              </div>

              {/* Skill Chips */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 light:text-slate-700 bg-slate-900/60 light:bg-slate-100 border border-sky-500/15 hover:border-cyan-400/50 hover:bg-sky-500/15 hover:text-cyan-300 transition-all cursor-default"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>

              {/* Bottom decorative radar tick */}
              <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-sky-500/20 to-transparent group-hover:via-cyan-400/50 transition-all" />
            </div>
          );
        })}
      </div>
    </section>
  );
};
