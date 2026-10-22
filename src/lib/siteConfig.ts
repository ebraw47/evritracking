/** Central brand / domain config for everitracking (Evri parcel tracking) */
export const SITE_ORIGIN = "https://everitracking.com";

export const BRAND = {
  name: "EVRitracking",
  shortName: "EVRitracking",
  keyword: "evritracking",
  domain: "everitracking.com",
  email: "contact@everitracking.com",
  twitter: "@everitracking",
  tagline: "Track Evri parcels, deliveries & returns",
  description:
    "Track Evri UK parcels with your 16-digit tracking number or 8-digit calling card. Live Cainiao-powered status, divert tips, and clear milestone guides.",
} as const;

/** Official Evri UK support (contact page only — UK international format) */
export const OFFICIAL = {
  phone: "+44 330 808 5456",
  phoneHref: "tel:+443308085456",
  email: "noreply.priority@evri.com",
  emailHref: "mailto:noreply.priority@evri.com",
  phoneHours: "24/7 line · Advisors Mon–Fri 8am–4pm, Sat 8am–2pm (UK)",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about-us",
  blog: "/category/blog",
  contact: "/contact-us",
  privacy: "/privacy-policy",
  disclaimer: "/disclaimer",
} as const;

export const IMAGES = {
  logo: "/evritracking-official-logo.png",
  favicon: "/evritracking-favicon.jpg",
  brandLogo: "/evritracking-official-logo.png",
  officialLogo: "/evritracking-official-logo.png",
  banner: "/feature/hero-van.jpg",
  og: "/feature/hero-van.jpg",
  ogSquare: "/evritracking-favicon.jpg",
  twitter: "/feature/hero-van.jpg",
  website: "/gallery/doorstep-delivery.jpg",
  tool: "/gallery/wrapping-parcel.jpg",
  container: "/gallery/parcelshop.jpg",
  parcel: "/gallery/courier-parcels.jpg",
  shipment: "/gallery/courier-street.jpg",
  orders: "/gallery/residential-delivery.jpg",
  heroAlt: "/feature/hero-van.jpg",
  heroVan: "/feature/hero-van.jpg",
  parcelshop: "/gallery/parcelshop.jpg",
  courier: "/gallery/courier-street.jpg",
  doorstep: "/gallery/doorstep-delivery.jpg",
  faqDivert: "/gallery/faq-divert.png",
  faqAccess: "/gallery/faq-accessibility.png",
  faqCollect: "/gallery/faq-collect.png",
} as const;

export const ARTICLES = [
  {
    slug: "how-to-track-evri-parcel",
    title: "How to Track an Evri Parcel: Step-by-Step Guide",
    metaTitle: "How to Track an Evri Parcel | Step-by-Step Guide",
    description:
      "Learn how to track an Evri parcel with a 16-digit tracking number or 8-digit calling card on this site — live Cainiao updates.",
    date: "2026-10-22",
    image: "/blog/how-to-track-evri-parcel.jpg",
  },
  {
    slug: "evri-tracking-number",
    title: "Evri Tracking Number: 16-Digit & Calling Card Explained",
    metaTitle: "Evri Tracking Number Format (16-Digit & Calling Card)",
    description:
      "What an Evri tracking number looks like, where to find it in retailer emails, and how 8-digit calling cards work after a missed delivery.",
    date: "2026-10-20",
    image: "/blog/evri-tracking-number.jpg",
  },
  {
    slug: "evri-tracking-not-updating",
    title: "Evri Tracking Not Updating? Causes and What to Do",
    metaTitle: "Evri Tracking Not Updating? Causes & Fixes",
    description:
      "Evri tracking stuck for days? Learn common UK delivery pauses, when to contact the sender, and how to check your parcel correctly.",
    date: "2026-10-18",
    image: "/blog/evri-tracking-not-updating.jpg",
  },
  {
    slug: "how-to-divert-evri-parcel",
    title: "How to Divert Your Evri Parcel to a Neighbour or Safe Place",
    metaTitle: "How to Divert an Evri Parcel | Neighbour & Safe Place",
    description:
      "Divert your Evri delivery to a neighbour or safe place using your 16-digit tracking number and postcode — plus what to do if you need a signature.",
    date: "2026-10-16",
    image: "/blog/how-to-divert-evri-parcel.jpg",
  },
] as const;

export const HOME_FAQS = [
  {
    q: "How do I divert my parcel?",
    a: "If you have a parcel that’s due to be delivered and you’d like to divert it to a neighbour or safe place, open the tracker on this site, enter your 16-digit tracking number and delivery postcode, then follow the diversion options shown for your service. Depending on what the sender selected, you may see safe place, neighbour, or neighbour only. If a household signature was requested, diversion is usually unavailable. See our divert guide for more detail.",
  },
  {
    q: "What can I do if I haven’t received my parcel?",
    a: "If you’re still waiting and it’s been with Evri for over 7 days, let the sender know so they can raise it. Re-check with your 16-digit number or 8-digit calling card on this site. For official UK support call +44 330 808 5456 with your reference ready.",
  },
  {
    q: "Can I collect my parcel?",
    a: "If your parcel is being delivered by your local courier you won’t be able to collect it from a ParcelShop or delivery depot, but your courier will make up to 3 attempts. If you won’t be in, divert to a neighbour or safe place — see our divert guide.",
  },
  {
    q: "I won’t be in at my expected delivery time",
    a: "Divert your parcel during its journey to a neighbour or other safe place so you don’t miss the delivery. Our divert guide explains the steps.",
  },
  {
    q: "How can I change my delivery address?",
    a: "Most retailers manage full address changes — contact your sender first. Otherwise divert to a neighbour’s house or another safe place via tracking options.",
  },
  {
    q: "How do I update delivery instructions for accessibility needs?",
    a: "You can ask your courier to give you extra time at the door, ring the doorbell instead of knocking, or avoid blocking entrances. Set these preferences in Evri’s My Places / app / delivery confirmation link so the courier receives your instructions.",
  },
  {
    q: "What does an Evri tracking number look like?",
    a: "UK Evri parcels usually use a 16-character tracking code. After a missed delivery you can also track with the 8-digit calling card number.",
  },
  {
    q: "How do I track an Evri return?",
    a: "Use the same 16-character tracking code in the tracker on this site. If you used Print in ParcelShop, enter the long number under the printed label.",
  },
  {
    q: "Is tracking on this site real-time?",
    a: "Yes. evritracking looks up your number through Cainiao’s live tracking feed and shows the latest available milestones for that reference.",
  },
  {
    q: "Is everitracking.com affiliated with Evri?",
    a: "No. everitracking.com is an independent tracking information site. We are not Evri Limited. For claims and network-managed diversions, use Evri’s own channels or your retailer. Official UK phone: +44 330 808 5456.",
  },
] as const;
