"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BRAND, IMAGES, OFFICIAL, ROUTES } from "@/lib/siteConfig";

const navLinks = [
  { href: ROUTES.home, label: "Track" },
  { href: ROUTES.blog, label: "Blog" },
  { href: ROUTES.about, label: "About Us" },
  { href: ROUTES.contact, label: "Contact Us" },
  { href: ROUTES.disclaimer, label: "Disclaimer" },
  { href: ROUTES.privacy, label: "Privacy Policy" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        transparent
          ? "border-0 bg-[#00004D]/80 shadow-none backdrop-blur-md"
          : "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-3 px-4 md:h-20 md:px-6">
        <Link href="/" className="flex shrink-0 items-center group" aria-label={`${BRAND.name} home`}>
          <Image
            src={IMAGES.officialLogo}
            alt={`${BRAND.name} — Evri delivery made for you`}
            width={816}
            height={306}
            priority
            className={`h-11 w-auto max-w-[220px] object-contain object-left sm:h-12 sm:max-w-[260px] md:h-14 md:max-w-[300px] ${
              transparent ? "brightness-0 invert" : ""
            }`}
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative pb-0.5 text-sm font-semibold transition-colors ${
                transparent
                  ? isActive(href)
                    ? "text-white"
                    : "text-white/85 hover:text-white"
                  : isActive(href)
                    ? "text-ink"
                    : "text-ink hover:text-navy-700"
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                  transparent ? "bg-white" : "bg-ink"
                } ${isActive(href) ? "w-full" : "w-0"}`}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={OFFICIAL.phoneHref}
            className={`hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide transition focus-ring sm:inline-flex ${
              transparent
                ? "bg-white text-navy-900 hover:bg-neutral-100"
                : "bg-brand text-white hover:bg-brand-dark"
            }`}
            aria-label={`Call official Evri tracking support ${OFFICIAL.phone}`}
            title={OFFICIAL.phone}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h2.3a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.3 1.1l-1.5 1.5a12 12 0 005.5 5.5l1.5-1.5a1 1 0 011.1-.3l3.3 1.1a1 1 0 01.68.95V19a2 2 0 01-2 2h-.5C9.6 21 3 14.4 3 6.5V6a1 1 0 010-1z"
              />
            </svg>
            <span>Call</span>
          </a>
          <a
            href={OFFICIAL.emailHref}
            className={`hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold uppercase tracking-wide transition focus-ring sm:inline-flex ${
              transparent
                ? "border border-white/60 text-white hover:bg-white/10"
                : "border border-brand/30 text-brand hover:bg-brand-soft"
            }`}
            aria-label={`Email official Evri support ${OFFICIAL.email}`}
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7l8 6 8-6" />
            </svg>
            <span className="hidden lg:inline">Email</span>
            <span className="lg:hidden">Email</span>
          </a>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg xl:hidden focus-ring ${
              transparent
                ? "text-white hover:bg-white/10"
                : "text-ink hover:bg-slate-100"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-slate-200 bg-white xl:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-3 py-3 text-base font-semibold ${
                    isActive(href) ? "bg-slate-100 text-ink" : "text-ink hover:bg-slate-50"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <a
                href={OFFICIAL.phoneHref}
                className="mt-2 rounded-lg bg-brand px-3 py-3 text-center text-base font-bold text-white"
                aria-label={`Call ${OFFICIAL.phone}`}
              >
                Call
              </a>
              <a
                href={OFFICIAL.emailHref}
                className="rounded-lg border border-brand/30 px-3 py-3 text-center text-base font-bold text-brand"
              >
                Email {OFFICIAL.email}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
