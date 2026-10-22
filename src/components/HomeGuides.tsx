"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/Motion";
import { ARTICLES } from "@/lib/siteConfig";

export default function HomeGuides() {
  return (
    <section className="border-y border-slate-200 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeIn className="max-w-2xl">
          <p className="section-kicker">Guides & tips</p>
          <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Tracking guides</h2>
          <p className="mt-2 text-ink-mute">
            Step-by-step help for Evri numbers, stalled updates, and parcel diversion.
          </p>
        </FadeIn>
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <StaggerItem key={a.slug}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                <Link
                  href={`/${a.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-paper shadow-sm transition hover:border-navy-200 hover:shadow-soft"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-ink group-hover:text-navy-800 line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-mute line-clamp-2">
                      {a.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                      Read guide
                      <span aria-hidden className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
