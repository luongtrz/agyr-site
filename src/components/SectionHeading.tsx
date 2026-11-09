import type { ReactNode } from 'react';

export default function SectionHeading({
  title,
  subtitle,
  className = '',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-10 text-left ${className}`.trim()}>
      <h2 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </div>
  );
}
