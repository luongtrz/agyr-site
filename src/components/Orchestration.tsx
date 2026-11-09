import type { ReactNode } from 'react';
import Reveal from './Reveal';
import CopyButton from './CopyButton';
import { REPO_URL } from '../lib/site';

const ORCHESTRATION_CODE = `# Role split: Orchestrator delegates to agy sub-agent
Role: Main session = Reviewer & Architect
Sub-agent: agy = Dedicated Coder

# Run implementation task in isolated worktree
agy-task run \\
  --name "jwt-auth" \\
  --task .agy-sessions/auth.task.txt \\
  --scope "backend/internal/auth" \\
  --model gemini-3.8-flash-high

# agy-run handles 429 rotation automatically:
# - Switches accounts if quota hits limit
# - Resumes exact same conversation
# - Main session reviews git diff afterwards`;

/**
 * Highlights shell commands, comments, and flags with reduced syntax colours.
 */
function highlightCodeLine(line: string, lineIndex: number): ReactNode {
  const trimmed = line.trimStart();

  if (trimmed.startsWith('#')) {
    return (
      <span key={lineIndex} className="text-muted">
        {line}
      </span>
    );
  }

  const tokenRegex =
    /(#[^\n]*)|(--[a-zA-Z0-9-]+)|(\b(?:agyr|agy-task|agy-run|agy|run)\b)|(\b(?:Role|Sub-agent):)/g;

  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      elements.push(line.slice(lastIndex, match.index));
    }

    const [, comment, flag, cmd, role] = match;

    if (comment) {
      elements.push(
        <span key={match.index} className="text-muted">
          {comment}
        </span>,
      );
    } else if (flag) {
      elements.push(
        <span key={match.index} className="text-emerald">
          {flag}
        </span>,
      );
    } else if (cmd || role) {
      elements.push(
        <span key={match.index} className="font-semibold text-ink">
          {cmd || role}
        </span>,
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < line.length) {
    elements.push(line.slice(lastIndex));
  }

  return <span key={lineIndex}>{elements}</span>;
}

export default function Orchestration() {
  return (
    <section id="agent-orchestration" className="py-16 sm:py-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left Column: Heading, intro, flow, features, links */}
            <div className="flex min-w-0 flex-col">
              <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Save Claude and Gemini tokens
              </h2>

              <p className="mt-3 text-base leading-relaxed text-muted">
                <strong className="font-semibold text-ink">agyr</strong> includes a sub-agent
                orchestration skill (
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-ink">
                  skills/agy/
                </code>
                ) built for <strong className="font-semibold text-ink">Claude Code</strong>,{' '}
                <strong className="font-semibold text-ink">Antigravity</strong>, and{' '}
                <strong className="font-semibold text-ink">Gemini</strong> agents.
              </p>

              {/* Flow line */}
              <p className="mt-4 text-sm leading-relaxed text-muted">
                <span className="font-medium text-ink">Claude/Gemini</span> (architect &amp; reviewer)
                <span className="mx-2 text-dim" aria-hidden="true">&rarr;</span>
                <code className="font-mono text-ink">agy-task</code> (dedicated coder)
                <span className="mx-2 text-dim" aria-hidden="true">&rarr;</span>
                <code className="font-mono text-ink">agyr auto</code> (429 rotation)
              </p>

              {/* Feature bullets */}
              <div className="mt-8 space-y-5">
                <div>
                  <h3 className="text-base font-semibold text-ink">
                    Isolated Git worktrees
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted">
                    Every task runs in a dedicated git worktree with scope boundary verification.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-ink">
                    Reviewer &amp; sub-agent coder pattern
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-muted">
                    Claude or Gemini acts as architect and reviewer while local{' '}
                    <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-ink">
                      agy
                    </code>{' '}
                    writes code, saving primary session tokens.
                  </p>
                </div>
              </div>

              {/* Links */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
                <a
                  href={`${REPO_URL}/blob/main/docs/agent-setup.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald underline underline-offset-4 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                >
                  Read Orchestrator Setup Guide
                </a>

                <a
                  href={`${REPO_URL}/blob/main/AGENT.MCP.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald underline underline-offset-4 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                >
                  AGENT.MCP.md Protocol
                </a>

                <a
                  href={`${REPO_URL}/blob/main/docs/reference.md`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald underline underline-offset-4 transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
                >
                  Full Reference
                </a>
              </div>
            </div>

            {/* Right Column: Code block */}
            <div className="w-full min-w-0">
              <div className="rounded-md border border-white/10 bg-terminal overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 bg-surface/50 px-4 py-2 select-none">
                  <span className="font-mono text-xs text-muted">
                    CLAUDE.md / GEMINI.md
                  </span>
                  <CopyButton text={ORCHESTRATION_CODE} className="shrink-0 text-xs" />
                </div>

                <pre className="max-w-full overflow-x-auto p-4 font-mono text-xs sm:text-sm leading-relaxed text-ink">
                  <code>
                    {ORCHESTRATION_CODE.split('\n').map((line, idx) => (
                      <div key={idx} className="min-h-[1.25rem]">
                        {highlightCodeLine(line, idx)}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
