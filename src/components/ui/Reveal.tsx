import { motion, type Variants } from "framer-motion";
import type { PropsWithChildren } from "react";

type RevealAs = "div" | "section" | "article" | "header" | "footer" | "li";

interface RevealProps {
  delay?: number;
  y?: number;
  className?: string;
  as?: RevealAs;
}

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: PropsWithChildren<RevealProps>) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      custom={y}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
