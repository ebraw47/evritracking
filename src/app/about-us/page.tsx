import type { Metadata } from "next";
import ContentPageShell from "@/components/ContentPageShell";
import MarkdownContent from "@/components/MarkdownContent";
import { getMarkdown, stripLeadingH1 } from "@/lib/content";
import { BRAND, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

const PAGE_URL = `${SITE_ORIGIN}${ROUTES.about}`;
const PAGE_TITLE = "About Us | evritracking";
const PAGE_DESCRIPTION =
  "Discover evritracking.com — real-time Evri parcel tracking, multi-carrier updates, and clear milestone guides.";

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

export default function AboutPage() {
  const content = stripLeadingH1(getMarkdown("about"));
  return (
    <ContentPageShell title="About Us" description={PAGE_DESCRIPTION}>
      <MarkdownContent content={content} />
    </ContentPageShell>
  );
}
