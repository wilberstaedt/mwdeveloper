import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { StatusDot } from "@/components/ui/StatusDot";
import { projects, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-eyebrow">Selected Work</span>
              <h2 className="mt-4 max-w-xl text-balance text-3xl font-medium leading-tight tracking-tight text-[color:var(--color-text-bright)] md:text-5xl">
                Produtos que eu construí —{" "}
                <span className="text-[color:var(--color-cyan)]">e mantenho</span>.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--color-text)]">
              Sistemas com clientes reais usando. Cada projeto aqui tem código
              meu do schema do banco ao CSS do botão.
            </p>
          </div>
        </Reveal>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-6">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={i * 0.08}
              className={cn(
                project.featured ? "md:col-span-6 lg:col-span-4" : "md:col-span-3 lg:col-span-2",
              )}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const body = (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border bg-[color:var(--color-card)] p-7 transition-all",
        "hover:-translate-y-1 hover:bg-[color:var(--color-card-hover)] hover:border-[color:var(--color-blue)]/40",
        project.featured && "md:p-10",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <StatusDot status={project.status} />
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
            {project.statusLabel}
          </span>
        </div>
        {project.href && (
          <ArrowUpRight className="h-4 w-4 text-[color:var(--color-text-dim)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--color-cyan)]" />
        )}
      </div>

      <div className="mt-8 flex-1">
        <h3
          className={cn(
            "font-medium leading-tight text-[color:var(--color-text-bright)]",
            project.featured ? "text-3xl md:text-4xl" : "text-2xl",
          )}
        >
          {project.name}
        </h3>
        <p
          className={cn(
            "mt-2 text-[color:var(--color-cyan)]",
            project.featured ? "text-base" : "text-sm",
          )}
        >
          {project.tagline}
        </p>
        <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-text)]">
          {project.description}
        </p>

        {project.featured && (
          <ul className="mt-6 space-y-2">
            {project.highlights.slice(0, 4).map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 text-sm text-[color:var(--color-text)]"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-cyan)]" />
                {h}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-[color:var(--color-border)] pt-5">
        {project.stack.slice(0, project.featured ? 8 : 5).map((tech) => (
          <span
            key={tech}
            className="mono rounded-md border border-[color:var(--color-border)] bg-white/[0.02] px-2 py-1 text-[10px] uppercase tracking-wider text-[color:var(--color-text-dim)]"
          >
            {tech}
          </span>
        ))}
      </div>

      {project.metric && (
        <div className="mt-5 flex items-center gap-3">
          <span className="mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-text-dim)]">
            {project.metric.label}
          </span>
          <span className="h-px flex-1 bg-[color:var(--color-border)]" />
          <span className="mono text-xs font-medium text-[color:var(--color-text-bright)]">
            {project.metric.value}
          </span>
        </div>
      )}
    </article>
  );

  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="block h-full"
        aria-label={`${project.name} — abrir em nova aba`}
      >
        {body}
      </a>
    );
  }

  return body;
}
