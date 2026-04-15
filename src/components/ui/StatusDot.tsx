import type { ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const colorByStatus: Record<ProjectStatus, string> = {
  live: "bg-[color:var(--color-success)] shadow-[0_0_12px_var(--color-success-glow)]",
  "in-development":
    "bg-[color:var(--color-cyan)] shadow-[0_0_12px_var(--color-cyan-glow)]",
  personal: "bg-[color:var(--color-text-dim)]",
  planning: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.3)]",
};

export function StatusDot({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block h-2 w-2 rounded-full",
        colorByStatus[status],
        className,
      )}
      aria-hidden
    />
  );
}
