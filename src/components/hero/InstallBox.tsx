import { useState } from 'react';
import CopyButton from '../CopyButton';
import { INSTALL_CMD } from '../../lib/site';

const CLONE_CMD =
  'git clone https://github.com/luongtrz/agyr.git ~/tools/agy-acct && bash ~/tools/agy-acct/install.sh';

export default function InstallBox() {
  const [activeTab, setActiveTab] = useState<'curl' | 'clone'>('curl');

  const currentCmd = activeTab === 'curl' ? INSTALL_CMD : CLONE_CMD;

  return (
    <div className="w-full text-left">
      {/* Install Tabs */}
      <div className="mb-2 flex items-center gap-1.5" role="tablist" aria-label="Installation method">
        <button
          type="button"
          role="tab"
          id="tab-curl"
          aria-selected={activeTab === 'curl'}
          aria-controls="panel-install"
          onClick={() => setActiveTab('curl')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald ${
            activeTab === 'curl'
              ? 'border border-white/10 bg-white/10 text-ink'
              : 'text-dim hover:text-muted'
          }`}
        >
          One-Line Install
        </button>
        <button
          type="button"
          role="tab"
          id="tab-clone"
          aria-selected={activeTab === 'clone'}
          aria-controls="panel-install"
          onClick={() => setActiveTab('clone')}
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald ${
            activeTab === 'clone'
              ? 'border border-white/10 bg-white/10 text-ink'
              : 'text-dim hover:text-muted'
          }`}
        >
          Manual Git Clone
        </button>
      </div>

      {/* Terminal Box */}
      <div
        id="panel-install"
        role="tabpanel"
        aria-labelledby={activeTab === 'curl' ? 'tab-curl' : 'tab-clone'}
        className="rounded-md border border-white/10 bg-terminal"
      >
        <div className="flex items-center justify-between gap-3 p-3 sm:p-3.5">
          <div className="flex min-w-0 flex-1 items-start gap-2 overflow-x-auto py-0.5">
            <span className="font-mono text-dim select-none leading-relaxed sm:leading-normal">$</span>
            <code className="font-mono text-xs sm:text-sm text-ink whitespace-pre-wrap break-all leading-relaxed sm:leading-normal select-all">
              {currentCmd}
            </code>
          </div>

          <div className="shrink-0">
            <CopyButton text={currentCmd} />
          </div>
        </div>
      </div>
    </div>
  );
}
