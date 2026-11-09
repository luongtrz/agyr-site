import { useState, useMemo } from 'react';
import { COMMANDS, type CommandCategory } from './rest/commandsData';

function CopyIconButton({ text, syntax }: { text: string; syntax: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy command: ${syntax}`}
      title={copied ? 'Copied' : `Copy ${syntax}`}
      className="relative inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border border-white/10 bg-white/5 text-dim transition hover:border-emerald/40 hover:bg-white/10 hover:text-ink focus:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald sm:opacity-0 sm:group-hover:opacity-100"
    >
      {copied ? (
        <svg
          className="h-3.5 w-3.5 text-emerald"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied && (
        <span
          role="status"
          className="absolute -top-7 right-0 rounded border border-emerald/30 bg-surface px-1.5 py-0.5 text-[10px] font-medium text-emerald shadow whitespace-nowrap"
        >
          Copied
        </span>
      )}
    </button>
  );
}

const CATEGORIES: Array<{ id: CommandCategory; label: string }> = [
  { id: 'daily', label: 'Account Management' },
  { id: 'quota', label: 'Quota & Utilities' },
  { id: 'auto', label: 'Automation & AI' },
];

const CATEGORY_TABS: Array<{ id: 'all' | CommandCategory; label: string }> = [
  { id: 'all', label: 'All Commands' },
  ...CATEGORIES,
];

export default function CommandReference() {
  const [activeCategory, setActiveCategory] = useState<'all' | CommandCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const groupedCategories = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return CATEGORIES.map((cat) => {
      if (activeCategory !== 'all' && activeCategory !== cat.id) {
        return { ...cat, commands: [] };
      }

      const commands = COMMANDS.filter((cmd) => {
        if (!cmd.categories.includes(cat.id)) return false;
        if (!query) return true;

        const inSyntax = cmd.syntax.toLowerCase().includes(query);
        const inLabel = cmd.categoryLabel.toLowerCase().includes(query);
        const inCopy = cmd.copyText.toLowerCase().includes(query);
        return inSyntax || inLabel || inCopy;
      });

      return { ...cat, commands };
    }).filter((group) => group.commands.length > 0);
  }, [activeCategory, searchQuery]);

  const totalVisibleCount = useMemo(() => {
    return groupedCategories.reduce((sum, g) => sum + g.commands.length, 0);
  }, [groupedCategories]);

  return (
    <section id="cli-reference" className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Command Reference
          </h2>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted">
            Commands and switches supported by{' '}
            <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
              agyr
            </code>
            ,{' '}
            <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
              agy-run
            </code>
            , and{' '}
            <code className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-ink whitespace-nowrap">
              agy-task
            </code>
            .
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div
            className="flex items-center gap-6 overflow-x-auto border-b border-white/10"
            role="tablist"
            aria-label="Filter command categories"
          >
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls="command-reference-list"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`-mb-px shrink-0 border-b-2 pb-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald ${
                    isActive
                      ? 'border-emerald text-ink'
                      : 'border-transparent text-muted hover:border-white/20 hover:text-ink'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 md:w-72">
            <label htmlFor="command-search" className="sr-only">
              Search commands
            </label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-dim">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              id="command-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search commands..."
              className="w-full rounded-md border border-white/10 bg-terminal py-1.5 pl-9 pr-8 text-sm text-ink placeholder:text-dim focus:border-emerald focus:outline-none focus:ring-1 focus:ring-emerald"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-dim hover:text-ink focus-visible:outline-none focus-visible:text-ink"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* SR Live region for count */}
        <div className="sr-only" aria-live="polite">
          {totalVisibleCount} commands shown
        </div>

        {/* Command List or Empty State */}
        {groupedCategories.length > 0 ? (
          <div id="command-reference-list" className="space-y-10">
            {groupedCategories.map((group) => (
              <div key={group.id} className="space-y-3">
                <h3 className="text-sm font-semibold text-ink">
                  {group.label}
                </h3>
                <dl className="divide-y divide-white/10 border-y border-white/10">
                  {group.commands.map((cmd) => (
                    <div
                      key={cmd.id}
                      className="group flex flex-col gap-1.5 py-3.5 transition-colors hover:bg-white/[0.02] sm:grid sm:grid-cols-[16rem_1fr] sm:items-baseline sm:gap-6 md:grid-cols-[18rem_1fr]"
                    >
                      <dt className="flex items-center justify-between gap-3 sm:justify-start">
                        <code className="font-mono text-sm font-medium text-ink break-all sm:break-normal">
                          {cmd.syntax}
                        </code>
                        <CopyIconButton text={cmd.copyText} syntax={cmd.syntax} />
                      </dt>
                      <dd className="text-sm leading-relaxed text-muted sm:text-base">
                        {cmd.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-white/10 bg-surface/50 px-4 py-12 text-center">
            <svg
              className="mx-auto mb-3 h-8 w-8 text-dim"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-base font-medium text-ink">No commands match your query.</p>
            <p className="mt-1 text-sm text-dim">
              Try searching for &quot;claude&quot;, &quot;rotate&quot;, or &quot;swapui&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 rounded-md border border-emerald/40 bg-emerald/10 px-3.5 py-1.5 text-xs font-medium text-emerald transition hover:bg-emerald/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
