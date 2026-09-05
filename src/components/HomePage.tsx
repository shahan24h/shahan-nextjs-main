'use client';

import Link from 'next/link';

const focusAreas = [
  'Computational Social Science',
  'Natural Language Processing & Text Classification',
  'Adversarial Machine Learning & Robustness',
  'Healthcare & Public Health Analytics',
  'Data Infrastructure for Social Research',
  'Social and Information Networks (Currently Presenting)',
];

const studies = [
  {
    title: 'Social Engineering & Adversarial Obfuscation in BEC Attacks',
    meta: '2026 · 95.4% detection accuracy',
    desc: 'A character-level classifier flagging Business Email Compromise attempts obfuscated with Unicode homoglyphs and zero-width characters.',
    href: '/project/bec-adversarial-dashboard',
  },
  {
    title: 'Robustness of Phishing Detection Under Adversarial Unicode Obfuscation',
    meta: '2026 · 99.8% accuracy',
    desc: "An evaluation of a TF-IDF and logistic regression classifier's robustness to adversarially obfuscated phishing emails at test time.",
    href: '/project/phishing-robustness-dashboard',
  },
  {
    title: 'OCR Text Classification: DistilBERT vs Longformer-DeBERTa',
    meta: '2026 · Model Benchmarking',
    desc: 'A comparison of transformer architectures on OCR-extracted document classification by F1 score, latency, and memory footprint.',
    href: '/project/ml-dashboard',
  },
];

const researchPublications = [
  {
    citation: '"DHS Vaccination Coverage Analysis." 2024 MSU Student Research Symposium: analysis of Demographic and Health Surveys data to identify vaccination coverage gaps across countries.',
    status: 'Conference presentation',
  },
  {
    citation: 'Ahmed, S. "Federated Learning and Synthetic Data for Vaccination Equity Research." CSS2026 — The Computational Social Science Society of the Americas 2026 International Conference.',
    status: 'Accepted',
  },
  {
    citation: 'Ahmed, S. "Community Interventions and Cross-Platform Response."',
    status: 'Working paper',
  },
];

const projects = [
  {
    name: 'OpenDataBD',
    desc: 'An open data initiative building research infrastructure for public government data on Bangladesh.',
    href: 'https://www.opendatabd.com',
    label: 'Visit',
    external: true,
  },
  {
    name: 'Case Studies',
    desc: 'Applied work in machine learning, healthcare analytics, and data infrastructure.',
    href: '/case-studies',
    label: 'View',
    external: false,
  },
  {
    name: 'MechanicBD',
    desc: 'A service-based platform startup. End-to-end tech stack built by the team I lead.',
    href: 'https://www.mechanicbdsyl.com',
    label: 'Visit',
    external: true,
  },
];

const linkClass =
  'text-[var(--editorial-accent)] underline decoration-[var(--editorial-accent)]/40 underline-offset-4 transition-opacity hover:opacity-70';

