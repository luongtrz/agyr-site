import type { ReactNode } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import CodeBlock from './quickstart/CodeBlock';

interface StepItem {
  number: string;
  title: string;
  description: ReactNode;
  code: string;
  copyText: string;
}

const STEPS: StepItem[] = [
  {
    number: '1.',
    title: 'Sign in and save Account #1',
    description: (
      <>
        Launch{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-ink">
          agyr
        </code>{' '}
        to trigger Google OAuth login in your browser, then save the active session into slot{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-ink">
          acc1
        </code>.
      </>
    ),
    code: "# Opens browser for account 1\nagyr\n\n# Save credentials into slot 'acc1'\nagyr save acc1",
    copyText: 'agyr\nagyr save acc1',
  },
  {
    number: '2.',
    title: 'Add Account #2 (and more)',
    description: (
      <>
        Use{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-ink">
          agyr forget
        </code>{' '}
        to clear local active tokens without revoking stored slots, then sign in with your next
        Google account.
      </>
    ),
    code: '# Clears active login (acc1 is safe)\nagyr forget\n\n# Sign in to account 2 in browser\nagyr\nagyr save acc2',
    copyText: 'agyr forget\nagyr\nagyr save acc2',
  },
  {
    number: '3.',
    title: 'Inspect quota status',
    description: (
      <>
        Query all configured accounts in parallel to inspect 5-hour and weekly percentages with
        status indicators.
      </>
    ),
    code: '# Multi-account status dashboard\nagyr list\n\n# Or read cached values\nagyr list -c',
    copyText: 'agyr list',
  },
  {
    number: '4.',
    title: 'Run automated tasks with 429 failover',
    description: (
      <>
        Use{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-ink">
          agy-run
        </code>{' '}
        for automated coding tasks. If an account hits a rate limit, it switches slots and continues.
      </>
    ),
    code: '# Automated execution with 429 failover\nagy-run --add-dir . \\\n  --prompt "Refactor database queries and add indexes"',
    copyText: 'agy-run --add-dir . --prompt "Refactor database queries and add indexes"',
  },
];

export default function QuickStart() {
  return (
    <section id="quick-start" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Quick Start"
            title="Get started in four steps"
            subtitle={
              <>
                Add accounts once through browser OAuth.{' '}
                <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-sm text-ink">
                  agyr
                </code>{' '}
                manages stored credentials across sessions.
              </>
            }
          />
        </Reveal>

        <ol className="max-w-3xl mt-12 space-y-10 sm:mt-16 sm:space-y-12">
          {STEPS.map((step, idx) => (
            <li
              key={step.number}
              className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0 min-w-0"
            >
              <Reveal delay={idx * 50}>
                <div className="flex flex-col gap-2.5 min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-base font-semibold text-emerald sm:text-lg select-none">
                      {step.number}
                    </span>
                    <h3 className="text-lg font-semibold text-ink sm:text-xl">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-base leading-relaxed text-muted max-w-2xl">
                    {step.description}
                  </p>

                  <div className="mt-2 w-full min-w-0">
                    <CodeBlock
                      code={step.code}
                      copyText={step.copyText}
                    />
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
