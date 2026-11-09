import Reveal from './Reveal';
import { uspItems } from './features/data';
import { UspCard } from './features/UspCard';

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
              Why agyr
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
              Engineered specifically for the official Google Antigravity CLI. Direct process invocation, local credentials, and bottleneck-aware scheduling.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-white/10 pt-8">
          {uspItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 80}>
              <UspCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
