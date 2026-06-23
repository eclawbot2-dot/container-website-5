'use client';

import { useLang } from './LanguageProvider';
import { formatEventDate } from '@/lib/i18n';
import { EVENTS, TICKETS_KNOWN, TICKETS_URL } from '@/lib/config';
import { Plate } from './Plate';
import { PlaceholderCta } from './PlaceholderCta';

export function Lineup() {
  const { t, lang } = useLang();
  return (
    <section id="lineup" className="border-b border-rule bg-bone/50">
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-12 grid grid-cols-1 gap-2 sm:grid-cols-12">
          <p className="label text-terracotta sm:col-span-3">{t.lineup.eyebrow}</p>
          <div className="sm:col-span-9">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
              {t.lineup.title}
            </h2>
            <p className="mt-3 max-w-2xl font-display text-lg italic text-ink-soft">
              {t.lineup.subtitle}
            </p>
            {TICKETS_KNOWN && TICKETS_URL ? (
              <a
                href={TICKETS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] w-fit items-center gap-2 bg-ink px-6 py-3 text-paper transition-colors hover:bg-terracotta-deep"
              >
                <span className="font-display text-base">
                  {t.lineup.ticketsCta}
                </span>
                <span aria-hidden="true" className="rtl:rotate-180">
                  →
                </span>
              </a>
            ) : (
              <PlaceholderCta
                label={t.lineup.ticketsPlaceholder}
                variant="solid"
                className="mt-6"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* Editorial program list */}
          <ol className="lg:col-span-8">
            {EVENTS.map((ev, i) => {
              const num = String(i + 1).padStart(2, '0');
              return (
                <li
                  key={ev.id}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 border-t border-rule py-7 first:border-t-0 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-8 sm:py-9"
                >
                  <span className="font-display text-sm italic text-terracotta">
                    {num}
                  </span>

                  <div className="col-start-2 sm:col-start-2">
                    <p className="label text-ink-soft">
                      {formatEventDate(ev.dateISO, lang)}
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                      {ev.tba ? (
                        t.lineup.tba
                      ) : (
                        <a
                          href={`/events/${ev.id}/`}
                          className="transition-colors hover:text-terracotta"
                        >
                          {ev.artist}
                        </a>
                      )}
                    </h3>
                  </div>

                  {!ev.tba && (
                    <a
                      href={`/events/${ev.id}/`}
                      className="col-span-2 mt-4 inline-flex min-h-[44px] w-fit items-center gap-2 border-b border-ink/40 pb-0.5 font-display text-base text-ink transition-colors hover:border-terracotta hover:text-terracotta sm:col-span-1 sm:col-start-3 sm:mt-0"
                    >
                      {t.lineup.detailsCta}
                      <span aria-hidden="true" className="rtl:rotate-180">
                        →
                      </span>
                    </a>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Framed plate + note */}
          <div className="lg:col-span-4">
            <Plate
              src="/images/decks.jpg"
              alt="DJ performing at an industrial electronic music event"
              caption={t.lineup.eyebrow + ' · Live'}
              index="05"
              ratio="aspect-[4/5]"
            />
            <p className="mt-6 border-s-2 border-terracotta ps-4 font-body text-sm leading-relaxed text-ink-soft">
              {t.lineup.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
