"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/** Shared easing — soft, professional */
export const EASE = [0.25, 0.1, 0.25, 1] as const;
export const SPRING = { type: "spring" as const, stiffness: 280, damping: 24 };
export const SPRING_SOFT = { type: "spring" as const, stiffness: 180, damping: 22 };

/** Any intersection — tall opacity:0 blocks must not wait for 20% visibility (causes white gaps) */
const inView = {
  once: true,
  amount: "some" as const,
  margin: "0px 0px 0px 0px",
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
} & Omit<HTMLMotionProps<"div">, "children">;

export function FadeIn({
  children,
  className,
  delay = 0,
  y: _y = 16,
  once = true,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();

  // Visible by default — never mount at opacity:0 (fixes blank first load).
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ ...inView, once }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? undefined : "show"}
      viewport={inView}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: reduce ? 0 : delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      variants={{
        hidden: { opacity: 1, y: 0 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Kept for optional use — prefer visible-by-default heroes */
export const heroContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.12 },
  },
};

export const heroItem = {
  hidden: { opacity: 1, y: 0 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

export { motion };
