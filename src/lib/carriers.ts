import carriersData from "./carriers.json";

export type Carrier = {
  name: string;
  code: string;
};

export const CARRIERS = carriersData as Carrier[];

/** Shown first in the picker — Evri & popular UK/parcel carriers */
export const POPULAR_CARRIER_CODES = [
  "evri",
  "evri-international",
  "royal-mail",
  "dhl",
  "dpd-uk",
  "fedex",
  "ups",
  "hermes-borderguru",
  "myhermes-de",
  "uniuni",
] as const;

const AVATAR_COLORS = ["#FD6B26", "#E55A18", "#C44A1A", "#9A3A14", "#211F1F", "#6B6767"];

function hashHue(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Nice letter avatar when CDN has no logo */
export function initialsLogo(label: string): string {
  const words = label.replace(/[-_]/g, " ").trim().split(/\s+/).filter(Boolean);
  const initials = ((words[0]?.[0] || "?") + (words[1]?.[0] || "")).toUpperCase().slice(0, 2);
  const bg = AVATAR_COLORS[hashHue(label) % AVATAR_COLORS.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="12" fill="${bg}"/>
    <text x="32" y="34" text-anchor="middle" dominant-baseline="middle"
      font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#fff">${initials}</text>
  </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svg.replace(/\s+/g, " ").trim());
}

export const DEFAULT_CARRIER_LOGO = initialsLogo("?");

/**
 * Logo URL for a carrier — local initials only (no external CDN / .com image URLs).
 */
export function carrierLogoUrl(code: string, name?: string): string {
  return initialsLogo(name || code);
}

export function carrierLogoFallback(code: string, name?: string): string {
  return initialsLogo(name || code);
}

export function getPopularCarriers(): Carrier[] {
  const byCode = new Map(CARRIERS.map((c) => [c.code, c]));
  return POPULAR_CARRIER_CODES.map((code) => byCode.get(code)).filter(Boolean) as Carrier[];
}

export function sortCarriersForPicker(list: Carrier[]): Carrier[] {
  const popularSet = new Set<string>(POPULAR_CARRIER_CODES);
  const popular = POPULAR_CARRIER_CODES.map((code) => list.find((c) => c.code === code)).filter(
    Boolean
  ) as Carrier[];
  const rest = list
    .filter((c) => !popularSet.has(c.code))
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...popular, ...rest];
}
