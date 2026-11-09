import Reveal from './Reveal';
import { InlineCode } from './features/InlineCode';
import { ComparisonTable } from './features/ComparisonTable';

export default function Comparison() {
  return (
    <section id="comparison" className="py-20 md:py-28 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
              Native CLI swapper vs proxy routers
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted leading-relaxed">
              How proxy architectures (like <InlineCode>9router</InlineCode> or MITM daemons) differ
              from a local swapper like <InlineCode>agyr</InlineCode>, which rotates accounts at the
              process level.{' '}
              <a
                href="/agyr-vs-proxy-routers/"
                className="text-emerald underline underline-offset-4 hover:opacity-80"
              >
                Read the detailed comparison
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <ComparisonTable />
        </Reveal>
      </div>
    </section>
  );
}
