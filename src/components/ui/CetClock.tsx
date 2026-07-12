import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock } from "lucide-react";

/**
 * Live CET clock chip: shows the current time at Matheus's location and the
 * hour gap to the visitor's timezone. A working detail, not decoration — the
 * whole point of the hero badge row is "remote-ready, here's the proof".
 */
function getCetParts(): { time: string; offsetHours: number } {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  }).format(now);

  // Hour gap = CET wall-clock hour minus visitor wall-clock hour (same instant).
  const hourIn = (tz?: string) =>
    parseInt(
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        hourCycle: "h23",
        ...(tz ? { timeZone: tz } : {}),
      }).format(now),
      10,
    );
  let diff = hourIn("Europe/Madrid") - hourIn();
  // Normalize across midnight (e.g. 23h vs 01h is 2h apart, not 22h).
  if (diff > 12) diff -= 24;
  if (diff < -12) diff += 24;

  return { time, offsetHours: Math.abs(diff) };
}

export function CetClock() {
  const { t } = useTranslation();
  const [parts, setParts] = useState(getCetParts);

  useEffect(() => {
    const id = window.setInterval(() => setParts(getCetParts()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="mono inline-flex items-center gap-2 text-xs text-[color:var(--color-text-dim)]">
      <Clock className="h-3.5 w-3.5 text-[color:var(--color-ember)]" aria-hidden />
      <span>
        {t("p.hero.clock", { time: parts.time })}
        {" · "}
        {parts.offsetHours === 0
          ? t("p.hero.clockSame")
          : t("p.hero.clockDiff", { count: parts.offsetHours })}
      </span>
    </span>
  );
}
