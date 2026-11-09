import type { ReactNode } from 'react';
import { SUPPORT_URL, REPO_URL } from '../lib/site';
import './rest/rest.css';

interface FaqItemData {
  id: string;
  question: string;
  answer: ReactNode;
}

const FAQ_ITEMS: FaqItemData[] = [
  {
    id: 'faq-1',
    question: 'Can Google ban my accounts for using agyr?',
    answer: (
      <p>
        No. Unlike proxy routers (which route traffic through custom servers with forged headers and cloud IPs),{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
          agyr
        </code>{' '}
        is a local authentication swapper. It runs Google&apos;s official{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
          agy
        </code>{' '}
        binary directly on your machine. To Google&apos;s servers, it looks identical to logging in and
        out of different accounts manually.
      </p>
    ),
  },
  {
    id: 'faq-2',
    question: 'How does agy-run maintain conversation context after hitting a 429?',
    answer: (
      <p>
        When a 429 quota exhaustion is detected,{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
          agy-run
        </code>{' '}
        terminates the session, marks that slot on cooldown, switches the active token file to the
        best available account, and launches{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
          agy --conversation &lt;existing-conversation-id&gt;
        </code>
        . Because Antigravity&apos;s conversation history is stored on disk or server session, the new account resumes
        the same context without re-reading files.
      </p>
    ),
  },
  {
    id: 'faq-3',
    question: 'What happens if all my saved accounts run out of quota simultaneously?',
    answer: (
      <p>
        If the entire account pool is on cooldown,{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
          agyr
        </code>{' '}
        and{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
          agy-run
        </code>{' '}
        exit with code <strong className="font-semibold text-ink">5</strong> (or code{' '}
        <strong className="font-semibold text-ink">3</strong> for interactive rotate) and display the earliest
        reset time in your local timezone (e.g.{' '}
        <span className="text-ink/80">&quot;all accounts on cooldown, earliest reset in 48m at 05:15 PM&quot;</span>). It does not
        loop or burn tokens.
      </p>
    ),
  },
  {
    id: 'faq-4',
    question: 'Does agyr work with Claude Code or Gemini CLI agents?',
    answer: (
      <p>
        Yes. The repository ships with{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
          skills/agy/
        </code>
        , which lets Claude Code, Antigravity, and Gemini act as orchestrators and reviewers while delegating repetitive
        coding tasks to{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs sm:text-sm text-ink">
          agy-task
        </code>{' '}
        in isolated git worktrees.
      </p>
    ),
  },
  {
    id: 'faq-5',
    question: 'Is agyr completely free? How can I support independent development?',
    answer: (
      <p>
        Yes. <strong className="font-semibold text-ink">agyr is free and open-source</strong> under the MIT
        license with no commercial tiers, no paywalls, and no telemetry. If agyr saves you hours of coding
        downtime, starring the project on{' '}
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald underline hover:text-emerald-400"
        >
          GitHub
        </a>{' '}
        or buying a coffee on{' '}
        <a
          href={SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald underline hover:text-emerald-400"
        >
          Ko-fi
        </a>{' '}
        helps fund continuous maintenance, testing harnesses, and new features.
      </p>
    ),
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink">
            Frequently asked questions
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {FAQ_ITEMS.map((item, idx) => (
            <details
              key={item.id}
              id={item.id}
              open={idx === 0 ? true : undefined}
              className="group py-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base sm:text-lg font-semibold text-ink rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <svg
                  className="h-4 w-4 shrink-0 text-dim transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div className="pt-3 text-base leading-relaxed text-muted">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
