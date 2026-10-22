import type { Metadata } from "next";
import ContentPageShell from "@/components/ContentPageShell";
import MarkdownContent from "@/components/MarkdownContent";
import { getMarkdown, stripLeadingH1 } from "@/lib/content";
import { BRAND, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

const PAGE_URL = `${SITE_ORIGIN}${ROUTES.disclaimer}`;
const PAGE_TITLE = "Disclaimer - evritracking";
const PAGE_DESCRIPTION = "Disclaimer for https://evritracking.com/";

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

export default function DisclaimerPage() {
  const content = stripLeadingH1(getMarkdown("disclaimer"));
  return (
    <ContentPageShell title="Disclaimer" description={PAGE_DESCRIPTION}>
      <MarkdownContent content={content} />
    </ContentPageShell>
  );
}
