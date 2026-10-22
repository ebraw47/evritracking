"use client";

import Image from "next/image";
import TrackingWidget from "@/components/TrackingWidget";
import { IMAGES } from "@/lib/siteConfig";

export default function HomeHero() {
  return (
    <section className="relative -mt-[4.5rem] min-h-[min(92vh,860px)] overflow-hidden bg-[#00004D] pt-[4.5rem] md:-mt-20 md:pt-20">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroVan}
          alt="Evri delivery van — track your parcel with evritracking"
          fill
          priority
          className="object-cover object-[78%_center] md:object-right"
          sizes="100vw"
        />
        {/* Solid navy on the left (text side); van stays visible on the right */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#00004D] from-[0%] via-[#00004D] via-[42%] to-[#00004D]/25 to-[100%]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(92vh,860px)] max-w-6xl flex-col justify-center px-4 pb-16 pt-14 md:px-6 md:pt-20">
        <div className="max-w-xl rounded-2xl bg-[#00004D]/80 p-5 text-left text-white shadow-lift ring-1 ring-white/15 backdrop-blur-sm md:bg-[#00004D]/70 md:p-6">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            <span>EVRi</span>
            <span>tracking</span>
          </h1>

          <p className="mt-3 max-w-md text-lg text-white md:text-xl">
            Track Evri parcels, deliveries &amp; returns across the UK
          </p>

          <p className="mt-2 text-sm font-medium tracking-wide text-white/80">
            Paste your Evri tracking number or calling card for live status
          </p>

          <div className="mt-8 w-full max-w-xl">
            <TrackingWidget />
          </div>

          <p className="mt-4 text-xs text-white/75">
            Enter your 16-digit Evri tracking number or 8-digit calling card number.
          </p>
        </div>
      </div>
    </section>
  );
}
