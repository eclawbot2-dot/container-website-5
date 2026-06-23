'use client';

/**
 * A visible, NON-LINKING call-to-action used wherever the real destination is
 * unknown (tickets, Instagram, contact). Renders as a disabled-looking chip so
 * the site never ships a fabricated/guessed href. Swap in a real <a> once the
 * destination is confirmed.
 */
export function PlaceholderCta({
  label,
  variant = 'solid',
  className = '',
}: {
  label: string;
  variant?: 'solid' | 'outline';
  className?: string;
}) {
  const base =
    'inline-flex min-h-[44px] w-fit cursor-default items-center gap-2 px-6 py-3 font-display text-base select-none';
  const styles =
    variant === 'solid'
      ? 'bg-ink/10 text-ink-soft'
      : 'border border-ink/20 text-ink-soft';
  return (
    <span
      role="note"
      aria-disabled="true"
      title={label}
      className={`${base} ${styles} ${className}`}
    >
      {label}
    </span>
  );
}
