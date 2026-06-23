import Image from 'next/image';

/** Gallery-style framed image plate with an editorial caption. */
export function Plate({
  src,
  alt,
  caption,
  index,
  priority = false,
  className = '',
  ratio = 'aspect-[4/5]',
}: {
  src: string;
  alt: string;
  caption: string;
  index?: string;
  priority?: boolean;
  className?: string;
  ratio?: string;
}) {
  return (
    <figure className={`plate ${className}`}>
      <div className={`relative ${ratio} overflow-hidden`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
        />
      </div>
      <figcaption className="flex items-baseline justify-between gap-3">
        <span>{caption}</span>
        {index && (
          <span className="font-display italic text-terracotta">{index}</span>
        )}
      </figcaption>
    </figure>
  );
}
