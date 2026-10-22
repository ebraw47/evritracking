import { SITEMAP_PAGES, XML_HEADERS, absoluteUrl, escapeXml } from "@/lib/sitemapData";

export function GET() {
  const urls = SITEMAP_PAGES.map(
    (page) => `  <url>
    <loc>${escapeXml(absoluteUrl(page.path))}</loc>
    <lastmod>${escapeXml(page.lastmod)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  ).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, { headers: XML_HEADERS });
}
