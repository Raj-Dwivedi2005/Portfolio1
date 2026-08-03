import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeInWhenVisible } from "@/components/ui/fade-in-when-visible";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredProjects } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import Link from "next/link";

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInWhenVisible>
          <SectionHeading
            eyebrow="Featured Projects"
            title="Things I've built"
            description="Fullstack systems, applied ML, and one exploration into AI-agent tooling — ordered by how much of the stack each one touches."
          />
        </FadeInWhenVisible>

        <div className="space-y-6">
          {featuredProjects.map((project, i) => (
            <FadeInWhenVisible key={project.slug} delay={i * 0.08}>
              <Card
                className={i === 0 ? "border-[var(--accent)]/40 p-8" : ""}
              >
                <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">
                      {project.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                      {project.tagline}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-row gap-3 md:flex-col md:items-end">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                      >
                        <GithubIcon className="h-4 w-4" />
                        GitHub
                      </a>
                    )}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)] transition-opacity hover:opacity-80"
                    >
                      View Case Study
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </Card>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
