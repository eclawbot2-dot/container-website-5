'use client';

import { useLang } from './LanguageProvider';
import { LangToggle } from './LangToggle';

export function Header() {
  const { t } = useLang();
  const nav = [
    { href: '#about', label: t.nav.about },
    { href: '#lineup', label: t.nav.lineup },
    { href: '#visit', label: t.nav.visit },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-editorial items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          {t.hero.title === 'THE CONTAINER' ? 'The Container' : t.hero.title}
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="label text-ink-soft transition-colors hover:text-terracotta"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <LangToggle />
      </div>
    </header>
  );
}
