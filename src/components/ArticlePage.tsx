import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { PageBannerPattern } from "@/components/BoxPattern";
import MarkdownContent from "@/components/MarkdownContent";
import { FadeIn } from "@/components/motion/Motion";
import { getMarkdown, stripLeadingH1 } from "@/lib/content";
import { ARTICLES, BRAND, IMAGES, SITE_ORIGIN } from "@/lib/siteConfig";

type ArticleMeta = (typeof ARTICLES)[number];

export function articleMetadata(article: ArticleMeta): Metadata {
  const url = `${SITE_ORIGIN}/${article.slug}`;
  const metaTitle = article.metaTitle;
  return {
    title: { absolute: metaTitle },
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: article.description,
      url,
      siteName: BRAND.name,
      type: "article",
      publishedTime: article.date,
      images: [{ url: `${SITE_ORIGIN}${article.image}`, width: 1280, height: 720, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: article.description,
      images: [`${SITE_ORIGIN}${article.image}`],
    },
  };
}

function GuideCardThumb({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden bg-navy-100">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
      />
    </div>
  );
}

export default function ArticlePage({
  article,
  contentSlug,
}: {
  article: ArticleMeta;
  contentSlug?: string;
}) {
  const raw = getMarkdown(contentSlug || article.slug);
  const content = stripLeadingH1(raw);
  const url = `${SITE_ORIGIN}/${article.slug}`;
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [`${SITE_ORIGIN}${article.image}`],
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: BRAND.name, url: SITE_ORIGIN },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}${IMAGES.logo}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/category/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <>
      <Script id={`article-schema-${article.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Script id={`breadcrumb-${article.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <article className="bg-paper">
        <header className="page-banner relative overflow-hidden border-b border-white/10 text-white">
          <PageBannerPattern opacity={0.35} />
          <div className="relative mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
            <nav className="mb-5 text-sm text-white/70" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/category/blog" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="line-clamp-1 text-white/90">{article.title}</li>
              </ol>
            </nav>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">
              Tracking guide
            </p>
            <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl md:leading-tight">
              {article.title}
            </h1>
            <p className="mt-5 text-sm text-white/80">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="mx-2">·</span>
              <span>{BRAND.name}</span>
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
          <figure className="mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-navy-50 shadow-sm">
            <span className="relative block aspect-[16/9] w-full">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width:768px) 100vw, 760px"
              />
            </span>
          </figure>
          <MarkdownContent content={content} />
        </div>

        {related.length > 0 && (
          <aside className="border-t border-slate-200 bg-white py-12 md:py-14">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <FadeIn>
                <p className="section-kicker">Keep reading</p>
                <h2 className="font-display text-2xl font-bold text-ink">Related guides</h2>
              </FadeIn>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a, i) => (
                  <FadeIn key={a.slug} delay={0.05 * i}>
                    <Link
                      href={`/${a.slug}`}
                      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-paper transition hover:border-navy-200 hover:shadow-soft"
                    >
                      <GuideCardThumb src={a.image} alt={a.title} />
                      <div className="p-4">
                        <h3 className="font-display text-base font-semibold text-ink group-hover:text-navy-800 line-clamp-2">
                          {a.title}
                        </h3>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </aside>
        )}
      </article>
    </>
  );
}
