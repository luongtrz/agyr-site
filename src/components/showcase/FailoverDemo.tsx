import { useState, useEffect, useRef, useCallback } from 'react';
import TerminalChrome from './TerminalChrome';
import { FAILOVER_COMMAND, FAILOVER_TERMINAL_TEXT } from './showcaseData';
import { useTypewriter } from '../../hooks/useTypewriter';

export default function FailoverDemo({ isActive = true }: { isActive?: boolean }) {
  // Start with 7 so SSR pre-renders complete content
  const [visibleStep, setVisibleStep] = useState<number>(7);
  const [isReplaying, setIsReplaying] = useState(false);
  const timersRef = useRef<number[]>([]);

  const { displayedText, isTyping } = useTypewriter(FAILOVER_COMMAND, {
    start: isActive,
    speed: 18,
  });

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  }, []);

  const playAnimation = useCallback(() => {
    clearAllTimers();

    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      setVisibleStep(7);
      return;
    }

    setVisibleStep(0);

    const stepDelays = [
      { step: 1, delay: 300 },
      { step: 2, delay: 1000 },
      { step: 3, delay: 1800 },
      { step: 4, delay: 2600 },
      { step: 5, delay: 3400 },
      { step: 6, delay: 4200 },
      { step: 7, delay: 4800 },
    ];

    stepDelays.forEach(({ step, delay }) => {
      const id = window.setTimeout(() => {
        setVisibleStep(step);
      }, delay);
      timersRef.current.push(id);
    });
  }, [clearAllTimers]);

  useEffect(() => {
    if (isActive) {
      playAnimation();
    } else {
      clearAllTimers();
      setVisibleStep(7);
    }
    return () => {
      clearAllTimers();
    };
  }, [isActive, playAnimation, clearAllTimers]);

  const handleReplay = () => {
    setIsReplaying(true);
    window.setTimeout(() => setIsReplaying(false), 750);
    playAnimation();
  };

  let statusPillText = 'FAILOVER READY';

  if (visibleStep >= 6) {
    statusPillText = 'RESUME OK · 0 TOKENS LOST';
  } else if (visibleStep >= 5) {
    statusPillText = 'CONTEXT RESUMED (9c4e1a80)';
  } else if (visibleStep >= 4) {
    statusPillText = 'FAILOVER: WORK-1 to WORK-2';
  } else if (visibleStep >= 3) {
    statusPillText = '429 QUOTA WALL HIT';
  }

  const failoverTools = (
    <button
      type="button"
      onClick={handleReplay}
      aria-label="Replay failover sequence"
      className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-200 transition hover:border-emerald/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald"
    >
      <svg
        className={`h-3.5 w-3.5 ${isReplaying ? 'replaying-icon' : ''}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
      <span>Replay Flow</span>
    </button>
  );

  return (
    <TerminalChrome
      title="agy-run — Autonomous 429 Quota Failover & Session Resume"
      shell="daemon"
      statusPillText={statusPillText}
      tools={failoverTools}
      copyText={FAILOVER_TERMINAL_TEXT}
    >
      <div className="space-y-1.5 font-mono text-xs leading-relaxed sm:text-sm">
        {/* Command line */}
        <div className="flex flex-wrap items-center whitespace-pre-wrap break-words">
          <span className="font-semibold text-emerald">user@devbox</span>
          <span className="text-dim">:</span>
          <span className="text-dim">~/projects/auth-svc</span>
          <span className="text-dim">$ </span>
          <span className="ml-1.5 font-medium text-white whitespace-pre-wrap break-words">{displayedText}</span>
          {isTyping && (
            <span className="ml-0.5 inline-block text-emerald" aria-hidden="true">
              ▋
            </span>
          )}
        </div>

        {/* Step 1: Initial slot run */}
        <div
          className={`whitespace-pre-wrap break-words ${
            visibleStep >= 1 ? 'block' : 'hidden'
          }`}
        >
          <span className="font-semibold text-slate-300">[agy-run]</span>{' '}
          <span className="text-slate-300">running on account </span>
          <span className="font-semibold text-amber">'work-1'</span>{' '}
          <span className="text-dim">(model: gemini-3.8-flash-high)</span>
        </div>

        {/* Step 2: agy running */}
        <div
          className={`whitespace-pre-wrap break-words ${
            visibleStep >= 2 ? 'block' : 'hidden'
          }`}
        >
          <span className="text-dim">agy: analyzing codebase and editing middleware.go...</span>
        </div>

        {/* Step 3: 429 Hit */}
        <div
          className={`whitespace-pre-wrap break-words ${
            visibleStep >= 3
              ? 'term-line-429 px-2 py-0.5'
              : 'hidden'
          }`}
        >
          <span className="font-semibold text-slate-300">[agy-run]</span>{' '}
          <span className="font-semibold text-danger">429 quota reached on 'work-1'</span>{' '}
          <span className="font-semibold text-amber">(Resets in 4h13m20s)</span>{' '}
          <span className="text-dim">— killing agy immediately</span>
        </div>

        {/* Step 4: Cooldown & Switch */}
        <div
          className={`whitespace-pre-wrap break-words ${
            visibleStep >= 4
              ? 'term-line-switch px-2 py-0.5'
              : 'hidden'
          }`}
        >
          <span className="font-semibold text-slate-300">[agy-run]</span>{' '}
          <span className="text-slate-300">cooldown 'work-1' set to 4h13m20s; switching to </span>
          <span className="font-semibold text-emerald">'work-2'</span>{' '}
          <span className="text-dim">(weekly limit resets soonest)</span>
        </div>

        {/* Step 5: Resume session */}
        <div
          className={`whitespace-pre-wrap break-words ${
            visibleStep >= 5 ? 'block' : 'hidden'
          }`}
        >
          <span className="font-semibold text-slate-300">[agy-run]</span>{' '}
          <span className="text-slate-300">resuming conversation </span>
          <span className="font-mono text-slate-200">9c4e1a80-bf82-49da-8b29-9e8c45e69e41</span>{' '}
          <span className="text-slate-300">on account </span>
          <span className="font-semibold text-emerald">'work-2'</span>
        </div>

        {/* Step 6: Victory OK */}
        <div
          className={`whitespace-pre-wrap break-words ${
            visibleStep >= 6
              ? 'term-line-ok px-2 py-0.5'
              : 'hidden'
          }`}
        >
          <span className="font-semibold text-slate-300">[agy-run]</span>{' '}
          <span className="text-slate-300">done (account </span>
          <span className="font-semibold text-emerald">'work-2'</span>
          <span className="text-slate-300">) — </span>
          <span className="font-bold text-emerald">RESULT=OK</span>
        </div>

        {/* Step 7: Completed Prompt */}
        <div
          className={`whitespace-pre-wrap break-words pt-1 ${
            visibleStep >= 7 ? 'block' : 'hidden'
          }`}
        >
          <span className="font-semibold text-emerald">user@devbox</span>
          <span className="text-dim">:</span>
          <span className="text-dim">~/projects/auth-svc</span>
          <span className="text-dim">$ </span>
          <span className="ml-1 inline-block text-emerald" aria-hidden="true">
            ▋
          </span>
        </div>
      </div>
    </TerminalChrome>
  );
}