const featureSettings = "[font-feature-settings:'cv02','cv03','cv04','cv11']";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--editorial-bg)]">
      <div className="mx-auto max-w-[800px] px-5 pb-16 pt-14 md:px-0">
        <h1 className={`mb-1 font-sans text-[32px] font-bold leading-[40px] text-[var(--editorial-ink)] ${featureSettings}`}>
          Shahan Ahmed
        </h1>
        <p className={`font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--editorial-muted)] ${featureSettings}`}>
          Computational Social Science &middot; Natural Language Processing &middot; Healthcare Analytics
        </p>
      </div>

      <main className="mx-auto max-w-[800px] px-5 pb-24 md:px-0">
        <section id="about" className="mb-16">
          <p className={`mb-6 font-sans text-xl leading-8 text-[var(--editorial-ink)] ${featureSettings}`}>
            M.A. in Social Research and Data Analysis, currently controlling large-scale data workflows at Conduent, preparing for a Ph.D. in 2027 in Information Systems or Computational Social Science.
          </p>
          <div className={`flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm ${featureSettings}`}>
            <Link href="/contact" className={linkClass}>Contact</Link>
            <span className="text-[var(--editorial-border)]">&bull;</span>
            <a href="https://scholar.google.com/citations?hl=en&user=ROqm-4EAAAAJ" target="_blank" rel="noopener noreferrer" className={linkClass}>
              Google Scholar
            </a>
            <span className="text-[var(--editorial-border)]">&bull;</span>
            <a href="https://github.com/shahan24h" target="_blank" rel="noopener noreferrer" className={linkClass}>
              GitHub
            </a>
            <span className="text-[var(--editorial-border)]">&bull;</span>
            <a href="https://www.linkedin.com/in/shahan24h/" target="_blank" rel="noopener noreferrer" className={linkClass}>
              LinkedIn
            </a>
            <span className="text-[var(--editorial-border)]">&bull;</span>
            <Link href="/resume" className={linkClass}>Resume</Link>
          </div>
        </section>

        <hr className="mb-16 border-t border-[var(--editorial-border)]" />

        <section className="mb-16">
          <h2 className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}>
            Research Interests
          </h2>

          <ul className="flex flex-col gap-2">
            {focusAreas.map((area) => (
              <li key={area} className={`flex items-start font-sans text-lg leading-7 text-[var(--editorial-ink)] ${featureSettings}`}>
                <span className="mr-3 text-[var(--editorial-ink)]">&bull;</span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="mb-16 border-t border-[var(--editorial-border)]" />

        <section id="research" className="mb-16">
          <h2 className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}>
            Research
          </h2>
          <div className="flex flex-col gap-10">
            {studies.map((study) => (
              <div key={study.title}>
                <h3 className={`mb-1 font-sans text-xl font-bold text-[var(--editorial-ink)] ${featureSettings}`}>
                  {study.title}
                </h3>
                <div className={`mb-2.5 font-sans text-[13px] text-[var(--editorial-muted)] ${featureSettings}`}>{study.meta}</div>
                <p className={`mb-2.5 font-sans text-lg leading-7 text-[var(--editorial-ink)] ${featureSettings}`}>{study.desc}</p>
                <Link href={study.href} className={`font-sans text-[13px] ${linkClass} ${featureSettings}`}>
                  [View results]
                </Link>
              </div>
            ))}
          </div>
        </section>

        <hr className="mb-16 border-t border-[var(--editorial-border)]" />

        <section id="projects">
          <h2 className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}>
            Ongoing Projects
          </h2>
          <ul className="flex flex-col">
            {projects.map((proj) => (
              <li
                key={proj.name}
                className="flex items-baseline justify-between gap-4 border-b border-[var(--editorial-border)] py-3.5"
              >
                <span className={`font-sans text-lg leading-7 text-[var(--editorial-ink)] ${featureSettings}`}>
                  <b>{proj.name}:</b> {proj.desc}
                </span>
                {proj.external ? (
                  <a
                    href={proj.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`whitespace-nowrap font-sans text-[13px] ${linkClass} ${featureSettings}`}
                  >
                    [{proj.label}]
                  </a>
                ) : (
                  <Link href={proj.href} className={`whitespace-nowrap font-sans text-[13px] ${linkClass} ${featureSettings}`}>
                    [{proj.label}]
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <hr className="mb-16 border-t border-[var(--editorial-border)]" />

        <section id="publications" className="mb-16">
          <h2 className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}>
            Publications &amp; Presentations
          </h2>
          <div className="flex flex-col gap-7">
            {researchPublications.map((pub) => (
              <div key={pub.citation} className="border-l-2 border-[var(--editorial-ink)] pl-4">
                <p className={`font-sans text-lg leading-7 text-[var(--editorial-ink)] ${featureSettings}`}>{pub.citation}</p>
                <div className={`mt-1.5 font-sans text-[13px] text-[var(--editorial-muted)] ${featureSettings}`}>{pub.status}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="other-publications" className="mb-16">
          <h2 className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}>
            Other Research
          </h2>
          <p className={`mb-3 font-sans text-lg leading-7 text-[var(--editorial-ink)] ${featureSettings}`}>
            Publications from prior research areas outside my current focus.
          </p>
          <Link href="/research" className={`font-sans text-[13px] ${linkClass} ${featureSettings}`}>
            [View prior research]
          </Link>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
