import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { LanguageProvider } from '@/components/LanguageProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EventDetail } from '@/components/EventDetail';
import {
  EVENTS,
  getEvent,
  SITE_URL,
  VENUE_NAME,
  VENUE_COORDS,
} from '@/lib/config';

// Pre-render one static page per verified (non-TBA) event into `out`.
export function generateStaticParams() {
  return EVENTS.filter((e) => !e.tba).map((e) => ({ slug: e.id }));
}

export const dynamicParams = false;

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const event = getEvent(params.slug);
  if (!event) return {};
  const title = `${event.artist} — ${VENUE_NAME}, Jeddah`;
  const description = event.bio?.en
    ? `${event.artist} at ${VENUE_NAME}, Shams Container Terminal, Jeddah. ${event.bio.en}`
    : `${event.artist} at ${VENUE_NAME}, Jeddah.`;
  const url = `${SITE_URL}/events/${event.id}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      siteName: VENUE_NAME,
      title,
      description,
      url,
      locale: 'en_US',
      alternateLocale: ['ar_SA'],
      images: [
        {
          url: '/images/decks.jpg',
          width: 1200,
          height: 1500,
          alt: `${event.artist} performing at ${VENUE_NAME}, Jeddah`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/decks.jpg'],
    },
  };
}

// JSON-LD MusicEvent for this single show (Jeddah is UTC+3, no DST).
function eventJsonLd(slug: string) {
  const event = getEvent(slug);
  if (!event) return null;
  const start = event.time
    ? `${event.dateISO}T${event.time}:00+03:00`
    : `${event.dateISO}T20:00:00+03:00`;
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: `${event.artist} at ${VENUE_NAME}`,
    startDate: start,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    description: event.bio?.en,
    image: `${SITE_URL}/images/decks.jpg`,
    url: `${SITE_URL}/events/${event.id}/`,
    performer: { '@type': 'PerformingGroup', name: event.artist },
    location: {
      '@type': 'MusicVenue',
      name: VENUE_NAME,
      address: {
        '@type': 'PostalAddress',
        streetAddress:
          'Shams Container Terminal, Al Moulysaa district, Jeddah port area',
        addressLocality: 'Jeddah',
        addressRegion: 'Makkah Province',
        addressCountry: 'SA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: VENUE_COORDS.lat,
        longitude: VENUE_COORDS.lng,
      },
    },
    organizer: { '@type': 'Organization', name: VENUE_NAME, url: SITE_URL },
  };
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug);
  if (!event) notFound();
  const jsonLd = eventJsonLd(params.slug);

  return (
    <LanguageProvider>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      )}
      <Header />
      <main>
        <EventDetail event={event} />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
