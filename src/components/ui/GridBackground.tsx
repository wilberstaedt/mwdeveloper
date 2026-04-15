import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  fade?: boolean;
}

export function GridBackground({
  className,
  fade = true,
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 grid-pattern",
        fade &&
          "[mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,#000_35%,transparent_85%)]",
        className,
      )}
    />
  );
}

export function GlowOrb({
  className,
  size = 520,
  color = "rgba(0,102,255,0.35)",
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
    />
  );
}
