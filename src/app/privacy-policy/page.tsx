import type { Metadata } from "next";
import ContentPageShell from "@/components/ContentPageShell";
import MarkdownContent from "@/components/MarkdownContent";
import { getMarkdown, stripLeadingH1 } from "@/lib/content";
import { BRAND, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

const PAGE_URL = `${SITE_ORIGIN}${ROUTES.privacy}`;
const PAGE_TITLE = "Privacy Policy - evritracking";
const PAGE_DESCRIPTION = "Privacy Policy of everitracking.com";

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

export default function PrivacyPage() {
  const content = stripLeadingH1(getMarkdown("privacy"));
  return (
    <ContentPageShell title="Privacy Policy" description={PAGE_DESCRIPTION}>
      <MarkdownContent content={content} />
    </ContentPageShell>
  );
}
