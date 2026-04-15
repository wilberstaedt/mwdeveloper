import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "outline" | "blue";

interface BadgeProps {
  variant?: Variant;
  className?: string;
  pulse?: boolean;
}

const variantStyles: Record<Variant, string> = {
  default: "bg-white/5 text-[color:var(--color-text)] border-white/10",
  success:
    "bg-[color:var(--color-success)]/10 text-[color:var(--color-success)] border-[color:var(--color-success)]/30",
  outline: "bg-transparent border-white/15 text-[color:var(--color-text)]",
  blue: "bg-[color:var(--color-blue)]/10 text-[color:var(--color-cyan)] border-[color:var(--color-blue)]/30",
};

export function Badge({
  children,
  variant = "default",
  pulse = false,
  className,
}: PropsWithChildren<BadgeProps>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 mono text-[10px] uppercase tracking-[0.18em]",
        variantStyles[variant],
        className,
      )}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-success)] opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-success)]" />
        </span>
      )}
      {children}
    </span>
  );
}
