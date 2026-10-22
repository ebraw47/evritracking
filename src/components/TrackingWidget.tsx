"use client";

import {
  FormEvent,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CARRIERS,
  carrierLogoFallback,
  carrierLogoUrl,
  sortCarriersForPicker,
  type Carrier,
} from "@/lib/carriers";
import { EASE, SPRING_SOFT } from "@/components/motion/Motion";

export type TrackingEvent = {
  date?: string;
  status?: string;
  location?: string;
  description?: string;
};

export type TrackingResult = {
  carrier?: string;
  status?: string;
  events?: TrackingEvent[];
  origin?: string;
  destination?: string;
  latest_summary?: string;
  days_in_transit?: string;
  sync_time?: string;
};

function CarrierLogo({ code, size = 28, name }: { code: string; name?: string; size?: number }) {
  const [src, setSrc] = useState(() => carrierLogoUrl(code, name));

  useEffect(() => {
    setSrc(carrierLogoUrl(code, name));
  }, [code, name]);

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className="rounded object-contain bg-white"
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setSrc(carrierLogoFallback(code, name))}
    />
  );
}

export default function TrackingWidget() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [trackedNumber, setTrackedNumber] = useState("");
  const [, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowAllEvents(false);
  }, [trackedNumber]);

  useEffect(() => {
    if (!result) return;
    const id = window.setTimeout(() => {
      document.getElementById("tracking-result")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 80);
    return () => window.clearTimeout(id);
  }, [result]);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  const filtered = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    const base = q
      ? CARRIERS.filter(
          (c) => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
        )
      : CARRIERS;
    return sortCarriersForPicker(base);
  }, [deferredSearch]);

  async function trackPackage(e?: FormEvent) {
    e?.preventDefault();
    const number = trackingNumber.trim();
    if (!number) {
      setError("Please enter a tracking number");
      return;
    }
    if (!/^[A-Za-z0-9]{8,40}$/.test(number)) {
      setError("Please enter a valid tracking number");
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tracking_number: number,
          carrier_code: carrier?.code || "",
          carrier_name: carrier?.name || "",
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setError(json?.message || json?.data?.message || "Unable to track package");
        return;
      }
      startTransition(() => {
        setTrackedNumber(number);
        const data = json.data as TrackingResult;
        if (carrier?.name) {
          data.carrier = carrier.name;
        }
        setResult(data);
      });
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function selectCarrier(c: Carrier) {
    setCarrier(c);
    setModalOpen(false);
    setSearch("");
  }

  function clearCarrier() {
    setCarrier(null);
  }

  const modal =
    mounted
      ? createPortal(
          <AnimatePresence>
            {modalOpen ? (
              <motion.div
                key="carrier-modal"
                className="fixed inset-0 z-[2147483646] flex items-end justify-center bg-ink/55 p-0 sm:items-center sm:p-4"
                onClick={() => setModalOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="carrier-modal-title"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-t-2xl bg-white shadow-lift sm:max-h-[85vh] sm:rounded-2xl"
                  onClick={(e) => e.stopPropagation()}
                  initial={reduce ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: 24 }}
                  transition={SPRING_SOFT}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3.5">
                    <h3 id="carrier-modal-title" className="font-display text-lg font-bold text-ink">
                      Choose carrier
                    </h3>
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-2xl leading-none text-ink-mute hover:bg-slate-100 focus-ring"
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>

                  <div className="border-b border-slate-100 px-4 py-3">
                    <input
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search carriers (Evri, DHL, Royal Mail…)"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-ink focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20"
                      autoFocus
                    />
                    <p className="mt-2 text-xs text-ink-mute">
                      {filtered.length} carrier{filtered.length === 1 ? "" : "s"}
                      {!deferredSearch.trim() ? " · Evri & popular parcel carriers listed first" : ""}
                    </p>
                  </div>

                  <div className="flex-1 overflow-y-auto overscroll-contain p-3">
                    {filtered.length === 0 ? (
                      <p className="px-3 py-10 text-center text-sm text-ink-mute">No carriers found</p>
                    ) : (
                      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {filtered.map((c) => {
                          const selected = carrier?.code === c.code;
                          return (
                            <li key={c.code}>
                              <button
                                type="button"
                                onClick={() => selectCarrier(c)}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                                  selected
                                    ? "bg-navy-100 ring-1 ring-navy-300"
                                    : "hover:bg-navy-50"
                                }`}
                              >
                                <CarrierLogo code={c.code} name={c.name} size={32} />
                                <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">
                                  {c.name}
                                </span>
                                {selected && (
                                  <span className="text-xs font-semibold text-navy-800">Selected</span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={trackPackage} className="space-y-3" noValidate>
        <div className="flex overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-black/10">
          <label htmlFor="tracking-number" className="sr-only">
            Enter tracking number
          </label>
          <input
            id="tracking-number"
            type="text"
            value={trackingNumber}
            onChange={(e) => {
              setTrackingNumber(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Evri tracking number (16-digit or calling card)"
            required
            autoComplete="off"
            className="min-w-0 flex-1 border-0 bg-transparent px-5 py-4 text-base text-black placeholder:text-neutral-400 focus:outline-none focus:ring-0"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex shrink-0 items-center justify-center bg-brand px-5 text-white transition hover:bg-brand-dark disabled:opacity-70 focus-ring"
            aria-label="Track package"
          >
            {loading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!carrier ? (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/80 bg-white px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-black shadow-md transition hover:bg-neutral-100 focus-ring"
            >
              Choose Carrier
            </button>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-medium text-black shadow-sm ring-1 ring-black/10">
              <CarrierLogo code={carrier.code} name={carrier.name} size={22} />
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="hover:text-neutral-700 focus-ring rounded"
              >
                {carrier.name}
              </button>
              <button
                type="button"
                onClick={clearCarrier}
                className="ml-1 flex h-6 w-6 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-black focus-ring"
                aria-label="Clear carrier"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </form>

      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            key="track-error"
            className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-100"
            role="alert"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key={trackedNumber}
            id="tracking-result"
            className="mt-4 overflow-hidden rounded-2xl bg-white text-left shadow-lift ring-1 ring-black/5"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* Compact status summary — visible at a glance */}
            <div className="px-4 py-3 sm:px-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs font-semibold tracking-wide text-ink-mute">
                    {trackedNumber}
                  </p>
                  <p
                    className={`mt-1 font-display text-xl font-extrabold leading-tight ${
                      /delivered/i.test(result.status || "")
                        ? "text-black"
                        : /out for delivery|transit|shipped|picked/i.test(result.status || "")
                          ? "text-neutral-800"
                          : "text-ink"
                    }`}
                  >
                    {result.status || "Status unknown"}
                  </p>
                </div>
                {result.carrier && result.carrier !== "Unknown" ? (
                  <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-black">
                    {result.carrier}
                  </span>
                ) : null}
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-mute">
                {(result.origin || result.destination) && (
                  <span className="inline-flex items-center gap-1.5 font-medium text-ink-soft">
                    <span className="max-w-[9rem] truncate">{result.origin || "—"}</span>
                    <span aria-hidden className="text-black">
                      →
                    </span>
                    <span className="max-w-[9rem] truncate">{result.destination || "—"}</span>
                  </span>
                )}
                {result.days_in_transit ? (
                  <span className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-semibold text-ink-soft">
                    {result.days_in_transit}
                  </span>
                ) : null}
              </div>

              {result.latest_summary ? (
                <p className="mt-2 line-clamp-2 text-sm leading-snug text-ink-soft">
                  {result.latest_summary}
                </p>
              ) : null}
            </div>

            {/* Dense timeline — capped height so hero doesn't force page scroll */}
            {result.events && result.events.length > 0 ? (
              <div className="border-t border-slate-100">
                <div className="flex items-center justify-between px-4 py-2 sm:px-5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink-mute">
                    Timeline · {result.events.length} updates
                  </p>
                  {result.events.length > 4 ? (
                    <button
                      type="button"
                      onClick={() => setShowAllEvents((v) => !v)}
                      className="text-[11px] font-bold text-black hover:text-neutral-700 focus-ring rounded"
                    >
                      {showAllEvents ? "Show less" : "Show all"}
                    </button>
                  ) : null}
                </div>

                <ol
                  className={`space-y-0 px-4 pb-3 sm:px-5 ${
                    showAllEvents
                      ? "max-h-[min(40vh,280px)] overflow-y-auto overscroll-contain"
                      : ""
                  }`}
                >
                  {(showAllEvents ? result.events : result.events.slice(0, 4)).map((ev, i) => {
                    const isLatest = i === 0;
                    return (
                      <li
                        key={`${ev.date}-${i}`}
                        className="relative flex gap-2.5 border-l-2 border-slate-100 py-1.5 pl-3 first:pt-0 last:pb-0"
                        style={{ marginLeft: 5 }}
                      >
                        <span
                          className={`absolute -left-[5px] top-2.5 h-2 w-2 rounded-full ${
                            isLatest ? "bg-brand ring-2 ring-brand/30" : "bg-neutral-300"
                          }`}
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <p
                            className={`text-[13px] leading-snug ${
                              isLatest ? "font-semibold text-ink" : "font-medium text-ink-soft"
                            }`}
                          >
                            {ev.status || ev.description || "Update"}
                          </p>
                          {(ev.location || ev.date) && (
                            <p className="mt-0.5 text-[11px] leading-tight text-ink-mute">
                              {[ev.location, ev.date].filter(Boolean).join(" · ")}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {!showAllEvents && result.events.length > 4 ? (
                  <button
                    type="button"
                    onClick={() => setShowAllEvents(true)}
                    className="w-full border-t border-slate-100 py-2 text-center text-xs font-semibold text-black hover:bg-neutral-50 focus-ring"
                  >
                    +{result.events.length - 4} more updates
                  </button>
                ) : null}
              </div>
            ) : (
              <p className="border-t border-slate-100 px-4 py-3 text-sm text-ink-mute sm:px-5">
                No scan events yet. International parcels often go quiet between airports and customs.
              </p>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {modal}
    </div>
  );
}
