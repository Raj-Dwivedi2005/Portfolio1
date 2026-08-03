import { FadeInWhenVisible } from "@/components/ui/fade-in-when-visible";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInWhenVisible>
          <SectionHeading eyebrow="Experience" title="Where I've worked" />
        </FadeInWhenVisible>

        <div className="relative border-l border-[var(--border-subtle)] pl-8">
          {experience.map((entry, i) => (
            <FadeInWhenVisible key={entry.company} delay={i * 0.1}>
              <div className="relative pb-12 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"
                />
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold">
                    {entry.role} · {entry.company}
                  </h3>
                  <span className="font-mono text-xs text-[var(--muted)]">
                    {entry.dates}
                  </span>
                </div>
                <ul className="space-y-2">
                  {entry.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="text-sm leading-relaxed text-[var(--muted)]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
