import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { ArrowLeft } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Case Study`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to projects
      </Link>

      <h1 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {project.name}
      </h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{project.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        {project.github && (
          <LinkButton href={project.github} variant="outline">
            <GithubIcon className="h-4 w-4" />
            View on GitHub
          </LinkButton>
        )}
        {project.liveDemo && (
          <LinkButton href={project.liveDemo} variant="secondary">
            Live Demo
          </LinkButton>
        )}
      </div>

      {!project.hasScreenshots && (
        <div className="mt-10 rounded-xl border border-dashed border-[var(--border-subtle)] p-8 text-center text-sm text-[var(--muted)]">
          Screenshots / architecture diagram — placeholder
        </div>
      )}

      <div className="mt-14 space-y-12">
        {project.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="mb-4 font-display text-xl font-semibold">
              {section.heading}
            </h2>
            <div className="space-y-3">
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-[var(--muted)]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
