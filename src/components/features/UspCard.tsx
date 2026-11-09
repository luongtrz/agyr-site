import type { UspItem } from './types';

interface UspCardProps {
  item: UspItem;
}

export function UspCard({ item }: UspCardProps) {
  return (
    <div className="pt-6 border-t border-white/10 first:border-t-0 first:pt-0 md:border-t-0 md:pt-0">
      <h3 className="text-lg font-semibold text-ink">
        {item.title}
      </h3>
      <p className="mt-3 text-base text-muted leading-relaxed">
        {item.description}
      </p>
      <ul className="mt-4 space-y-2.5 text-base text-slate-300">
        {item.points.map((point, index) => (
          <li key={index} className="flex items-start gap-2.5 leading-relaxed">
            <span className="text-emerald font-mono shrink-0 select-none" aria-hidden="true">
              –
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
