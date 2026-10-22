import { XML_HEADERS, absoluteUrl, escapeXml } from "@/lib/sitemapData";

export function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${escapeXml(absoluteUrl("/index.xml"))}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${escapeXml(absoluteUrl("/image-sitemap.xml"))}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(body, { headers: XML_HEADERS });
}
