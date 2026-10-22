import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type TrackBody = {
  tracking_number?: string;
  carrier_code?: string;
  carrier_name?: string;
};

type TrackEvent = {
  date?: string;
  status?: string;
  location?: string;
  description?: string;
};

type Normalized = {
  carrier: string;
  status: string;
  events: TrackEvent[];
  origin: string;
  destination: string;
  latest_summary: string;
  days_in_transit: string;
  sync_time: string;
};

/** Short in-memory cache (mirrors WP “results are cached automatically”) */
const cache = new Map<string, { expires: number; data: Normalized }>();
const CACHE_TTL_MS = 10 * 60 * 1000;

function badRequest(message: string, status = 400) {
  return NextResponse.json({ success: false, message, data: { message } }, { status });
}

function cacheGet(key: string): Normalized | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expires) {
    cache.delete(key);
    return null;
  }
  return hit.data;
}

function cacheSet(key: string, data: Normalized) {
  cache.set(key, { expires: Date.now() + CACHE_TTL_MS, data });
}

/**
 * Cainiao Global Express — free, no API key (same provider as WordPress settings).
 * https://global.cainiao.com/global/detail.json?mailNos=…&lang=en-US&language=en-US
 */
async function trackViaCainiao(
  trackingNumber: string,
  carrierCode: string
): Promise<Normalized | null> {
  const url = new URL("https://global.cainiao.com/global/detail.json");
  url.searchParams.set("mailNos", trackingNumber);
  url.searchParams.set("lang", "en-US");
  url.searchParams.set("language", "en-US");

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent":
        "Mozilla/5.0 (compatible; evritracking/1.0; +https://everitracking.com)",
      Referer: "https://global.cainiao.com/",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = await res.json();
  if (!json?.success || !Array.isArray(json.module) || !json.module[0]) return null;

  const mod = json.module[0] as {
    mailNo?: string;
    originCountry?: string;
    destCountry?: string;
    status?: string;
    statusDesc?: string;
    noTrackingDataDesc?: string;
    mailNoSource?: string;
    daysNumberOfCurrentStatus?: number | string;
    detailList?: Array<Record<string, unknown>>;
  };

  const events: TrackEvent[] = (mod.detailList || []).map((e) => {
    const date = String(e.timeStr || e.time || e.gmtCreate || e.date || "");
    const description = String(e.desc || e.standerdDesc || e.statusDesc || e.stDesc || e.description || "");
    const status = String(e.statusDesc || e.stName || e.status || description);
    const location = String(e.areaName || e.cityName || e.location || e.address || "");
    return { date, status, location, description: description || status };
  });

  const status =
    mod.statusDesc ||
    (events[0]?.status) ||
    mod.noTrackingDataDesc ||
    (mod.status === "SELLER_PREPARING" ? "Awaiting seller dispatch" : "") ||
    (events.length ? "In Transit" : "No tracking updates yet");

  const latest =
    events[0]?.description ||
    mod.statusDesc ||
    mod.noTrackingDataDesc ||
    "";

  const days =
    mod.daysNumberOfCurrentStatus != null && mod.daysNumberOfCurrentStatus !== ""
      ? `${mod.daysNumberOfCurrentStatus} days`
      : "";

  return {
    carrier: carrierCode || "Cainiao",
    status,
    events,
    origin: mod.originCountry || "",
    destination: mod.destCountry || "",
    latest_summary: latest,
    days_in_transit: days,
    sync_time: new Date().toISOString(),
  };
}

async function trackViaWordpressProxy(
  trackingNumber: string,
  carrierCode: string
): Promise<Normalized | null> {
  const proxy = process.env.TRACKING_WP_AJAX_URL;
  const nonce = process.env.TRACKING_WP_NONCE;
  if (!proxy) return null;

  const body = new URLSearchParams({
    action: "aet_track_package",
    tracking_number: trackingNumber,
    carrier_code: carrierCode,
  });
  if (nonce) body.set("nonce", nonce);

  const res = await fetch(proxy, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!res.ok) return null;
  const json = await res.json();
  if (!json?.success || !json?.data) return null;
  return {
    carrier: json.data.carrier || "Unknown",
    status: json.data.status || "Unknown",
    events: Array.isArray(json.data.events) ? json.data.events : [],
    origin: json.data.origin || "",
    destination: json.data.destination || "",
    latest_summary: json.data.latest_summary || "",
    days_in_transit: json.data.days_in_transit || "",
    sync_time: json.data.sync_time || new Date().toISOString(),
  };
}

