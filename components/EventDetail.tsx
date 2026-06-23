'use client';

import { useLang } from './LanguageProvider';
import { formatEventDate } from '@/lib/i18n';
import {
  type EventItem,
  VENUE_NAME,
  MAPS_URL,
  TICKETS_KNOWN,
  TICKETS_URL,
} from '@/lib/config';
import { Plate } from './Plate';
import { PlaceholderCta } from './PlaceholderCta';

/** Editorial event detail page body. `event` is a verified, non-TBA entry. */
export function EventDetail({ event }: { event: EventItem }) {
  const { t, lang } = useLang();
  const dateStr = formatEventDate(event.dateISO, lang);
  const genre = event.genre ? event.genre[lang] : '';
  const bio = event.bio ? event.bio[lang] : '';

  const facts = [
    { label: t.event.dateLabel, value: dateStr },
    event.time ? { label: t.event.timeLabel, value: event.time } : null,
    genre ? { label: t.event.genreLabel, value: genre } : null,
    { label: t.event.venueLabel, value: VENUE_NAME },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-editorial px-5 py-12 sm:px-8 sm:py-16">
        {/* Back link */}
        <a
          href="/#lineup"
          className="label inline-flex min-h-[44px] items-center gap-2 text-ink-soft transition-colors hover:text-terracotta"
        >
          <span aria-hidden="true" className="rtl:rotate-180">
            ←
          </span>
          {t.event.backToEvents}
        </a>

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* Type column */}
          <div className="rise lg:col-span-7">
            <p className="label text-terracotta">{t.lineup.eyebrow}</p>
            <h1 className="mt-4 font-display text-[2.6rem] font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl">
              {event.artist}
            </h1>

            <div className="mt-7 flex max-w-xl items-start gap-4">
              <span className="mt-2 hidden h-px w-12 shrink-0 bg-terracotta sm:block" />
              <p className="font-display text-lg leading-relaxed text-ink-soft sm:text-xl">
                {dateStr}
                {event.time ? ` · ${event.time}` : ''}
              </p>
            </div>

            {/* Fact grid */}
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-rule pt-8 sm:max-w-lg">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="label text-ink-soft">{f.label}</dt>
                  <dd className="mt-1.5 font-display text-lg text-ink">
                    {f.value}
                  </dd>
                </div>
              ))}
              <div className="col-span-2">
                <dt className="label text-ink-soft">
                  {t.event.locationLabel}
                </dt>
                <dd className="mt-1.5 font-body text-[0.97rem] leading-relaxed text-ink-soft">
                  {t.visit.address}
                </dd>
              </div>
            </dl>

            {/* Bio */}
            {bio && (
              <div className="mt-10 border-t border-rule pt-8">
                <p className="label text-terracotta">{t.event.aboutLabel}</p>
                <p className="mt-3 max-w-2xl font-display text-lg leading-relaxed text-ink-soft">
                  {bio}
                </p>
              </div>
            )}

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {TICKETS_KNOWN && TICKETS_URL ? (
                <a
                  href={TICKETS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 bg-ink px-6 py-3 text-paper transition-colors hover:bg-terracotta-deep"
                >
                  <span className="font-display text-base">
                    {t.event.ticketsCta}
                  </span>
                  <span aria-hidden="true" className="rtl:rotate-180">
                    →
                  </span>
                </a>
              ) : (
                <PlaceholderCta
                  label={t.event.ticketsPlaceholder}
                  variant="solid"
                />
              )}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 border border-ink/30 px-6 py-3 text-ink transition-colors hover:border-ink"
              >
                <span className="font-display text-base">
                  {t.event.mapCta}
                </span>
                <span aria-hidden="true" className="rtl:rotate-180">
                  →
                </span>
              </a>
            </div>

            <p className="mt-7 border-s-2 border-terracotta ps-4 font-body text-sm leading-relaxed text-ink-soft">
              {t.event.lineupNote} {t.event.doorsNote}
            </p>
          </div>

          {/* Framed plate */}
          <div className="lg:col-span-5">
            <Plate
              src="/images/decks.jpg"
              alt={`${event.artist} — live electronic music at ${VENUE_NAME}, Jeddah`}
              caption={`${t.lineup.eyebrow} · ${VENUE_NAME}`}
              index={t.event.liveBadge}
              ratio="aspect-[4/5]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
