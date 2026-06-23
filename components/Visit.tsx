'use client';

import Image from 'next/image';
import { useLang } from './LanguageProvider';
import { MAPS_URL, STATIC_MAP_URL } from '@/lib/config';

export function Visit() {
  const { t } = useLang();
  const blocks = [
    { title: t.visit.addressTitle, body: t.visit.address },
    { title: t.visit.gettingThereTitle, body: t.visit.gettingThere },
    { title: t.visit.hoursTitle, body: t.visit.hours },
    { title: t.visit.entryTitle, body: t.visit.entry },
  ];
  return (
    <section id="visit" className="border-b border-rule">
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-12 grid grid-cols-1 gap-2 sm:grid-cols-12">
          <p className="label text-terracotta sm:col-span-3">{t.visit.eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:col-span-9 sm:text-5xl">
            {t.visit.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          {/* Info column */}
          <dl className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-6">
            {blocks.map((b) => (
              <div key={b.title}>
                <dt className="label text-ink">{b.title}</dt>
                <dd className="mt-2.5 font-body text-[0.97rem] leading-relaxed text-ink-soft">
                  {b.body}
                </dd>
              </div>
            ))}
            <div className="sm:col-span-2">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-ink px-6 py-3 text-paper transition-colors hover:bg-terracotta-deep"
              >
                <span className="font-display text-base">{t.visit.mapCta}</span>
                <span aria-hidden="true" className="rtl:rotate-180">
                  →
                </span>
              </a>
            </div>
          </dl>

          {/* Map plate */}
          <figure className="plate lg:col-span-6">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-bone">
                <Image
                  src={STATIC_MAP_URL}
                  alt="Map of The Container at Shams Container Terminal, Jeddah"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                />
              </div>
            </a>
            <figcaption className="flex items-baseline justify-between gap-3">
              <span>Al Moulysaa · Jeddah Port</span>
              <span className="font-display italic text-terracotta">
                21.27° N · 39.19° E
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
