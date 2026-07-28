'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Calendar, LayoutDashboard, LogOut } from 'lucide-react';
import AppointmentModal from './AppointmentModal';

const SECTION_IDS = ['about', 'research', 'publications', 'projects'];

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'research', label: 'Research' },
  { id: 'publications', label: 'Publications' },
  { id: 'projects', label: 'Projects' },
];

const Header = () => {
  const { isLogin, isLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [active, setActive] = useState('about');
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      let current = active;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && window.pageYOffset >= el.offsetTop - 200) current = id;
      }
      if (current !== active) setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome, active]);

  const handleLogout = useCallback(() => {
    logout();
    window.location.reload();
  }, [logout]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--editorial-border)] bg-[var(--editorial-header-bg)] backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-4 md:px-6">
          <Link
            href="/"
            className="font-serif text-lg font-bold text-[var(--editorial-ink)]"
          >
            Shahan Ahmed
          </Link>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <Link
                  key={item.id}
                  href={isHome ? `#${item.id}` : `/#${item.id}`}
                  className={`border-b pb-1 font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                    isActive
                      ? 'border-[var(--editorial-ink)] text-[var(--editorial-ink)]'
                      : 'border-transparent text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/blog"
              className={`font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                pathname.startsWith('/blog')
                  ? 'text-[var(--editorial-ink)]'
                  : 'text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className={`font-sans text-xs font-semibold uppercase tracking-[0.1em] transition-colors ${
                pathname.startsWith('/contact')
                  ? 'text-[var(--editorial-ink)]'
                  : 'text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]'
              }`}
            >
              Contact
            </Link>

            {!isLoading && isLogin ? (
              <div className="flex items-center gap-x-4 border-l border-[var(--editorial-border)] pl-5">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[var(--editorial-muted)] transition-colors hover:text-[var(--editorial-ink)]"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-[var(--editorial-muted)] transition-colors hover:text-[var(--editorial-ink)]"
                >
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : null}

            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="rounded-full border border-[var(--editorial-border)] px-3.5 py-1 font-sans text-xs font-semibold uppercase tracking-[0.05em] text-[var(--editorial-ink)] transition-colors hover:border-[var(--editorial-ink)]"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </nav>
      </header>

      <div className="fixed bottom-8 right-8 z-50 group">
        <button
          onClick={() => setAppointmentModalOpen(true)}
          aria-label="Talk to Me"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--editorial-ink)] text-[var(--editorial-bg)] transition-transform duration-200 hover:scale-110"
        >
          <Calendar size={20} />
        </button>
        <span className="absolute bottom-2 right-14 whitespace-nowrap rounded-lg border border-[var(--editorial-border)] bg-[var(--editorial-card)] px-2.5 py-1.5 font-sans text-xs font-medium text-[var(--editorial-ink)] opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
          Talk to Me
        </span>
      </div>

      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />
    </>
  );
};

export default Header;
