"use client";

import React from "react";
import { portfolioData, Certification } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Award, CheckCircle, ShieldCheck, ExternalLink } from "lucide-react";

export const CertificationsSection: React.FC = () => {
  return (
    <section
      id="certifications"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        number="06"
        badge="FLIGHT RATINGS"
        title="Certifications & Accreditations"
        subtitle="Rigorous academic accreditations and professional certifications from premier institutes."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolioData.certifications.map((cert: Certification, idx: number) => {
          return (
            <div
              key={cert.title}
              className="glass-card rounded-2xl p-6 border-sky-500/20 group hover:border-cyan-400/50 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Badge Top Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-sky-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-[0_0_16px_rgba(0,240,255,0.2)]">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <span className="font-mono text-xs text-sky-400/60 uppercase">
                    CERT-0{idx + 1}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors mb-2">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-sm font-semibold text-cyan-300 light:text-sky-700 mb-4">
                  {cert.issuer}
                </p>
              </div>

              {/* Status Badge */}
              <div className="pt-4 border-t border-sky-500/15 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                  <CheckCircle className="h-3.5 w-3.5" />
                  <span>{cert.badge}</span>
                </span>

                <span className="text-xs font-mono text-slate-400">
                  Verified
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
