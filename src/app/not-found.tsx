import Link from "next/link";
import type { Metadata } from "next";
import { BRAND } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: `Page Not Found - ${BRAND.name}`,
  description: `The page you are looking for does not exist. Return to the ${BRAND.name} homepage.`,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="font-display text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink">Page Not Found</h1>
      <p className="mt-4 text-ink-mute">
        The page you are looking for might have been removed, had its name changed, or is temporarily
        unavailable.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-brand px-8 py-3 font-bold text-white transition hover:bg-brand-dark"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
