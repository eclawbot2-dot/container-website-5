'use client';

import { useLang } from './LanguageProvider';
import {
  INSTAGRAM_KNOWN,
  INSTAGRAM_URL,
  INSTAGRAM_HANDLE,
  CONTACT_EMAIL,
  CONTACT_EMAIL_KNOWN,
} from '@/lib/config';

export function Footer() {
  const { t } = useLang();
  // Build-time year (static export). Renders identically on server and client except
  // across a New Year boundary on the visitor's clock — acceptable for a marketing footer.
  const year = new Date().getFullYear();
  const brand = t.hero.title === 'THE CONTAINER' ? 'The Container' : t.hero.title;
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-editorial px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <p className="font-display text-2xl font-semibold tracking-tight">
              {brand}
            </p>
            <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-bone/70">
              {t.footer.tagline}
            </p>
          </div>

          <div className="sm:col-span-3">
            <p className="label text-bone/50">{t.footer.follow}</p>
            {INSTAGRAM_KNOWN && INSTAGRAM_URL ? (
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block font-display text-lg text-bone transition-colors hover:text-terracotta"
              >
                @{INSTAGRAM_HANDLE}
              </a>
            ) : (
              // No verified IG handle — non-linking placeholder, not a guess.
              <span className="mt-3 inline-block font-display text-lg text-bone/60">
                {t.links.igPlaceholder}
              </span>
            )}
          </div>

          <div className="sm:col-span-3">
            <p className="label text-bone/50">{t.footer.contact}</p>
            {CONTACT_EMAIL_KNOWN ? (
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 inline-block font-display text-lg text-bone transition-colors hover:text-terracotta"
              >
                {CONTACT_EMAIL}
              </a>
            ) : (
              // No mailbox provisioned — show the address as a plain label, no
              // mailto: (which would bounce).
              <span className="mt-3 inline-block font-display text-lg text-bone/60">
                {CONTACT_EMAIL}
              </span>
            )}
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-bone/15" />

        <div className="mt-6 flex flex-col gap-2 text-bone/55 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body text-xs">{t.footer.eventsNote}</p>
          <p className="font-body text-xs">
            © {year} {brand}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
