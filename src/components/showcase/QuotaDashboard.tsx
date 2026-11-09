import { useState } from 'react';
import TerminalChrome from './TerminalChrome';
import {
  ACCOUNTS_DATA,
  getQuotaLevel,
  generateDashboardText,
} from './showcaseData';
import type { DashboardViewMode, QuotaEntry, AccountStatus } from './types';
import { useTypewriter } from '../../hooks/useTypewriter';

function QuotaCell({ entry }: { entry: QuotaEntry }) {
  if (entry.percentage === null) {
    return <span className="text-dim">-</span>;
  }

  const level = getQuotaLevel(entry.percentage);
  const colorClass =
    level === 'green'
      ? 'text-emerald'
      : level === 'yellow'
        ? 'text-amber'
        : 'text-danger';

  return (
    <div className="flex flex-col items-start gap-0.5">
      <span
        className={`quota-pct-badge font-semibold ${colorClass}`}
        style={{ '--q-w': `${entry.percentage}%` } as React.CSSProperties}
      >
        <span>{entry.percentage}%</span>
      </span>
      {entry.resetTime && (
        <span className="text-[10px] leading-tight text-dim whitespace-nowrap">
          {entry.resetTime}
        </span>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: AccountStatus }) {
  const isReady = status.type === 'ready';
  const isLow = status.type === 'low';
  const colorClass = isReady
    ? 'text-emerald'
    : isLow
      ? 'text-amber'
      : 'text-danger';
  const dotClass = isReady
    ? 'bg-emerald'
    : isLow
      ? 'bg-amber'
      : 'bg-danger';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium ${colorClass}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} />
      <span className="whitespace-nowrap">{status.label}</span>
    </span>
  );
}

export default function QuotaDashboard({ isActive = true }: { isActive?: boolean }) {
  const [viewMode, setViewMode] = useState<DashboardViewMode>('standard');
  const targetCmd = viewMode === 'claude' ? 'agyr list --claude' : 'agyr list';

  const { displayedText, isTyping } = useTypewriter(targetCmd, {
    start: isActive,
    speed: 20,
  });

  const viewTools = (
    <div className="inline-flex max-w-full flex-wrap items-center gap-1 rounded border border-white/10 bg-white/[0.04] p-0.5">
      <button
        type="button"
        onClick={() => setViewMode('standard')}
        className={`rounded px-2.5 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald ${
          viewMode === 'standard'
            ? 'bg-white/10 text-white'
            : 'text-dim hover:text-white'
        }`}
        aria-pressed={viewMode === 'standard'}
      >
        Standard (<code className="font-mono text-[11px] whitespace-nowrap">agyr list</code>)
      </button>
      <button
        type="button"
        onClick={() => setViewMode('claude')}
        className={`rounded px-2.5 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald ${
          viewMode === 'claude'
            ? 'bg-white/10 text-white'
            : 'text-dim hover:text-white'
        }`}
        aria-pressed={viewMode === 'claude'}
      >
        Extended (<code className="font-mono text-[11px] whitespace-nowrap">agyr list --claude</code>)
      </button>
    </div>
  );

  return (
    <TerminalChrome
      title="agyr list — Google Account Quota Monitor"
      shell="bash"
      statusPillText="5 accounts monitored"
      tools={viewTools}
      copyText={generateDashboardText(viewMode)}
    >
      {/* Command Prompt */}
      <div className="mb-3 flex flex-wrap items-center font-mono text-xs sm:text-sm">
        <span className="font-semibold text-emerald">user@devbox</span>
        <span className="text-dim">:</span>
        <span className="text-dim">~/projects</span>
        <span className="text-dim">$ </span>
        <span className="ml-1.5 font-medium text-white whitespace-pre-wrap">{displayedText}</span>
        {isTyping && (
          <span className="ml-0.5 inline-block text-emerald" aria-hidden="true">
            ▋
          </span>
        )}
      </div>

      {/* Semantic Table inside responsive horizontal scroll container */}
      <div className="my-2 overflow-x-auto rounded border border-white/10 bg-[#070b13]">
        <table className="w-full min-w-[560px] border-collapse font-mono text-xs text-left leading-relaxed">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03] text-slate-300">
              <th
                scope="col"
                className="border-r border-white/10 px-3 py-2 font-semibold tracking-wider text-[11px]"
              >
                ACCOUNT
              </th>
              <th
                scope="col"
                className="border-r border-white/10 px-3 py-2 font-semibold tracking-wider text-[11px]"
              >
                GEMINI 5H
              </th>
              <th
                scope="col"
                className="border-r border-white/10 px-3 py-2 font-semibold tracking-wider text-[11px]"
              >
                GEMINI WEEK
              </th>
              {viewMode === 'standard' ? (
                <th
                  scope="col"
                  className="border-r border-white/10 px-3 py-2 font-semibold tracking-wider text-[11px]"
                >
                  ARGON WEEK
                </th>
              ) : (
                <>
                  <th
                    scope="col"
                    className="border-r border-white/10 px-3 py-2 font-semibold tracking-wider text-[11px]"
                  >
                    CLAUDE 5H
                  </th>
                  <th
                    scope="col"
                    className="border-r border-white/10 px-3 py-2 font-semibold tracking-wider text-[11px]"
                  >
                    CLAUDE WEEK
                  </th>
                </>
              )}
              <th
                scope="col"
                className="px-3 py-2 font-semibold tracking-wider text-[11px]"
              >
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {ACCOUNTS_DATA.map((row, index) => (
              <tr
                key={row.id}
                className={`${
                  row.isActive
                    ? 'bg-white/[0.04]'
                    : index % 2 === 1
                      ? 'bg-white/[0.015]'
                      : 'bg-transparent'
                } hover:bg-white/[0.04] transition-colors`}
              >
                <td className="border-r border-white/5 px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    {row.isActive ? (
                      <span className="mr-1.5 font-bold text-emerald" aria-hidden="true">
                        *
                      </span>
                    ) : (
                      <span className="mr-1.5 inline-block w-2 text-transparent" aria-hidden="true">
                        {' '}
                      </span>
                    )}
                    <span className={row.isActive ? 'font-medium text-white' : 'text-slate-300'}>
                      {row.name}
                    </span>
                  </div>
                </td>

                <td className="border-r border-white/5 px-3 py-2 whitespace-nowrap">
                  <QuotaCell entry={row.gemini5h} />
                </td>

                <td className="border-r border-white/5 px-3 py-2 whitespace-nowrap">
                  <QuotaCell entry={row.geminiWeek} />
                </td>

                {viewMode === 'standard' ? (
                  <td className="border-r border-white/5 px-3 py-2 whitespace-nowrap">
                    <QuotaCell entry={row.argonWeek} />
                  </td>
                ) : (
                  <>
                    <td className="border-r border-white/5 px-3 py-2 whitespace-nowrap">
                      <QuotaCell entry={row.claude5h} />
                    </td>
                    <td className="border-r border-white/5 px-3 py-2 whitespace-nowrap">
                      <QuotaCell entry={row.claudeWeek} />
                    </td>
                  </>
                )}

                <td className="px-3 py-2 whitespace-nowrap">
                  <StatusBadge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 text-xs text-dim break-words">
        Measured in parallel across 5 accounts in 12s · (* = selected account)
      </div>
    </TerminalChrome>
  );
}
