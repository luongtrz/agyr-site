export default function Platforms() {
  return (
    <section id="platforms" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            Native support on Linux and Windows
          </h2>
          <p className="mt-2 text-base text-muted">
            Platform layers handle credential isolation directly on your machine.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {/* Linux Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-ink">Linux backend</h3>
            <ul className="space-y-4 text-base leading-relaxed text-muted">
              <li>
                <strong className="font-semibold text-ink">D-Bus Session Bus Bypass: </strong>
                Disables GNOME Keyring fallback with{' '}
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink break-all">
                  DBUS_SESSION_BUS_ADDRESS=unix:path=/nonexistent
                </code>{' '}
                so{' '}
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
                  agy
                </code>{' '}
                reads swapped tokens cleanly.
              </li>
              <li>
                <strong className="font-semibold text-ink">Parallel Quota Measurement: </strong>
                Spawns parallel probe environments in temporary home dirs via{' '}
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
                  setsid
                </code>{' '}
                without modifying live session tokens.
              </li>
              <li>
                <strong className="font-semibold text-ink">Process Group Termination: </strong>
                Terminates orphaned sub-agent processes and task groups without leaving zombie processes.
              </li>
            </ul>
          </div>

          {/* Windows Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-ink">Windows backend</h3>
            <ul className="space-y-4 text-base leading-relaxed text-muted">
              <li>
                <strong className="font-semibold text-ink">Windows Credential Manager: </strong>
                Directly swaps credentials in{' '}
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
                  gemini:antigravity
                </code>{' '}
                using native PowerShell API wrappers.
              </li>
              <li>
                <strong className="font-semibold text-ink">All Shells Supported: </strong>
                Generates both Git Bash scripts and native Windows{' '}
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
                  .cmd
                </code>{' '}
                wrappers for PowerShell and Command Prompt (CMD).
              </li>
              <li>
                <strong className="font-semibold text-ink">Argument Conversion Guard: </strong>
                Bypasses MSYS path rewrites via{' '}
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink break-all">
                  MSYS2_ARG_CONV_EXCL
                </code>{' '}
                and terminates Windows process trees via{' '}
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
                  taskkill //T //F
                </code>
                .
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
