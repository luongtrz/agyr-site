import { useState } from 'react';
import SectionHeading from './SectionHeading';
import Reveal from './Reveal';
import { useInView } from '../hooks/useInView';
import QuotaDashboard from './showcase/QuotaDashboard';
import FailoverDemo from './showcase/FailoverDemo';
import type { ShowcaseTab } from './showcase/types';
import './showcase/showcase.css';

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>('list');
  const [sectionRef, inView] = useInView<HTMLElement>(0.15);

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Interactive Terminal"
            title="Built for Serious Antigravity Power Users"
            subtitle="Switch between the live multi-account quota monitor and autonomous 429 auto-failover engine."
          />
        </Reveal>

        {/* Showcase Navigation Tabs (plain text tabs with active underline) */}
        <div
          role="tablist"
          aria-label="Interactive Terminal Demos"
          className="mb-6 flex flex-wrap items-center justify-start gap-6 border-b border-white/10"
        >
          {/* Tab 1: Quota Dashboard */}
          <button
            type="button"
            role="tab"
            id="tab-showcase-list"
            aria-selected={activeTab === 'list'}
            aria-controls="panel-showcase-list"
            onClick={() => setActiveTab('list')}
            className={`-mb-px pb-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald ${
              activeTab === 'list'
                ? 'border-b-2 border-emerald font-semibold text-white'
                : 'border-b-2 border-transparent text-dim hover:text-slate-300'
            }`}
          >
            Quota Dashboard (
            <code className="font-mono text-xs whitespace-nowrap">
              agyr list
            </code>
            )
          </button>

          {/* Tab 2: Autonomous 429 Failover */}
          <button
            type="button"
            role="tab"
            id="tab-showcase-rotate"
            aria-selected={activeTab === 'rotate'}
            aria-controls="panel-showcase-rotate"
            onClick={() => setActiveTab('rotate')}
            className={`-mb-px pb-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald ${
              activeTab === 'rotate'
                ? 'border-b-2 border-emerald font-semibold text-white'
                : 'border-b-2 border-transparent text-dim hover:text-slate-300'
            }`}
          >
            Failover Engine (
            <code className="font-mono text-xs whitespace-nowrap">
              agy-run
            </code>
            )
          </button>
        </div>

        {/* Tab Panels */}
        <div className="relative">
          <div
            role="tabpanel"
            id="panel-showcase-list"
            aria-labelledby="tab-showcase-list"
            className={activeTab === 'list' ? 'block' : 'hidden'}
          >
            <QuotaDashboard isActive={inView && activeTab === 'list'} />
          </div>

          <div
            role="tabpanel"
            id="panel-showcase-rotate"
            aria-labelledby="tab-showcase-rotate"
            className={activeTab === 'rotate' ? 'block' : 'hidden'}
          >
            <FailoverDemo isActive={inView && activeTab === 'rotate'} />
          </div>
        </div>

        {/* Zero Context Loss Note */}
        <p className="mt-4 text-sm leading-relaxed text-dim sm:text-base">
          <strong className="font-semibold text-slate-200">Zero context loss:</strong>{' '}
          When a 429 occurs,{' '}
          <code className="whitespace-nowrap rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-slate-200 sm:text-sm">
            agy-run
          </code>{' '}
          extracts the reset countdown, switches slots, and passes{' '}
          <code className="whitespace-nowrap rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-xs text-slate-200 sm:text-sm">
            --conversation &lt;id&gt;
          </code>{' '}
          so the replacement account continues immediately without reprocessing earlier tokens.{' '}
          <a
            href="/fix-antigravity-cli-429-quota/"
            className="text-emerald underline underline-offset-4 hover:opacity-80"
          >
            How to fix 429 quota errors
          </a>
          .
        </p>
      </div>
    </section>
  );
}
