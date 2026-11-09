import { useEffect, useState } from 'react';
import { REPO_URL, SUPPORT_URL } from '../lib/site';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features', id: 'features' },
  { label: 'Live Showcase', href: '#demo', id: 'demo' },
  { label: 'Architecture', href: '#comparison', id: 'comparison' },
  { label: 'Quick Start', href: '#quick-start', id: 'quick-start' },
  { label: 'AI Agents', href: '#agent-orchestration', id: 'agent-orchestration' },
  { label: 'CLI Reference', href: '#cli-reference', id: 'cli-reference' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // IntersectionObserver + scroll listener for active section tracking
  // SSR-safe: runs only on client inside useEffect
  useEffect(() => {
    const TOP_THRESHOLD = 120;

    const handleScroll = () => {
      if (window.scrollY < TOP_THRESHOLD) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (typeof IntersectionObserver === 'undefined') {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const sectionIds = ['hero', ...NAV_ITEMS.map((item) => item.id)];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) {
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < TOP_THRESHOLD) {
          setActiveSection('');
          return;
        }
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id === 'hero' ? '' : id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: 0.05,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header
      id="top"
      className="sticky top-0 z-50 w-full border-b border-white/10 bg-main"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo & Plain Version Text */}
        <a
          href="#top"
          aria-label="agyr home"
          className="flex min-w-0 shrink-0 items-center gap-2.5 text-ink no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-md"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-surface text-emerald">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </span>
          <span className="font-mono text-base font-semibold tracking-tight text-ink">agyr</span>
          <span className="font-mono text-xs text-dim">v1.5</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm ${
                  isActive ? 'font-medium text-emerald' : 'text-muted hover:text-ink'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <span className="h-3.5 w-px bg-white/10" aria-hidden="true" />

          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
          >
            GitHub
          </a>

          <a
            href={SUPPORT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald rounded-sm"
          >
            Support
          </a>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-menu"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-ink transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald lg:hidden"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown Panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="border-b border-white/10 bg-main px-4 pt-3 pb-5 lg:hidden"
        >
          <nav className="flex flex-col gap-1 w-full" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-white/5 font-medium text-emerald'
                      : 'text-muted hover:bg-white/5 hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            <div className="mt-2 flex flex-col gap-1 border-t border-white/10 pt-2">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                GitHub
              </a>

              <a
                href={SUPPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-ink"
              >
                Support
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
