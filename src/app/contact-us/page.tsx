import type { Metadata } from "next";
import ContentPageShell from "@/components/ContentPageShell";
import MarkdownContent from "@/components/MarkdownContent";
import ContactForm from "@/components/ContactForm";
import { getMarkdown, stripLeadingH1 } from "@/lib/content";
import { BRAND, OFFICIAL, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

const PAGE_URL = `${SITE_ORIGIN}${ROUTES.contact}`;
const PAGE_TITLE = "Contact Us - evritracking";
const PAGE_DESCRIPTION =
  "Contact evritracking.com or reach Evri UK support on the official phone line.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BRAND.name,
    type: "website",
  },
};

export default function ContactPage() {
  const content = stripLeadingH1(getMarkdown("contact"))
    .replace(/\nName\n\nEmail\\\*\n\nMessage\\\*\n\nSubmit\n*/i, "\n\n")
    .replace(/\nName\n[\s\S]*?Submit\n*/i, "\n\n");

  return (
    <ContentPageShell title="Contact Us" description={PAGE_DESCRIPTION}>
      <div className="mb-8 rounded-2xl border border-brand/20 bg-brand-soft/50 p-5 md:p-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-navy-700">
          Official Evri UK support
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={OFFICIAL.phoneHref}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-dark focus-ring"
          >
            Call {OFFICIAL.phone}
          </a>
          <a
            href={OFFICIAL.emailHref}
            className="inline-flex items-center gap-2 rounded-xl border border-brand/30 bg-white px-4 py-2.5 text-sm font-bold text-navy-900 hover:bg-navy-50 focus-ring"
          >
            Email {OFFICIAL.email}
          </a>
        </div>
        <p className="mt-3 text-sm text-ink-mute">{OFFICIAL.phoneHours}</p>
        <p className="mt-2 text-xs text-ink-mute">
          Official UK support line for Evri parcel queries.
        </p>
      </div>
      <MarkdownContent content={content} />
      <div className="mt-10 border-t border-slate-100 pt-8">
        <ContactForm />
      </div>
    </ContentPageShell>
  );
}
