import { readFileSync } from "fs";
import { join } from "path";

const CONTENT_DIR = join(process.cwd(), "src/content");

/** Read a markdown content file from src/content */
export function getMarkdown(slug: string): string {
  return readFileSync(join(CONTENT_DIR, `${slug}.md`), "utf8");
}

/** Strip a leading H1 so the page can render its own title */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+\*?\*?[^\n]+\*?\*?\s*\n+/, "");
}
