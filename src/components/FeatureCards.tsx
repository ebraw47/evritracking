"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/motion/Motion";

type CardItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const iconClass = "h-7 w-7";

export const FEATURE_ICONS = {
  cart: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L20 8H7" />
    </svg>
  ),
  van: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 15V8a1 1 0 0 1 1-1h9v8" />
      <path d="M13 10h4.5L21 14v1h-8" />
      <circle cx="7" cy="17" r="1.75" />
      <circle cx="17" cy="17" r="1.75" />
      <path d="M8.75 17h6.5" />
    </svg>
  ),
  chat: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H10l-4 3v-3H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  ),
  phone: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <path d="M11 6h2M11 18h2" />
    </svg>
  ),
  pin: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.25" />
    </svg>
  ),
  bag: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 9h12l-.8 10.2A2 2 0 0 1 15.2 21H8.8a2 2 0 0 1-2-1.8L6 9z" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  keyboard: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M8 14h8M6 14h.01M18 14h.01" />
    </svg>
  ),
  truck: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M1 16V8a1 1 0 0 1 1-1h10v9" />
      <path d="M12 10h5l4 4v2h-9" />
      <circle cx="6.5" cy="17.5" r="1.75" />
      <circle cx="17.5" cy="17.5" r="1.75" />
      <path d="M8.25 17.5h7.5M3 12h9" />
    </svg>
  ),
  update: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 16V8M9 11l3-3 3 3" />
    </svg>
  ),
} as const;

export const HOME_FEATURES: CardItem[] = [
  {
    title: "Real-Time Updates",
    description: "Get live milestone updates and know where your Evri parcel stands.",
    icon: FEATURE_ICONS.cart,
  },
  {
    title: "Calling Card Ready",
    description: "Track with a 16-digit Evri code or an 8-digit calling card after a missed delivery.",
    icon: FEATURE_ICONS.van,
  },
  {
    title: "Clear Milestones",
    description: "Follow collection, depot scans, out for delivery, and safe-place drops.",
    icon: FEATURE_ICONS.chat,
  },
  {
    title: "Easy-to-Use Interface",
    description: "A simple, clean design makes UK Evri tracking lookups fast for every recipient.",
    icon: FEATURE_ICONS.phone,
  },
  {
    title: "Divert Guidance",
    description: "Learn how to divert to a neighbour or safe place when you won’t be in.",
    icon: FEATURE_ICONS.pin,
  },
  {
    title: "Evri Focused",
    description: "Built for Evri numbers, ParcelShop returns, and UK courier deliveries.",
    icon: FEATURE_ICONS.bag,
  },
];

export const HOME_STEPS: CardItem[] = [
  {
    title: "Enter Your Number",
    description: "Paste your 16-digit Evri tracking number or 8-digit calling card.",
    icon: FEATURE_ICONS.keyboard,
  },
  {
    title: 'Click “Track Package”',
    description: "Get instant updates on your Evri shipment.",
    icon: FEATURE_ICONS.truck,
  },
  {
    title: "Stay Updated",
    description: "Check the latest milestones anytime as your parcel moves.",
    icon: FEATURE_ICONS.update,
  },
];

function IconCard({ item }: { item: CardItem }) {
  return (
    <motion.article
      className="group relative rounded-2xl border border-[#A8D4F0] bg-white px-5 pb-6 pt-10"
      whileHover={{
        y: -6,
        borderColor: "#0072BC",
        boxShadow: "0 18px 40px -20px rgba(0, 114, 188, 0.45)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <motion.div
        className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#A8D4F0] bg-white text-[#0072BC] shadow-sm"
        aria-hidden
        variants={{
          rest: { scale: 1, rotate: 0 },
          hover: { scale: 1.1, rotate: -6 },
        }}
        initial="rest"
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 16 }}
      >
        {item.icon}
      </motion.div>
      <h3 className="font-display text-lg font-bold tracking-tight text-[#00004D] md:text-[1.15rem]">
        {item.title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-[#5A5A7A]">{item.description}</p>
    </motion.article>
  );
}

export function FeatureCards({ items = HOME_FEATURES }: { items?: CardItem[] }) {
  return (
    <Stagger className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.title}>
          <IconCard item={item} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function StepCards({ items = HOME_STEPS }: { items?: CardItem[] }) {
  return (
    <Stagger className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" delay={0.08}>
      {items.map((item) => (
        <StaggerItem key={item.title}>
          <IconCard item={item} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
