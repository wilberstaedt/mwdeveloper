import { useEffect, useRef, useState } from "react";

/**
 * Cursor spotlight (redesign 2026-07): a ~600px blue radial glow that follows
 * the pointer — the brittanychiang.com pattern, kept quiet (low opacity,
 * normal blend). Disabled on touch/coarse-pointer devices and under
 * prefers-reduced-motion. Performance: a single fixed element moved with
 * transform inside requestAnimationFrame via a direct ref — zero React
 * re-renders on mousemove. Not mounted here — Home mounts it.
 */

const SIZE = 600;

export function CursorSpotlight() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let x = 0;
    let y = 0;

    const apply = () => {
      raf = 0;
      const el = glowRef.current;
      if (el) {
        el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
        el.style.opacity = "1";
      }
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <div
        ref={glowRef}
        className="rounded-full opacity-0 will-change-transform"
        style={{
          width: SIZE,
          height: SIZE,
          // Hidden offscreen until the first mousemove positions it.
          transform: "translate3d(-9999px, -9999px, 0)",
          background:
            "radial-gradient(circle closest-side, rgba(0, 102, 255, 0.08), transparent 80%)",
        }}
      />
    </div>
  );
}

export default CursorSpotlight;
