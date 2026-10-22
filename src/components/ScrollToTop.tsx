'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef<number | null>(null);
  const lastRan = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY;
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const now = Date.now();
        if (now - lastRan.current >= 150) {
          setIsVisible((prev) => {
            const next = scrollY > 300;
            return prev !== next ? next : prev;
          });
          lastRan.current = now;
        }
        rafId.current = null;
      });
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          key="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-brand p-3 text-white shadow-lift focus-ring"
          aria-label="Scroll to top"
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
          whileHover={reduce ? undefined : { y: -3, scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