async function trackVia17Track(
  trackingNumber: string,
  carrierCode: string
): Promise<Normalized | null> {
  const key = process.env.TRACKING_API_KEY;
  if (!key) return null;

  await fetch("https://api.17track.net/track/v2.2/register", {
    method: "POST",
    headers: { "Content-Type": "application/json", "17token": key },
    body: JSON.stringify([{ number: trackingNumber, carrier: 0 }]),
    cache: "no-store",
  });

  const res = await fetch("https://api.17track.net/track/v2.2/gettrackinfo", {
    method: "POST",
    headers: { "Content-Type": "application/json", "17token": key },
    body: JSON.stringify([{ number: trackingNumber, carrier: 0 }]),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = await res.json();
  const track = json?.data?.accepted?.[0]?.track;
  if (!track) return null;

  const events = (track.z0 ? [track.z0, ...(track.z1 || [])] : track.z1 || []).map(
    (e: { a?: string; c?: string; z?: string; d?: string }) => ({
      date: e.a || e.d || "",
      status: e.z || "",
      location: e.c || "",
      description: e.z || "",
    })
  );

  const statusMap: Record<number, string> = {
    0: "Not Found",
    10: "In Transit",
    20: "Expired",
    30: "Ready for Pickup",
    35: "Undelivered",
    40: "Delivered",
    50: "Alert",
  };

  return {
    carrier: track.w1 || track.w2 || carrierCode || "Unknown",
    status: statusMap[track.e as number] || track.z0?.z || "In Transit",
    events,
    origin: track.b || "",
    destination: track.c || "",
    latest_summary: track.z0?.z || "",
    days_in_transit: track.f ? `${track.f} days` : "",
    sync_time: new Date().toISOString(),
  };
}

async function trackViaTrackingMore(
  trackingNumber: string,
  carrierCode: string
): Promise<Normalized | null> {
  const key = process.env.TRACKINGMORE_API_KEY || process.env.TRACKING_API_KEY;
  if (!key) return null;

  const res = await fetch("https://api.trackingmore.com/v4/trackings/realtime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Tracking-Api-Key": key,
    },
    body: JSON.stringify({
      tracking_number: trackingNumber,
      courier_code: carrierCode || undefined,
    }),
    cache: "no-store",
  });

  if (!res.ok) return null;
  const json = await res.json();
  const data = json?.data;
  if (!data) return null;

  const events = (data.origin_info?.trackinfo || data.destination_info?.trackinfo || []).map(
    (e: {
      checkpoint_date?: string;
      tracking_detail?: string;
      location?: string;
      checkpoint_delivery_status?: string;
    }) => ({
      date: e.checkpoint_date || "",
      status: e.checkpoint_delivery_status || e.tracking_detail || "",
      location: e.location || "",
      description: e.tracking_detail || "",
    })
  );

  return {
    carrier: data.courier_code || carrierCode || "Unknown",
    status: data.delivery_status || "Unknown",
    events,
    origin: data.origin || "",
    destination: data.destination || "",
    latest_summary: events[0]?.description || "",
    days_in_transit: "",
    sync_time: new Date().toISOString(),
  };
}

export async function POST(req: NextRequest) {
  let body: TrackBody;
  try {
    body = await req.json();
  } catch {
    return badRequest("Invalid JSON body");
  }

  const trackingNumber = (body.tracking_number || "").trim();
  const carrierCode = (body.carrier_code || "").trim();
  const carrierName = (body.carrier_name || "").trim();

  if (!trackingNumber) return badRequest("Please enter a tracking number");
  if (!/^[A-Za-z0-9]{8,40}$/.test(trackingNumber)) {
    return badRequest("Please enter a valid tracking number");
  }

  const cacheKey = `${trackingNumber}|${carrierCode}`.toLowerCase();
  const cached = cacheGet(cacheKey);
  if (cached) {
    const data = carrierName ? { ...cached, carrier: carrierName } : cached;
    return NextResponse.json({ success: true, data, cached: true });
  }

  // Always use Cainiao for real-time tracking (TRACKING_PROVIDER=cainiao)
  const provider = (process.env.TRACKING_PROVIDER || "cainiao").toLowerCase();

  try {
    let data: Normalized | null = null;

    if (provider === "cainiao" || provider === "auto" || !provider) {
      data = await trackViaCainiao(trackingNumber, carrierCode);
    }
    // Non-Cainiao providers only if explicitly configured (not default)
    if (!data && provider === "wordpress") {
      data = await trackViaWordpressProxy(trackingNumber, carrierCode);
    }
    if (!data && provider === "17track") {
      data = await trackVia17Track(trackingNumber, carrierCode);
    }
    if (!data && provider === "trackingmore") {
      data = await trackViaTrackingMore(trackingNumber, carrierCode);
    }

    if (!data) {
      data = await trackViaCainiao(trackingNumber, carrierCode);
    }

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to track package. Try again later.",
          data: { message: "Unable to track package. Try again later." },
        },
        { status: 502 }
      );
    }

    if (carrierName) {
      data = { ...data, carrier: carrierName };
    }

    cacheSet(cacheKey, data);
    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Track API error:", err);
    return NextResponse.json(
      { success: false, message: "Unable to track package", data: { message: "Unable to track package" } },
      { status: 502 }
    );
  }
}
