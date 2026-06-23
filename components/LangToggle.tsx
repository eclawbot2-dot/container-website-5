'use client';

import { useLang } from './LanguageProvider';

export function LangToggle({ className = '' }: { className?: string }) {
  const { lang, t, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.langToggle.switchTo}
      title={t.langToggle.switchTo}
      className={`group inline-flex min-h-[44px] items-center gap-2 border border-ink/30 px-3.5 py-1.5 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${className}`}
    >
      <span className="label leading-none" aria-hidden="true">
        {lang === 'en' ? 'EN' : 'ع'}
      </span>
      <span className="h-3 w-px bg-current opacity-40" aria-hidden="true" />
      <span className="font-display text-sm leading-none">
        {t.langToggle.label}
      </span>
    </button>
  );
}
