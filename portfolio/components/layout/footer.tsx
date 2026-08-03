import { siteConfig } from "@/data/site-config";
import { Code2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-subtle)]">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-[var(--muted)]">
          © {year} {siteConfig.name}
        </p>

        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            className="text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
          >
            <Code2 className="h-4 w-4" />
          </a>
        </div>

        <p className="font-mono text-xs text-[var(--muted)]">
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
