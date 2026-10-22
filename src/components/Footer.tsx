import Link from "next/link";
import Image from "next/image";
import { ARTICLES, BRAND, IMAGES, ROUTES } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#00004D] text-neutral-300">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center">
              <Image
                src={IMAGES.officialLogo}
                alt={`${BRAND.name} logo`}
                width={816}
                height={306}
                className="h-12 w-auto max-w-[260px] object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">
              Independent tracking for Evri UK parcels, calling cards, returns, and delivery
              milestones — powered by live Cainiao lookups.
            </p>
            <p className="mt-3 text-xs text-neutral-500">
              Not affiliated with Evri Limited. Brand names used only to describe tracking topics.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li>
                <Link href={ROUTES.home} className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href={ROUTES.blog} className="transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={ROUTES.about} className="transition-colors hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.contact} className="transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.privacy} className="transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={ROUTES.disclaimer} className="transition-colors hover:text-white">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Guides
            </h2>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              {ARTICLES.slice(0, 4).map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}`}
                    className="line-clamp-1 transition-colors hover:text-white"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-neutral-400">
              Site:{" "}
              <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-white">
                {BRAND.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-neutral-500">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. |{" "}
            <Link href="/" className="transition-colors hover:text-white">
              {BRAND.domain}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
