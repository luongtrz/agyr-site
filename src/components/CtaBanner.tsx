import { REPO_URL, INSTALL_CMD } from '../lib/site';
import CopyButton from './CopyButton';

export default function CtaBanner() {
  return (
    <section id="get-started" className="border-t border-white/10 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-md border border-white/10 bg-surface p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-ink">
            Install agyr in one command
          </h2>
          <p className="mt-2 text-base leading-relaxed text-muted max-w-2xl">
            Run the installer script to configure automatic account rotation for the Antigravity CLI.
          </p>

          <div className="mt-6 max-w-2xl">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-md border border-white/10 bg-terminal p-3 sm:px-4 sm:py-3">
              <div className="flex min-w-0 flex-1 items-start sm:items-center gap-2.5 py-1">
                <span className="shrink-0 select-none font-mono text-sm font-semibold text-emerald">$</span>
                <code className="min-w-0 font-mono text-xs sm:text-sm text-ink break-all whitespace-pre-wrap">
                  {INSTALL_CMD}
                </code>
              </div>
              <CopyButton text={INSTALL_CMD} className="shrink-0 self-end sm:self-auto" />
            </div>
          </div>

          <div className="mt-6">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
            >
              <span>View repository on GitHub</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
