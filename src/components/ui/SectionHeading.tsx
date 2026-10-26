"use client";

import React from "react";

interface SectionHeadingProps {
  number: string;
  badge: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  badge,
  title,
  subtitle,
  align = "left",
}) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center mx-auto" : "text-left"
      } max-w-3xl`}
    >
      {/* Flight HUD Telemetry Badge */}
      <div
        className={`inline-flex items-center gap-2.5 px-3 py-1 mb-3 rounded-full text-xs font-mono tracking-widest text-cyan-400 bg-sky-500/10 border border-sky-400/20 backdrop-blur-sm ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span className="font-semibold">{number}</span>
        <span className="text-sky-500/40">/ /</span>
        <span className="uppercase">{badge}</span>
      </div>

      {/* Main Section Heading */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-100 light:text-slate-900">
        {title}
      </h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-slate-400 light:text-slate-600 leading-relaxed font-light">
          {subtitle}
        </p>
      )}

      {/* Accent Hairline */}
      <div
        className={`mt-4 h-[2px] bg-gradient-to-r from-cyan-400/60 via-sky-500/20 to-transparent ${
          align === "center" ? "w-24 mx-auto" : "w-20"
        }`}
      />
    </div>
  );
};
