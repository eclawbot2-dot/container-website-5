// ── Venue config — single place to confirm/swap real values ────────────────
//
// LINK AUDIT POLICY: no fabricated/guessed external links. Where a real
// destination is unknown it is exposed as a clearly-labeled placeholder in the
// UI (no live <a href> to a guessed URL). Swap the value AND flip the matching
// `*_KNOWN` flag to true once a real value is confirmed.

// TODO real IG unknown — no verified Instagram handle for The Container, Jeddah.
// Do NOT guess a handle: a wrong @ links to someone else's account. Until a
// real handle is confirmed the UI shows a non-linked "Instagram — coming soon"
// placeholder instead of a hyperlink.
export const INSTAGRAM_HANDLE = '';
export const INSTAGRAM_KNOWN = false;
// Only constructed/used when INSTAGRAM_KNOWN is true.
export const INSTAGRAM_URL = INSTAGRAM_KNOWN && INSTAGRAM_HANDLE
  ? `https://instagram.com/${INSTAGRAM_HANDLE}`
  : '';

// TODO real ticketing URL unknown — no verified ticket provider/page. Do NOT
// link to Instagram or a guessed ticketer. Until confirmed, the Tickets CTA is
// a visible, non-linking "Tickets — coming soon" placeholder.
export const TICKETS_URL = '';
export const TICKETS_KNOWN = false;

// TODO real mailbox unknown — info@container.jahdev.com has no mailbox
// provisioned, so a mailto: would bounce. Shown as a plain (non-mailto) label
// until a real, monitored address is confirmed.
export const CONTACT_EMAIL = 'info@container.jahdev.com';
export const CONTACT_EMAIL_KNOWN = false;

// Canonical production origin (used for metadata, canonical, OG, sitemap, JSON-LD)
export const SITE_URL = 'https://container5.jahdev.com';
export const VENUE_NAME = 'The Container';

// Venue geo (Al Moulysaa district, Jeddah port, Red Sea coast) — VERIFIED.
export const VENUE_COORDS = { lat: 21.2727, lng: 39.1935 };

// Open the location in Google Maps ("Open in Maps" link) — verified coords.
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${VENUE_COORDS.lat},${VENUE_COORDS.lng}`;

// No-API-key Google Maps embed iframe (reliable, renders live). hl=<active lang>
// is appended at render time so the map UI matches the visitor's language.
export function mapEmbedUrl(lang: 'en' | 'ar' = 'en'): string {
  return `https://www.google.com/maps?q=${VENUE_COORDS.lat},${VENUE_COORDS.lng}&z=15&output=embed&hl=${lang}`;
}

// ── Events ─────────────────────────────────────────────────────────────────
// Bilingual per-event content for the homepage list AND the static
// /events/[slug] detail pages. Facts are verified (artist, date); bios/genre
// are sourced from each artist's public profile. Lineup subject to change.

export type EventItem = {
  id: string;
  dateISO: string; // YYYY-MM-DD — for sorting / datetime attr
  artist: string;
  tba?: boolean;
  // Detail-page fields (omitted on TBA placeholder entries).
  time?: string;          // local door/start, displayed as-is
  genre?: { en: string; ar: string };
  bio?: { en: string; ar: string };
};

export const EVENTS: EventItem[] = [
  {
    id: 'anja-schneider',
    dateISO: '2026-08-21',
    artist: 'Anja Schneider',
    time: '23:00',
    genre: { en: 'House · Techno', ar: 'هاوس · تكنو' },
    bio: {
      en: 'Berlin-based DJ, producer and broadcaster — a long-standing figure in international house and techno, and founder of the SOUS Music label.',
      ar: 'منسّقة أغانٍ ومنتجة ومذيعة مقيمة في برلين — شخصية راسخة في موسيقى الهاوس والتكنو العالمية، ومؤسِّسة شركة SOUS Music للتسجيلات.',
    },
  },
  {
    id: 'cassy',
    dateISO: '2026-09-11',
    artist: 'Cassy',
    time: '23:00',
    genre: { en: 'House · Techno', ar: 'هاوس · تكنو' },
    bio: {
      en: 'Austrian-Greek DJ and producer celebrated for deep, hypnotic house and techno and long, immersive sets; founder of Kwench Records.',
      ar: 'منسّقة أغانٍ ومنتجة نمساوية-يونانية معروفة بموسيقى الهاوس والتكنو العميقة والمنوِّمة وعروضها الطويلة الغامرة؛ مؤسِّسة Kwench Records.',
    },
  },
  { id: 'tba-1', dateISO: '2026-10-16', artist: 'TBA', tba: true },
];

// Lookup helper used by event detail pages.
export function getEvent(slug: string): EventItem | undefined {
  return EVENTS.find((e) => e.id === slug && !e.tba);
}
