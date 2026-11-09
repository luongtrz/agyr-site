import type { ReactNode } from 'react';

export type CommandCategory = 'daily' | 'quota' | 'auto';

export interface CommandItem {
  id: string;
  syntax: string;
  copyText: string;
  categories: CommandCategory[];
  categoryLabel: string;
  description: ReactNode;
}

export const COMMANDS: CommandItem[] = [
  {
    id: 'cmd-list',
    syntax: 'agyr list',
    copyText: 'agyr list',
    categories: ['daily'],
    categoryLabel: 'Account Management',
    description: (
      <>
        Inspect real-time quota across all accounts in parallel. Colors indicate percentage health: green (&gt;40%), yellow (11–40%), red (≤10%).
      </>
    ),
  },
  {
    id: 'cmd-use',
    syntax: 'agyr use <name>',
    copyText: 'agyr use',
    categories: ['daily'],
    categoryLabel: 'Account Management',
    description: (
      <>
        Switch the active interactive account to{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
          &lt;name&gt;
        </code>
        . Swaps tokens atomically with backup safeguards.
      </>
    ),
  },
  {
    id: 'cmd-save',
    syntax: 'agyr save <name>',
    copyText: 'agyr save',
    categories: ['daily'],
    categoryLabel: 'Account Management',
    description: (
      <>
        Saves the current active interactive login into a named slot in{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink break-keep [word-break:keep-all]">
          ~/.gemini/antigravity-cli/accounts/
        </code>
        .
      </>
    ),
  },
  {
    id: 'cmd-swapui',
    syntax: 'agyr swapui <n1> <n2>',
    copyText: 'agyr swapui',
    categories: ['daily'],
    categoryLabel: 'Account Management',
    description: (
      <>
        Swaps the display row order of two accounts in{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
          agyr list
        </code>{' '}
        without affecting rotation heuristics. Use{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
          --reset
        </code>{' '}
        to revert.
      </>
    ),
  },
  {
    id: 'cmd-forget',
    syntax: 'agyr forget [-f]',
    copyText: 'agyr forget',
    categories: ['daily'],
    categoryLabel: 'Account Management',
    description: (
      <>
        Drops the local active login to sign in to another account. Refuses if unsaved unless{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
          -f
        </code>{' '}
        is passed.
      </>
    ),
  },
  {
    id: 'cmd-del',
    syntax: 'agyr del <name>',
    copyText: 'agyr del',
    categories: ['daily'],
    categoryLabel: 'Account Management',
    description: (
      <>
        Permanently deletes a saved slot token and associated quota/cooldown state. (Alias:{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
          agyr rm
        </code>
        ).
      </>
    ),
  },
  {
    id: 'cmd-list-claude',
    syntax: 'agyr list --claude',
    copyText: 'agyr list --claude',
    categories: ['quota'],
    categoryLabel: 'Quota & Utilities',
    description: (
      <>
        Includes Claude 5-hour and Claude weekly limit columns (and GPT if supported) alongside Gemini and Argon quotas.
      </>
    ),
  },
  {
    id: 'cmd-list-c',
    syntax: 'agyr list -c',
    copyText: 'agyr list -c',
    categories: ['quota'],
    categoryLabel: 'Quota & Utilities',
    description: (
      <>
        Reads cached quota from local state without invoking the{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
          agy
        </code>{' '}
        binary.
      </>
    ),
  },
  {
    id: 'cmd-list-w',
    syntax: 'agyr list -w',
    copyText: 'agyr list -w',
    categories: ['quota'],
    categoryLabel: 'Quota & Utilities',
    description: (
      <>
        Wide format: prevents collapsing optional model columns (Argon, Claude) on narrow terminal windows.
      </>
    ),
  },
  {
    id: 'cmd-test',
    syntax: 'agyr test [name...]',
    copyText: 'agyr test',
    categories: ['quota'],
    categoryLabel: 'Quota & Utilities',
    description: (
      <>
        Sends probe requests to accounts to initialize rolling 5-hour quota windows concurrently.
      </>
    ),
  },
  {
    id: 'cmd-rotate',
    syntax: 'agyr rotate [cooldown]',
    copyText: 'agyr rotate',
    categories: ['auto'],
    categoryLabel: 'Automation & AI',
    description: (
      <>
        When interactive{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
          agy
        </code>{' '}
        runs out of quota, marks current account in cooldown and switches to the next ready account.
      </>
    ),
  },
  {
    id: 'cmd-agy-run',
    syntax: 'agy-run --prompt "..."',
    copyText: 'agy-run',
    categories: ['auto'],
    categoryLabel: 'Automation & AI',
    description: (
      <>
        Runs headless{' '}
        <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
          agy
        </code>{' '}
        tasks with automated 429 failover. Terminates process on 429 errors, rotates accounts, and resumes session.
      </>
    ),
  },
  {
    id: 'cmd-agy-task',
    syntax: 'agy-task run --name ...',
    copyText: 'agy-task run',
    categories: ['auto'],
    categoryLabel: 'Automation & AI',
    description: (
      <>
        Orchestrates sub-agent coding tasks inside dedicated git worktrees with strict scope enforcement and compact exit summaries.
      </>
    ),
  },
];
