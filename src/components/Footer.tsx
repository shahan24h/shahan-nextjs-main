'use client';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[var(--editorial-border)] bg-[var(--editorial-bg)]">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-between gap-4 px-5 py-12 opacity-80 md:flex-row md:px-6">
        <p className="font-sans text-sm text-[var(--editorial-muted)]">
          &copy; {currentYear} Shahan Ahmed. All rights reserved.
        </p>
        <div className="flex gap-x-6 font-sans text-xs font-semibold uppercase tracking-[0.05em]">
          <a
            href="https://scholar.google.com/citations?hl=en&user=ROqm-4EAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--editorial-muted)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--editorial-ink)] hover:decoration-current"
          >
            Google Scholar
          </a>
          <a
            href="https://github.com/shahan24h"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--editorial-muted)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--editorial-ink)] hover:decoration-current"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shahan24h/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--editorial-muted)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--editorial-ink)] hover:decoration-current"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
