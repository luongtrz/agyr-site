import './hero/hero.css';
import InstallBox from './hero/InstallBox';
import { REPO_URL } from '../lib/site';

export default function Hero() {
  return (
    <section id="hero" className="relative pt-12 pb-16 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-8 lg:items-center">
          {/* Left Column: Heading, intro, install command, actions */}
          <div className="flex flex-col items-start text-left">
            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl leading-tight">
              Never Hit a <span className="text-emerald">429</span> Quota Wall on Antigravity CLI Again.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
              agyr rotates multiple Google accounts for official agy automatically. Pure Bash swapper with no proxy servers, real-time quota inspection, and conversation resume.
            </p>

            <div className="mt-6 w-full">
              <InstallBox />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#quick-start"
                className="inline-flex items-center justify-center rounded-md bg-emerald px-4 py-2.5 text-sm font-medium text-main transition-colors hover:bg-emerald/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
              >
                Get started
              </a>

              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>

            <p className="mt-3 text-xs text-muted">
              Open source · MIT · Pure Bash · Linux &amp; Windows
            </p>
          </div>

          {/* Right Column: Static Terminal Transcript */}
          <div className="w-full">
            <div className="rounded-md border border-white/10 bg-terminal overflow-hidden">
              <div className="border-b border-white/10 bg-terminal-header px-4 py-2 font-mono text-xs text-dim">
                failover.log
              </div>
              <div className="p-4 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-muted space-y-1.5">
                <div className="text-ink">
                  <span className="text-dim select-none">$ </span>
                  <span>agy-run --add-dir . --prompt &quot;Refactor auth middleware&quot;</span>
                </div>
                <div className="text-dim">
                  [agy-run] running on account &apos;work-1&apos; (model: gemini-3.8-flash-high)
                </div>
                <div className="text-dim">
                  agy: analyzing codebase and editing middleware.go...
                </div>
                <div>
                  <span className="text-dim">[agy-run] </span>
                  <span className="text-danger">429 quota reached on &apos;work-1&apos;</span>{' '}
                  <span className="text-amber">(Resets in 4h13m20s)</span>{' '}
                  <span className="text-dim">— killing agy immediately</span>
                </div>
                <div>
                  <span className="text-dim">[agy-run] cooldown &apos;work-1&apos; set to 4h13m20s; switching to </span>
                  <span className="text-emerald">&apos;work-2&apos;</span>{' '}
                  <span className="text-dim">(weekly limit resets soonest)</span>
                </div>
                <div>
                  <span className="text-dim">[agy-run] resuming conversation 9c4e1a80-bf82-49da-8b29-9e8c45e69e41 on account </span>
                  <span className="text-emerald">&apos;work-2&apos;</span>
                </div>
                <div>
                  <span className="text-dim">[agy-run] done (account </span>
                  <span className="text-emerald">&apos;work-2&apos;</span>
                  <span className="text-dim">) — </span>
                  <span className="text-emerald font-semibold">RESULT=OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Below: Three-item definition list of facts */}
        <div className="mt-12 sm:mt-16 border-t border-white/10 pt-8 sm:pt-10">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
            <div>
              <dt className="font-mono text-sm font-semibold text-ink">No background daemon</dt>
              <dd className="mt-2 text-sm text-muted leading-relaxed">
                Pure Bash CLI script. No persistent background daemons, listening ports, or Node/Go containers.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-sm font-semibold text-ink">Runs official agy binary</dt>
              <dd className="mt-2 text-sm text-muted leading-relaxed">
                Direct execution of the official Antigravity CLI binary with zero binary modifications or MITM proxies.
              </dd>
            </div>
            <div>
              <dt className="font-mono text-sm font-semibold text-ink">Tokens stay local (chmod 600)</dt>
              <dd className="mt-2 text-sm text-muted leading-relaxed">
                OAuth tokens stored on local disk with chmod 600 permissions or native OS Credential Manager.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
