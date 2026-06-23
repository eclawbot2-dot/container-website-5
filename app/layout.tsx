import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, Amiri, Cairo } from 'next/font/google';
import { SITE_URL, VENUE_NAME, VENUE_COORDS, EVENTS, INSTAGRAM_URL } from '@/lib/config';
import './globals.css';

// Editorial serif display (Latin) + clean grotesk body
const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

// Elegant Arabic serif/naskh display + clean Arabic body
const arDisplay = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-ar-display',
  display: 'swap',
});

const arBody = Cairo({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-ar-body',
  display: 'swap',
});

const TITLE = 'The Container — Jeddah · Red Sea Port';
const DESCRIPTION =
  "Jeddah's industrial techno & house venue on the Red Sea port. Licensed live electronic-music events at Shams Container Terminal — Anja Schneider, Cassy and more.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: VENUE_NAME,
  keywords: [
    'The Container',
    'Jeddah techno',
    'Jeddah house music',
    'Red Sea venue',
    'Shams Container Terminal',
    'electronic music Saudi Arabia',
    'Anja Schneider Jeddah',
    'Cassy Jeddah',
  ],
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    type: 'website',
    siteName: VENUE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/`,
    locale: 'en_US',
    alternateLocale: ['ar_SA'],
    images: [
      {
        url: '/images/hero.jpg',
        width: 900,
        height: 1200,
        alt: 'Crowd under confetti and stage lights at The Container festival, Jeddah',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/hero.jpg'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.svg' }],
    shortcut: ['/icon.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1714',
};

// JSON-LD: MusicVenue + upcoming named Events (location + performer).
function structuredData() {
  const venue = {
    '@context': 'https://schema.org',
    '@type': 'MusicVenue',
    name: VENUE_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/images/hero.jpg`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Shams Container Terminal, Al Moulysaa district, Jeddah port area',
      addressLocality: 'Jeddah',
      addressRegion: 'Makkah Province',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: VENUE_COORDS.lat,
      longitude: VENUE_COORDS.lng,
    },
    sameAs: [INSTAGRAM_URL],
  };

  // Jeddah is UTC+3 (no DST); emit a full datetime for Google Event eligibility.
  const events = EVENTS.filter((e) => !e.tba).map((e) => ({
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `${e.artist} at ${VENUE_NAME}`,
    startDate: `${e.dateISO}T20:00:00+03:00`,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: `${SITE_URL}/images/hero.jpg`,
    url: SITE_URL,
    performer: { '@type': 'PerformingGroup', name: e.artist },
    location: {
      '@type': 'MusicVenue',
      name: VENUE_NAME,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Jeddah',
        addressCountry: 'SA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: VENUE_COORDS.lat,
        longitude: VENUE_COORDS.lng,
      },
    },
    organizer: { '@type': 'Organization', name: VENUE_NAME, url: SITE_URL },
  }));

  return [venue, ...events];
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Default to EN/LTR; ContainerApp updates lang/dir on the client from localStorage.
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${display.variable} ${body.variable} ${arDisplay.variable} ${arBody.variable}`}
    >
      <head>
        {/* Set lang/dir before paint to avoid a FOUC for returning Arabic visitors. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var l=localStorage.getItem('container5.lang');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}}catch(e){}})();",
          }}
        />
        {/* Structured data: MusicVenue + upcoming MusicEvents */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            // Escape "<" so a stray "</script>" in any value can't break out of the tag.
            __html: JSON.stringify(structuredData()).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="grain min-h-screen antialiased">{children}</body>
    </html>
  );
}
