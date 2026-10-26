"use client";

import React, { useState, useRef } from "react";
import { portfolioData, Project } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectModal } from "@/components/ui/ProjectModal";
import {
  ExternalLink,
  Maximize2,
  Calendar,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface TiltCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index: number;
}

const ProjectCard: React.FC<TiltCardProps> = ({
  project,
  onOpenModal,
  index,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 7;
    const rotY = ((x - centerX) / centerX) * 7;

    setRotateX(rotX);
    setRotateY(rotY);
    setSpotlightPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? 1.015 : 1
        }, ${isHovered ? 1.015 : 1}, 1)`,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="relative rounded-3xl glass-card p-6 sm:p-8 border-sky-500/20 hover:border-cyan-400/50 flex flex-col justify-between overflow-hidden group cursor-pointer"
      onClick={() => onOpenModal(project)}
    >
      {/* Dynamic Cursor Spotlight Radial Follower */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0, 240, 255, 0.12), transparent 40%)`,
        }}
      />

      {/* Top Meta Row */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan-400 font-semibold uppercase tracking-wider">
              PROJECT 0{index + 1}
            </span>
            <span className="text-sky-500/40">/</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium text-sky-300 bg-sky-950/60 border border-sky-400/25">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5 text-cyan-400" />
            <span>{project.date}</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900 group-hover:text-cyan-400 transition-colors mb-2">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base font-medium text-sky-400 light:text-sky-700 mb-4">
          {project.subtitle}
        </p>

        {/* Tagline */}
        <p className="text-sm text-slate-300 light:text-slate-700 leading-relaxed font-light mb-6">
          {project.tagline}
        </p>

        {/* Highlights Row */}
        <div className="space-y-2 mb-6">
          {project.highlights.map((highlight, hIdx) => (
            <div
              key={hIdx}
              className="flex items-center gap-2 text-xs text-slate-300 light:text-slate-700"
            >
              <TrendingUp className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Tech Stack & Actions */}
      <div>
        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-sky-500/15">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono text-slate-200 light:text-slate-700 bg-slate-900/60 light:bg-slate-100 border border-sky-500/15"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Card Action Row */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(project);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>EXPAND MISSION SPEC</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View ${project.title} source on GitHub`}
              className="h-8 w-8 rounded-lg bg-slate-900/80 light:bg-slate-200 border border-sky-500/20 hover:border-cyan-400 flex items-center justify-center text-slate-300 light:text-slate-700 hover:text-white transition-all"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Open ${project.title} live demo`}
              className="h-8 w-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 hover:bg-cyan-400 hover:text-slate-950 flex items-center justify-center text-cyan-300 transition-all"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <SectionHeading
        number="05"
        badge="FLAGSHIP MISSIONS"
        title="Featured Projects"
        subtitle="Full-stack AI architectures, environmental disaster forecasting, and automated NLP analytics."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioData.projects.map((project: Project, idx: number) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onOpenModal={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* Expandable Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
