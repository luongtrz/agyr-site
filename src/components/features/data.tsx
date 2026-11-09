import { InlineCode } from './InlineCode';
import type { ComparisonRow, UspItem } from './types';

export const uspItems: UspItem[] = [
  {
    id: 'privacy-first',
    title: '100% Local & Privacy-First',
    description: (
      <>
        Your OAuth tokens stay strictly on your local filesystem under strict permissions (
        <InlineCode>chmod 600</InlineCode>) or native Windows Credential Manager. Zero third-party
        telemetry, zero external servers.
      </>
    ),
    points: [
      <>
        Tokens stored in <InlineCode>~/.gemini/antigravity-cli/accounts/</InlineCode>
      </>,
      'Atomic file writes & cross-platform file locking',
      <>
        Windows Credential Manager (<InlineCode>gemini:antigravity</InlineCode>) support
      </>,
    ],
  },
  {
    id: 'zero-ban-risk',
    title: 'Zero-Ban Risk Architecture',
    description: (
      <>
        Unlike reverse-proxy tools that get flagged by Google for datacenter IPs and forged TLS
        signatures, <InlineCode>agyr</InlineCode> directly invokes the official{' '}
        <InlineCode>agy</InlineCode> binary from your machine.
      </>
    ),
    points: [
      'Authentic Google CLI binary & TLS/HTTP2 fingerprints',
      'Clean D-Bus keyring isolation without binary modification',
      'Zero proxy daemons listening on local network ports',
    ],
  },
  {
    id: 'smart-scheduling',
    title: 'Smart Scheduling & 429 Failover',
    description: (
      <>
        <InlineCode>agyr</InlineCode> tracks Google quota windows dynamically, selecting replacement
        accounts based on weekly expiration and bottleneck heuristics.
      </>
    ),
    points: [
      <>
        Bottleneck-aware account sorting (<InlineCode>min(Gemini 5h, Week)</InlineCode>)
      </>,
      'Tie-breaking prioritizing accounts resetting soonest',
      <>
        Automatic <InlineCode>--conversation</InlineCode> context handover
      </>,
    ],
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    id: 'execution-architecture',
    title: 'Execution Architecture',
    subtitle: 'How requests are transmitted to Google',
    agyr: {
      description: (
        <>
          Direct local CLI execution via official <InlineCode>agy</InlineCode> binary. No proxy
          middleman.
        </>
      ),
    },
    proxy: {
      description:
        'Local or remote reverse HTTP/SOCKS proxy daemon intercepting HTTP traffic.',
    },
  },
  {
    id: 'ban-risk',
    title: 'Account Ban Risk',
    subtitle: 'Google anti-harvesting detection',
    agyr: {
      description:
        'Authentic Google CLI binary, real client TLS fingerprints, and genuine residential IP.',
    },
    proxy: {
      description:
        'Fake TLS fingerprints, cloud/datacenter IP blacklists, and abnormal API call sequences.',
    },
  },
  {
    id: 'privacy',
    title: 'Credential Privacy',
    subtitle: 'Token storage and handling',
    agyr: {
      description: (
        <>
          OAuth tokens remain <InlineCode>chmod 600</InlineCode> on disk or OS Credential Manager.
          Never read or sent anywhere.
        </>
      ),
    },
    proxy: {
      description:
        'Tokens must be decrypted or stored in proxy daemon memory, vulnerable to leakage.',
    },
  },
  {
    id: 'cli-updates',
    title: 'Antigravity CLI Updates',
    subtitle: 'Google upstream compatibility',
    agyr: {
      description: (
        <>
          Compatible with latest <InlineCode>agy</InlineCode> releases immediately upon updating.
        </>
      ),
    },
    proxy: {
      description:
        'Can break when Google updates backend protobufs, SSE protocols, or header signatures.',
    },
  },
  {
    id: 'failover',
    title: '429 Failover & Session Resume',
    subtitle: 'Context retention during long tasks',
    agyr: {
      description: (
        <>
          Transfers <InlineCode>--conversation &lt;id&gt;</InlineCode> immediately to next account.
          Zero prompt token waste.
        </>
      ),
    },
    proxy: {
      description:
        'May drop the connection abruptly or require a full prompt replay.',
    },
  },
  {
    id: 'resource-overhead',
    title: 'System Resource Overhead',
    subtitle: 'RAM & background CPU footprint',
    agyr: {
      description: 'Lightweight Bash script with no background process when idle.',
    },
    proxy: {
      description: 'Runs as a Node.js, Go, or Docker process in the background.',
    },
  },
  {
    id: 'os-support',
    title: 'Operating System Support',
    subtitle: 'Cross-platform integration',
    agyr: {
      description: (
        <>
          Linux (D-Bus keyring isolation) &amp; Windows (Credential Manager +{' '}
          <InlineCode>.cmd</InlineCode> wrappers).
        </>
      ),
    },
    proxy: {
      description: 'Often requires loopback adapters, certificates, or Docker networking.',
    },
  },
];
