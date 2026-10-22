import ArticlePage, { articleMetadata } from "@/components/ArticlePage";
import { ARTICLES } from "@/lib/siteConfig";

const article = ARTICLES.find((a) => a.slug === "how-to-divert-evri-parcel")!;

export const metadata = articleMetadata(article);

export default function Page() {
  return <ArticlePage article={article} />;
}
