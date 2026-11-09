import type { ReactNode } from 'react';
import CopyButton from '../CopyButton';

export interface TerminalChromeProps {
  title: string;
  shell?: string;
  statusPillText?: string;
  statusPillVariant?: 'emerald' | 'danger' | 'amber' | 'violet';
  haloColor?: string;
  tools?: ReactNode;
  children: ReactNode;
  copyText?: string;
}

export default function TerminalChrome({
  title,
  shell,
  statusPillText,
  tools,
  children,
  copyText,
}: TerminalChromeProps) {
  return (
    <div className="relative w-full max-w-full overflow-hidden rounded-md border border-white/10 bg-[#090d16] transition-colors duration-200 hover:border-white/20">
      {/* Terminal Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 bg-[#121826] px-3.5 py-2.5 sm:px-4 sm:py-2.5">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <span className="font-mono text-xs font-medium text-slate-200 break-words">{title}</span>
          {shell && (
            <span className="shrink-0 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-dim">
              {shell}
            </span>
          )}
        </div>

        <div className="flex max-w-full flex-wrap items-center gap-2.5">
          {statusPillText && (
            <span className="font-mono text-xs text-dim shrink-0">
              {statusPillText}
            </span>
          )}
          {tools}
          {copyText && (
            <CopyButton
              text={copyText}
              className="font-mono text-xs tracking-tight shrink-0"
            />
          )}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="overflow-x-auto bg-[#070b13] p-3 font-mono text-xs leading-relaxed text-slate-200 sm:p-5 sm:text-sm">
        {children}
      </div>
    </div>
  );
}
