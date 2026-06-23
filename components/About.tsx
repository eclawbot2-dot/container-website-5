'use client';

import { useLang } from './LanguageProvider';
import { Plate } from './Plate';

export function About() {
  const { t } = useLang();
  return (
    <section id="about" className="border-b border-rule">
      <div className="mx-auto max-w-editorial px-5 py-16 sm:px-8 sm:py-24">
        {/* Section header */}
        <div className="mb-12 grid grid-cols-1 gap-2 sm:grid-cols-12">
          <p className="label text-terracotta sm:col-span-3">{t.about.eyebrow}</p>
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:col-span-9 sm:text-5xl">
            {t.about.title}
          </h2>
        </div>

        {/* Asymmetric editorial grid: framed plates + running text */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Plate
              src="/images/containers.jpg"
              alt="Towering stacks of steel shipping containers"
              caption={t.lineup.eyebrow + ' · Steel'}
              index="02"
              ratio="aspect-[4/5]"
            />
          </div>

          <div className="lg:col-span-7">
            <p className="dropcap font-body text-[1.05rem] leading-[1.85] text-ink-soft">
              {t.about.body[0]}
            </p>
            <p className="mt-6 font-body text-[1.05rem] leading-[1.85] text-ink-soft">
              {t.about.body[1]}
            </p>

            <div className="mt-10 grid grid-cols-1 divide-y divide-rule border-y border-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
              {t.about.stats.map((s) => (
                <div key={s.label} className="py-5 sm:px-5 sm:py-2 sm:first:ps-0">
                  <p className="font-display text-2xl font-semibold leading-tight text-ink">
                    {s.value}
                  </p>
                  <p className="label mt-2 text-ink-soft">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wide gallery strip */}
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          <Plate
            src="/images/port.jpg"
            alt="Working Red Sea container port at the waterfront"
            caption="Red Sea · Port"
            index="03"
            ratio="aspect-[16/10]"
          />
          <Plate
            src="/images/steel.jpg"
            alt="Raw industrial steel and concrete textures"
            caption="Industrial · Raw"
            index="04"
            ratio="aspect-[16/10]"
          />
        </div>
      </div>
    </section>
  );
}
