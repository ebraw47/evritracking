import { BOX_PATTERN } from "@/components/BoxPattern";

/** Logo-charcoal hero backdrop with orange glow — no motion. */
export default function HoneycombBackground() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-px bottom-0 overflow-hidden bg-[#211F1F]" aria-hidden>
      <div className="absolute inset-0 hero-gradient" />

      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: BOX_PATTERN,
          backgroundSize: "64px 64px",
          backgroundPosition: "center top",
        }}
      />

      <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-[#FD6B26]/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-20 h-[26rem] w-[26rem] rounded-full bg-[#FD6B26]/10 blur-3xl" />
      <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-white/[0.05] blur-3xl" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#211F1F]/80 to-transparent" />
    </div>
  );
}
