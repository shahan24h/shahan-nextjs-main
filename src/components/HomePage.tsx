"use client";

import Link from "next/link";

const focusAreas = [
  "Computational Social Science",
  "Natural Language Processing & Text Classification",
  "Adversarial Machine Learning & Robustness",
  "Healthcare & Public Health Analytics",
  "Data Infrastructure for Social Research",
  "Social and Information Networks",
];

const studies = [
  {
    title: "Social Engineering & Adversarial Obfuscation in BEC Attacks",
    meta: "2026 · 95.4% detection accuracy",
    desc: "A character-level classifier flagging Business Email Compromise attempts obfuscated with Unicode homoglyphs and zero-width characters.",
    href: "/project/bec-adversarial-dashboard",
  },
  {
    title:
      "Robustness of Phishing Detection Under Adversarial Unicode Obfuscation",
    meta: "2026 · 99.8% accuracy",
    desc: "An evaluation of a TF-IDF and logistic regression classifier's robustness to adversarially obfuscated phishing emails at test time.",
    href: "/project/phishing-robustness-dashboard",
  },
  {
    title: "OCR Text Classification: DistilBERT vs Longformer-DeBERTa",
    meta: "2026 · Model Benchmarking",
    desc: "A comparison of transformer architectures on OCR-extracted document classification by F1 score, latency, and memory footprint.",
    href: "/project/ml-dashboard",
  },
];

const projects = [
  {
    name: "OpenDataBD",
    desc: "An open data initiative building research infrastructure for public government data on Bangladesh. This is a philanthropic project and accepting help from volunteers.",
    href: "https://www.opendatabd.com",
    label: "Visit",
    external: true,
  },
];

const researchPublications = [
  {
    title:
      "Individual and Contextual Determinants of Complete Infant Vaccination: A Comparative Study of Bangladesh and Pakistan Using the DHS, 2017–18",
    authors: "Naomi Nguyen and Shahan Ahmed",
    venue: "2024 Student Research Symposium · Montclair State University",
    type: "Poster presentation",
    advisor: "Sangeeta Parashar",
    href: "https://digitalcommons.montclair.edu/student-research-symposium/2024/poster04/36/",
  },
];

const linkClass =
  "text-[var(--editorial-accent)] underline decoration-[var(--editorial-accent)]/40 underline-offset-4 transition-opacity hover:opacity-70";

const featureSettings =
  "[font-feature-settings:'cv02','cv03','cv04','cv11']";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[var(--editorial-bg)]">
      <div className="mx-auto max-w-[800px] px-5 pb-16 pt-14 md:px-0">
        <h1
          className={`mb-1 font-sans text-[32px] font-bold leading-[40px] text-[var(--editorial-ink)] ${featureSettings}`}
        >
          Shahan Ahmed
        </h1>

        <p
          className={`font-sans text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--editorial-muted)] ${featureSettings}`}
        >
          Computational Social Science &middot; Data-Centric AI and World Models
