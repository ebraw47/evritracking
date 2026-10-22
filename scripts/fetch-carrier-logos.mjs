#!/usr/bin/env node
/**
 * Fetch / verify carrier logos and write src/lib/carrier-logos.json
 *
 * Best (full coverage):
 *   TRACKINGMORE_API_KEY=xxx node scripts/fetch-carrier-logos.mjs
 *   → GET https://api.trackingmore.com/v4/couriers/all
 *   → uses each courier's courier_logo field
 *
 * Fallback (no key):
 *   Probes https://s.trackingmore.com/images/icons/express/{slug}.png
 *   for each carrier code / alias (currently ~60% hit rate).
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const carriers = JSON.parse(fs.readFileSync(path.join(ROOT, "src/lib/carriers.json"), "utf8"));
const OUT = path.join(ROOT, "src/lib/carrier-logos.json");
const MISSING = path.join(ROOT, "src/lib/carrier-logos-missing.json");
const CDN = "https://s.trackingmore.com/images/icons/express/";

// Load .env.local if present
try {
  const env = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m && !process.env[m[1].trim()]) process.env[m[1].trim()] = m[2].trim();
  }
} catch {}

const ALIAS = {
  "yun-express": "yunexpress",
  "aliexpress-saver": "aliexpress",
  "aliexpress-premium": "aliexpress",
  "aliexpress-standard": "aliexpress",
  "bpost-international": "bpost",
  "dhl-paket": "dhl",
  "fedex-poland": "fedex",
  "cne-express": "cne",
  "dpd-ie": "dpd",
  "dpd-france": "dpd",
  "dpd-uk": "dpd",
  "dpd-portugal": "dpd",
  "dpd-poland": "dpd",
  "dpd-romania": "dpd",
  "flash-express-th": "flash-express",
  "redur-reference": "redur",
  "expressone-bg": "expressone",
  "courier-gr": "hispapost",
  "wedo-intime": "wedo",
  "sendx-gr": "sendx",
  "amazon-india": "amazon",
};

function candidates(code, name) {
  const set = new Set(
    [
      ALIAS[code],
      code,
      code.replace(/-/g, ""),
      code.replace(/-/g, "_"),
      name
        ?.toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    ].filter(Boolean)
  );
  return [...set];
}

async function headOk(url) {
  try {
    const r = await fetch(url, { method: "HEAD", redirect: "follow" });
    return r.status === 200;
  } catch {
    return false;
  }
}

async function fromApi(key) {
  const r = await fetch("https://api.trackingmore.com/v4/couriers/all", {
    headers: { "Tracking-Api-Key": key },
  });
  const j = await r.json();
  if (!r.ok || !Array.isArray(j.data)) {
    throw new Error(`API failed: ${r.status} ${j?.meta?.message || ""}`);
  }

  const byCode = new Map();
  const byName = new Map();
  for (const c of j.data) {
    if (c.courier_code) byCode.set(String(c.courier_code).toLowerCase(), c);
    if (c.courier_name) byName.set(String(c.courier_name).toLowerCase(), c);
  }

  const map = {};
  const missing = [];
  for (const local of carriers) {
    const hit =
      byCode.get(local.code) ||
      byCode.get(ALIAS[local.code] || "") ||
      byCode.get(local.code.replace(/-/g, "")) ||
      byName.get(local.name.toLowerCase());

    const logo = hit?.courier_logo;
    if (logo && /^https?:\/\//.test(logo)) {
      map[local.code] = logo;
    } else if (hit?.courier_code) {
      const guess = `${CDN}${hit.courier_code}.png`;
      if (await headOk(guess)) map[local.code] = guess;
      else missing.push(local);
    } else {
      missing.push(local);
    }
  }
  return { map, missing, source: "trackingmore-api", apiCount: j.data.length };
}

async function fromCdnProbe() {
  const map = {};
  const missing = [];
  let i = 0;
  const concurrency = 25;

  async function worker() {
    while (i < carriers.length) {
      const idx = i++;
      const c = carriers[idx];
      let found = null;
      for (const slug of candidates(c.code, c.name)) {
        const url = `${CDN}${slug}.png`;
        if (await headOk(url)) {
          found = url;
          break;
        }
      }
      if (found) map[c.code] = found;
      else missing.push(c);
      if ((idx + 1) % 50 === 0) {
        console.log(`  probe ${idx + 1}/${carriers.length}…`);
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return { map, missing, source: "cdn-probe", apiCount: 0 };
}

(async () => {
  const key = process.env.TRACKINGMORE_API_KEY || process.env.TRACKING_API_KEY || "";
  console.log(key ? "Using TrackingMore API /v4/couriers/all…" : "No API key — probing public CDN…");

  let result;
  try {
    result = key ? await fromApi(key) : await fromCdnProbe();
  } catch (e) {
    console.warn("API failed, falling back to CDN probe:", e.message);
    result = await fromCdnProbe();
  }

  // Merge with existing map so we never lose known logos
  let existing = {};
  try {
    existing = JSON.parse(fs.readFileSync(OUT, "utf8"));
  } catch {}

  const map = { ...existing, ...result.map };
  fs.writeFileSync(OUT, JSON.stringify(map, null, 2) + "\n");
  fs.writeFileSync(MISSING, JSON.stringify(result.missing, null, 2) + "\n");

  const ok = Object.keys(map).length;
  console.log(
    JSON.stringify(
      {
        source: result.source,
        apiCouriers: result.apiCount || undefined,
        mapped: ok,
        missing: result.missing.length,
        coverage: `${((ok / carriers.length) * 100).toFixed(1)}%`,
        out: "src/lib/carrier-logos.json",
      },
      null,
      2
    )
  );
  if (!key) {
    console.log(
      "\nTip: set TRACKINGMORE_API_KEY in .env.local and re-run for near-100% logos via courier_logo."
    );
  }
})();
