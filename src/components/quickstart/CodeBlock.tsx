import type { ReactNode } from 'react';
import CopyButton from '../CopyButton';
import './quickstart.css';

interface CodeBlockProps {
  /** The code string or ReactNode to display */
  code: string | ReactNode;
  /** Plain-text to copy to clipboard */
  copyText: string;
  /** Terminal title / tab label (e.g. 'bash', defaults to 'bash') */
  label?: string;
  /** Extra CSS classes for outer container */
  className?: string;
  /** Extra CSS classes for pre tag */
  preClassName?: string;
}

/**
 * Highlights shell commands, comments, and flags.
 * Comments: muted
 * Commands: ink
 * Flags: emerald
 */
function highlightCodeLine(line: string, lineIndex: number): ReactNode {
  const trimmed = line.trimStart();

  if (trimmed.startsWith('#')) {
    return (
      <span key={lineIndex} className="text-muted italic whitespace-pre">
        {line}
      </span>
    );
  }

  // Tokenize line: comments, flags, commands
  const tokenRegex =
    /(#[^\n]*)|(--?[a-zA-Z0-9-]+)|(\b(?:agyr|agy-run|agy-task|agy|curl)\b)/g;

  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      elements.push(line.slice(lastIndex, match.index));
    }

    const [, comment, flag, cmd] = match;

    if (comment) {
      elements.push(
        <span key={match.index} className="text-muted italic">
          {comment}
        </span>,
      );
    } else if (flag) {
      elements.push(
        <span key={match.index} className="text-emerald">
          {flag}
        </span>,
      );
    } else if (cmd) {
      elements.push(
        <span key={match.index} className="font-semibold text-ink">
          {cmd}
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

export default function CodeBlock({
  code,
  copyText,
  label = 'bash',
  className = '',
  preClassName = '',
}: CodeBlockProps) {
  return (
    <div
      className={`relative flex flex-col rounded-md border border-white/10 bg-terminal min-w-0 ${className}`}
    >
      {/* Plain header with label on left and copy button on right */}
      <div className="flex items-center justify-between border-b border-white/10 bg-terminal-header px-3.5 py-2 select-none">
        <span className="font-mono text-xs text-muted">
          {label}
        </span>
        <CopyButton
          text={copyText}
          className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald focus-visible:border-emerald focus-visible:text-ink"
        />
      </div>

      {/* Code body with horizontal scroll */}
      <div className="quickstart-code-scroll overflow-x-auto p-3.5 sm:p-4 min-w-0">
        <pre
          className={`font-mono text-xs sm:text-sm leading-relaxed text-ink whitespace-pre ${preClassName}`}
        >
          <code>
            {typeof code === 'string'
              ? code.split('\n').map((line, idx) => (
                  <div key={idx} className="min-h-[1.25rem] whitespace-pre">
                    {highlightCodeLine(line, idx)}
                  </div>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  );
}
