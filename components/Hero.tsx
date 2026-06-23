'use client';

import Image from 'next/image';
import { useLang } from './LanguageProvider';
import { INSTAGRAM_KNOWN, INSTAGRAM_URL } from '@/lib/config';

export function Hero() {
  const { t } = useLang();
  return (
    <section id="top" className="relative border-b border-rule">
      <div className="mx-auto max-w-editorial px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-8 py-14 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
          {/* Editorial type column */}
          <div className="rise lg:col-span-7 lg:pr-6 rtl:lg:pl-6 rtl:lg:pr-0">
            <p className="label text-terracotta">{t.hero.kicker}</p>
            <h1 className="mt-5 font-display text-[2.7rem] font-semibold leading-[0.96] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </h1>
            <div className="mt-7 flex max-w-xl items-start gap-4">
              <span className="mt-2 hidden h-px w-12 shrink-0 bg-terracotta sm:block" />
              <p className="font-display text-lg leading-relaxed text-ink-soft sm:text-xl">
                {t.hero.tagline}
              </p>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#lineup"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-paper transition-colors hover:bg-terracotta-deep"
              >
                <span className="font-display text-base">{t.hero.cta}</span>
                <span aria-hidden="true" className="rtl:rotate-180">
                  →
                </span>
              </a>
              {INSTAGRAM_KNOWN && INSTAGRAM_URL ? (
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-ink/30 px-6 py-3 text-ink transition-colors hover:border-ink"
                >
                  <InstagramGlyph />
                  <span className="font-display text-base">
                    {t.hero.instagram}
                  </span>
                </a>
              ) : (
                // No verified IG handle yet — non-linking placeholder, not a guess.
                <span
                  role="note"
                  aria-disabled="true"
                  className="inline-flex cursor-default select-none items-center gap-2 border border-ink/20 px-6 py-3 text-ink-soft"
                >
                  <InstagramGlyph />
                  <span className="font-display text-base">
                    {t.links.igPlaceholder}
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Framed hero plate */}
          <figure className="rise plate lg:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="/images/hero.jpg"
                alt="Crowd under confetti and stage lights at The Container festival, Jeddah"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <figcaption className="flex items-baseline justify-between gap-3">
              <span>{t.about.eyebrow} · Jeddah</span>
              <span className="font-display italic text-terracotta">01</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function InstagramGlyph() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