&middot; Complex Systems
        </p>
      </div>

      <main className="mx-auto max-w-[800px] px-5 pb-24 md:px-0">
        <section id="about" className="mb-16">
          <p
            className={`mb-6 font-sans text-xl leading-8 text-[var(--editorial-ink)] ${featureSettings}`}
          >
            My research draws on sociology, political science, computational social science, and social network analysis to study complex social systems and public policy. I am increasingly focused on integrating data from multiple sources to develop multidimensional datasets for world models.
          </p>

          <div
            className={`flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm ${featureSettings}`}
          >
            <Link href="/contact" className={linkClass}>
              Contact
            </Link>

            <span className="text-[var(--editorial-border)]">&bull;</span>

            <a
              href="https://scholar.google.com/citations?hl=en&user=ROqm-4EAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Google Scholar
            </a>

            <span className="text-[var(--editorial-border)]">&bull;</span>

            <a
              href="https://github.com/shahan24h"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              GitHub
            </a>

            <span className="text-[var(--editorial-border)]">&bull;</span>

            <a
              href="https://www.linkedin.com/in/shahan24h/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>

            <span className="text-[var(--editorial-border)]">&bull;</span>

            <Link href="/resume" className={linkClass}>
              Resume
            </Link>
          </div>

          <section className="mt-10 border-t border-[var(--editorial-border)] pt-10 font-sans">
            <h2
              className={`mb-7 !font-sans text-sm font-semibold uppercase tracking-[0.18em] text-[var(--editorial-muted)] ${featureSettings}`}
            >
              Upcoming Conference Presentations
            </h2>

            <div className="space-y-9">
              <article>
                <h3
                  className={`max-w-5xl font-sans text-lg font-medium leading-7 text-[var(--editorial-ink)] ${featureSettings}`}
                >
                  Reddit Community Interventions and Cross-Platform Response:
                  Migration and Policy-Response Discourse on Voat
                </h3>

                <p
                  className={`mt-2 font-sans text-base leading-7 text-[var(--editorial-muted)] ${featureSettings}`}
                >
                  Accepted at{" "}
                  <a
                    href="https://www.cmu.edu/ideas-social-cybersecurity/events/ideas-conferences/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    IDeaS 2026
                  </a>{" "}
                  · Carnegie Mellon University · October 12–14, 2026
                </p>

                <a
                  href="https://arxiv.org/abs/2609.05704"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-block font-sans text-base ${linkClass} ${featureSettings}`}
                >
                  Preprint →
                </a>
              </article>

              <article>
                <h3
                  className={`max-w-5xl font-sans text-lg font-medium leading-7 text-[var(--editorial-ink)] ${featureSettings}`}
                >
                  Threat Amplified, Blame Restrained: LLM-Assisted Media Framing
                  Analysis of the 2026 Bangladesh Measles Outbreak
                </h3>

                <p
                  className={`mt-2 font-sans text-base leading-7 text-[var(--editorial-muted)] ${featureSettings}`}
                >
                  Accepted at{" "}
                  <a
                    href="https://computationalsocialscience.org/conferences/css-2026-santa-fe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    CSS 2026
                  </a>{" "}
                  · Santa Fe, New Mexico · October 29–November 1, 2026
                </p>

                <a
                  href="https://arxiv.org/abs/2609.28362"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-block font-sans text-base ${linkClass} ${featureSettings}`}
                >
                  Preprint →
                </a>
              </article>
            </div>
          </section>
        </section>

        <hr className="mb-16 border-t border-[var(--editorial-border)]" />

        <section className="mb-16">
          <h2
            className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}
          >
            Research Interests
          </h2>

          <ul className="flex flex-col gap-2">
            {focusAreas.map((area) => (
              <li
                key={area}
                className={`flex items-start font-sans text-lg leading-7 text-[var(--editorial-ink)] ${featureSettings}`}
              >
                <span className="mr-3 text-[var(--editorial-ink)]">
                  &bull;
                </span>
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="mb-16 border-t border-[var(--editorial-border)]" />

        <section id="research" className="mb-16">
          <h2
            className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}
          >
            some recent projects
          </h2>

          <div className="flex flex-col gap-10">
            {studies.map((study) => (
              <div key={study.title}>
                <h3
                  className={`mb-1 font-sans text-xl font-bold text-[var(--editorial-ink)] ${featureSettings}`}
                >
                  {study.title}
                </h3>

                <div
                  className={`mb-2.5 font-sans text-[13px] text-[var(--editorial-muted)] ${featureSettings}`}
                >
                  {study.meta}
                </div>

                <p
                  className={`mb-2.5 font-sans text-lg leading-7 text-[var(--editorial-ink)] ${featureSettings}`}
                >
                  {study.desc}
                </p>

                <Link
                  href={study.href}
                  className={`font-sans text-[13px] ${linkClass} ${featureSettings}`}
                >
                  [View results]
                </Link>
              </div>
            ))}
          </div>
        </section>

        <hr className="mb-16 border-t border-[var(--editorial-border)]" />

        <section id="projects" className="mb-16">
          <h2
            className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}
          >
            Ongoing Projects
          </h2>

          <ul className="flex flex-col">
            {projects.map((project) => (
              <li
                key={project.name}
                className="flex flex-col gap-2 border-b border-[var(--editorial-border)] py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
              >
                <span
                  className={`font-sans text-lg leading-7 text-[var(--editorial-ink)] ${featureSettings}`}
                >
                  <b>{project.name}:</b> {project.desc}
                </span>

                {project.external ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`whitespace-nowrap font-sans text-[13px] ${linkClass} ${featureSettings}`}
                  >
                    [{project.label}]
                  </a>
                ) : (
                  <Link
                    href={project.href}
                    className={`whitespace-nowrap font-sans text-[13px] ${linkClass} ${featureSettings}`}
                  >
                    [{project.label}]
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>

        <hr className="mb-16 border-t border-[var(--editorial-border)]" />

        <section id="publications" className="mb-16">
          <h2
            className={`mb-6 font-sans text-2xl font-semibold leading-8 text-[var(--editorial-ink)] ${featureSettings}`}
          >
            Publications &amp; Presentations
          </h2>

          <div className="flex flex-col gap-7">
            {researchPublications.map((publication) => (
              <article
                key={publication.href}
                className="border-l-2 border-[var(--editorial-ink)] pl-4"
              >
                <a
                  href={publication.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-sans text-lg font-medium leading-7 text-[var(--editorial-ink)] underline decoration-[var(--editorial-accent)]/50 underline-offset-4 transition-opacity hover:opacity-70 ${featureSettings}`}
                >
                  {publication.title}
                </a>

                <p
                  className={`mt-2 font-sans text-[15px] leading-6 text-[var(--editorial-ink)] ${featureSettings}`}
                >
                  {publication.authors}
                </p>

                <p
                  className={`mt-1 font-sans text-[14px] leading-6 text-[var(--editorial-muted)] ${featureSettings}`}
                >
                  {publication.venue}
                </p>

                <p
                  className={`mt-1 font-sans text-[13px] leading-5 text-[var(--editorial-muted)] ${featureSettings}`}
                >
                  {publication.type} · Faculty advisor: {publication.advisor}
                </p>

                <a
                  href={publication.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-block font-sans text-[13px] ${linkClass} ${featureSettings}`}
                >
                  View in Digital Commons →
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;