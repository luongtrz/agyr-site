import { SUPPORT_URL, REPO_URL } from '../lib/site';

export default function SupportStrip() {
  return (
    <section id="support" className="border-t border-white/10 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-md border border-white/10 bg-surface p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl font-semibold text-ink">
            Support the project
          </h3>

          <p className="mt-3 text-base leading-relaxed text-muted max-w-2xl">
            agyr is free software licensed under MIT, with zero telemetry and no tracking. If it saves you time avoiding quota lockouts in your coding sessions, donations help maintain continuous updates and testing.
          </p>

          <p className="mt-3 text-sm text-dim">
            Crafted by Trần Lượng (
            <a
              href="https://github.com/luongtrz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink underline"
            >
              @luongtrz
            </a>
            )
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={SUPPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            >
              Support on Ko-fi
            </a>

            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-white/20 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            >
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
