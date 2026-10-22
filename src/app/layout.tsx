import type { Metadata, Viewport } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTopWrapper from "@/components/ScrollToTopWrapper";
import WebVitalsTracker from "@/components/WebVitalsTracker";
import { BRAND, IMAGES, SITE_ORIGIN } from "@/lib/siteConfig";

const display = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0072BC",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: "evritracking | Track Evri Parcels & Deliveries",
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "evri tracking",
    "evri tracking number",
    "track evri parcel",
    "evri calling card",
    "divert evri parcel",
    "evri parcel tracking uk",
  ],
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: IMAGES.favicon, type: "image/jpeg", sizes: "192x192" },
      { url: IMAGES.logo, type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: IMAGES.favicon, sizes: "180x180" }],
  },
  verification: {
    google: "8a7c21f6e90a89ef",
  },
  alternates: {
    canonical: SITE_ORIGIN,
  },
  openGraph: {
    title: "evritracking | Track Evri Parcels & Deliveries",
    description: BRAND.description,
    url: SITE_ORIGIN,
    siteName: BRAND.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: `${SITE_ORIGIN}${IMAGES.og}`,
        width: 1024,
        height: 576,
        alt: `${BRAND.name} — track Evri parcels and UK deliveries`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "evritracking | Track Evri Parcels & Deliveries",
    description: BRAND.description,
    creator: BRAND.twitter,
    images: [`${SITE_ORIGIN}${IMAGES.twitter}`],
  },
  applicationName: BRAND.name,
  category: "Logistics",
  classification: "Package Tracking Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="icon" href={IMAGES.favicon} type="image/jpeg" sizes="192x192" />
        <link rel="apple-touch-icon" href={IMAGES.favicon} sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        {adsenseClient && (
          <>
            <link rel="preconnect" href="https://pagead2.googlesyndication.com" crossOrigin="anonymous" />
            <Script
              id="adsense"
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
              crossOrigin="anonymous"
              strategy="lazyOnload"
            />
          </>
        )}
        {typeof process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID === "string" &&
          process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID &&
          !/^G-XXXXXXXXXX$/i.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
                strategy="lazyOnload"
              />
              <Script id="google-analytics" strategy="lazyOnload">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true,
                  transport_type: 'beacon'
                });
              `}
              </Script>
            </>
          )}
      </head>
      <body className={`${body.className} antialiased bg-paper text-ink min-h-screen flex flex-col`} suppressHydrationWarning>
        <Header />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <ScrollToTopWrapper />
        <WebVitalsTracker />

        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: BRAND.name,
              url: SITE_ORIGIN,
              logo: `${SITE_ORIGIN}${IMAGES.logo}`,
              email: BRAND.email,
              description: BRAND.description,
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: BRAND.name,
              url: SITE_ORIGIN,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_ORIGIN}/?tracking_number={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
