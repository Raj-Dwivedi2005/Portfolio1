import { cn } from "@/lib/utils";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:opacity-90 dark:bg-[var(--accent)] dark:text-[var(--accent-foreground)] dark:hover:opacity-90",
  secondary:
    "bg-[var(--surface-2)] text-foreground hover:bg-[var(--border-subtle)]",
  outline:
    "border border-[var(--border-subtle)] text-foreground hover:border-[var(--accent)] hover:text-[var(--accent)]",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 ease-out";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button className={cn(base, variantClasses[variant], className)} {...props} />
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  href: string;
}

export function LinkButton({
  variant = "primary",
  className,
  href,
  ...props
}: LinkButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto:");
  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(base, variantClasses[variant], className)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        {...props}
      />
    );
  }
  return (
    <Link href={href} className={cn(base, variantClasses[variant], className)} {...props} />
  );
}
