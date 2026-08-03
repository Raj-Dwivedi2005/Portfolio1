import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeInWhenVisible } from "@/components/ui/fade-in-when-visible";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <FadeInWhenVisible>
          <SectionHeading eyebrow="Skills" title="What I work with" />
        </FadeInWhenVisible>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <FadeInWhenVisible key={group.category} delay={i * 0.06}>
              <Card>
                <p className="mb-4 text-sm font-medium text-foreground">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </Card>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}
