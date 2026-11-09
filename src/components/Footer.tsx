import { REPO_URL, SUPPORT_URL } from '../lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-main py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand info */}
          <div className="flex flex-col gap-3">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-ink transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-surface text-emerald">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </span>
              <span className="font-mono text-base font-semibold tracking-tight text-ink">agyr</span>
            </a>

            <p className="text-sm leading-relaxed text-dim break-words">
              Automatic account rotation and quota monitoring for the Antigravity CLI (
              <code className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-mono text-xs text-ink/80">
                agy
              </code>
              ). Pure Bash, local execution, zero proxy overhead.
            </p>
          </div>

          {/* Column 2: Project Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-ink">Project</h4>
            <ul className="space-y-2 text-sm text-dim">
              <li>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Releases &amp; Changelog
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  MIT License
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Documentation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-ink">Documentation</h4>
            <ul className="space-y-2 text-sm text-dim">
              <li>
                <a
                  href={`${REPO_URL}/blob/main/README.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  README Quickstart
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/blob/main/docs/reference.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Full Technical Reference
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/blob/main/docs/agent-setup.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  AI Agent Orchestrator Setup
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/blob/main/AGENT.MCP.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  AGENT.MCP.md Protocol
                </a>
              </li>
              <li>
                <a
                  href="/fix-antigravity-cli-429-quota/"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Fix Antigravity CLI 429 errors
                </a>
              </li>
              <li>
                <a
                  href="/use-multiple-google-accounts-with-antigravity-cli/"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Use multiple Google accounts
                </a>
              </li>
              <li>
                <a
                  href="/agyr-vs-proxy-routers/"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  agyr vs proxy routers
                </a>
              </li>
              <li>
                <a
                  href="/agyr-on-windows/"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Use agyr on Windows
                </a>
              </li>
              <li>
                <a
                  href="/agyr-environment-variables-and-limitations/"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Environment variables and limits
                </a>
              </li>
              <li>
                <a
                  href="/agy-task-with-claude-code/"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  agy-task with Claude Code
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Community Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-ink">Community</h4>
            <ul className="space-y-2 text-sm text-dim">
              <li>
                <a
                  href={`${REPO_URL}/stargazers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Star on GitHub
                </a>
              </li>
              <li>
                <a
                  href={`${REPO_URL}/forks`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Fork Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/luongtrz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Author Profile (@luongtrz)
                </a>
              </li>
              <li>
                <a
                  href={SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
                >
                  Support on Ko-fi
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-dim sm:flex-row sm:items-center sm:flex-wrap">
          <p className="break-words">© 2026 Trần Lượng. Released under the MIT License.</p>
          <p className="break-words sm:text-right">
            Antigravity CLI (
            <code className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-mono text-[11px] text-ink/80">
              agy
            </code>
            ) and Gemini are trademarks of Google LLC.{' '}
            <code className="rounded border border-white/10 bg-white/5 px-1 py-0.5 font-mono text-[11px] text-ink/80">
              agyr
            </code>{' '}
            is an independent open-source tool.
          </p>
        </div>
      </div>
    </footer>
  );
}
