import {
  SITEMAP_IMAGES,
  XML_HEADERS,
  absoluteUrl,
  escapeXml,
} from "@/lib/sitemapData";

export function GET() {
  const byPage = new Map<string, typeof SITEMAP_IMAGES>();
  for (const img of SITEMAP_IMAGES) {
    const list = byPage.get(img.pagePath) ?? [];
    list.push(img);
    byPage.set(img.pagePath, list);
  }

  const urls = Array.from(byPage.entries())
    .map(([pagePath, images]) => {
      const imageTags = images
        .map(
          (img) => `    <image:image>
      <image:loc>${escapeXml(absoluteUrl(img.path))}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
        )
        .join("\n");
      return `  <url>
    <loc>${escapeXml(absoluteUrl(pagePath))}</loc>
${imageTags}
  </url>`;
    })
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(body, { headers: XML_HEADERS });
}
