import { Card } from "@/components/ui/card";
import { FadeInWhenVisible } from "@/components/ui/fade-in-when-visible";
import { SectionHeading } from "@/components/ui/section-heading";
import { certifications } from "@/data/certifications";
import { BadgeCheck } from "lucide-react";

const groups = ["Core Engineering", "Specialized Tech"] as const;

export function CertificationsSection() {
  return (
    <section id="certifications" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInWhenVisible>
          <SectionHeading eyebrow="Certifications" title="Continued learning" />
        </FadeInWhenVisible>

        <div className="grid gap-6 sm:grid-cols-2">
          {groups.map((group, gi) => (
            <FadeInWhenVisible key={group} delay={gi * 0.08}>
              <div>
                <p className="mb-3 text-sm font-medium text-[var(--muted)]">
                  {group}
                </p>
                <div className="space-y-3">
                  {certifications
                    .filter((c) => c.group === group)
                    .map((cert) => (
                      <Card
                        key={cert.name}
                        className="flex items-center gap-3 p-4"
                      >
                        <BadgeCheck className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                        <div>
                          <p className="text-sm font-medium">{cert.name}</p>
                          <p className="text-xs text-[var(--muted)]">
                            {cert.issuer}
                          </p>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
