"use client";

import Image from "next/image";
import MarkdownContent from "@/components/MarkdownContent";
import FaqAccordion from "@/components/FaqAccordion";
import { FeatureCards, StepCards } from "@/components/FeatureCards";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND, HOME_FAQS, IMAGES } from "@/lib/siteConfig";

export default function HomeBody({
  beforeSteps,
  afterSteps,
}: {
  beforeSteps: string;
  afterSteps: string;
}) {
  return (
    <>
      <section className="bg-paper py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <FadeIn>
            <p className="section-kicker">Why shoppers trust us</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Why Choose Us?
            </h2>
            <p className="mt-2 max-w-2xl text-ink-mute">
              Built for Evri parcels — clear milestones, calling-card lookups, and live Cainiao
              tracking.
            </p>
          </FadeIn>
          <div className="mt-10">
            <FeatureCards />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-brand/15 bg-gradient-to-br from-[#00004D] via-[#001A66] to-[#0072BC] py-14 text-white md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <FadeIn>
            <p className="section-kicker !text-white/70">Built for UK parcel visibility</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              One tracker for every Evri number
            </h2>
            <p className="mt-3 max-w-md text-white/85">
              Paste your 16-digit tracking code or 8-digit calling card on {BRAND.domain} and follow
              collection, depot, and out-for-delivery milestones in real time.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/15">
              <Image
                src={IMAGES.doorstep}
                alt="Evri courier delivering a parcel"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
            <div className="absolute -bottom-4 -left-2 hidden w-40 overflow-hidden rounded-xl shadow-lift ring-1 ring-white/20 sm:block md:w-48">
              <Image
                src={IMAGES.parcelshop}
                alt="Evri ParcelShop"
                width={384}
                height={240}
                className="h-auto w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
          <MarkdownContent content={beforeSteps} />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
          <FadeIn className="mb-8 text-center md:mb-10">
            <p className="section-kicker">Quick start</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Track in three simple steps
            </h2>
          </FadeIn>
          <StepCards />
        </div>

        <div className="mx-auto grid max-w-6xl gap-4 px-4 pb-10 sm:grid-cols-3 md:px-6">
          {[IMAGES.courier, IMAGES.orders, IMAGES.tool].map((src) => (
            <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
            </div>
          ))}
        </div>

        {afterSteps ? (
          <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:pb-16">
            <MarkdownContent content={afterSteps} />
          </div>
        ) : null}
      </section>

      <section className="border-t border-slate-200 bg-white py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <FadeIn>
            <p className="section-kicker">Ready to check your parcel?</p>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Track your Evri shipment now
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-ink-mute">
              Paste your Evri tracking number in the box at the top of this page for live Cainiao
              updates.
            </p>
            <a
              href="#tracking-number"
              className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring"
            >
              Go to tracker
            </a>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <FadeIn>
            <p className="section-kicker">Help center</p>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              FAQs About Evri Tracking
            </h2>
            <p className="mt-2 mb-8 text-ink-mute">
              Divert, missed parcels, collection, accessibility, and more.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <FaqAccordion faqs={HOME_FAQS} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
