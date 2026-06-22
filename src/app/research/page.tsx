import Link from 'next/link';
import { ArrowUpRight, CalendarDays, ExternalLink, FileText, FlaskConical, Globe2, Presentation } from 'lucide-react';

export const metadata = {
  title: 'Research | Shahan Ahmed',
  description:
    'Peer-reviewed publications, conference presentations, and experimental research by Shahan Ahmed — Data Scientist & ML Engineer.',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const researchAreas = [
  'Adversarial Machine Learning',
  'NLP & Text Classification',
  'Healthcare Analytics',
  'Public Health Data',
  'Email Security',
];

const publications = [
  {
    year: '2023',
    title: 'Synthesis and characterization study',
    venue: 'Inorganic Chemistry Communications',
    type: 'Journal Article',
    status: 'Published',
  },
  {
    year: '2022',
    title: 'Modeling and simulation of solar cells',
    venue: 'Optics & Laser Technology',
    type: 'Journal Article',
    status: 'Published',
  },
  {
    year: 'TBD',
    title: 'Federated learning + synthetic data for vaccination equity research',
    venue: 'Manuscript in preparation',
    type: 'Journal Article',
    status: 'In preparation',
  },
];

const presentations = [
  {
    year: '2024',
    title: 'DHS Vaccination Coverage Analysis',
    event: '2024 MSU Student Research Symposium',
    type: 'Conference Presentation',
    description:
      'Analysis of Demographic and Health Surveys data to identify vaccination coverage gaps across countries.',
  },
];

const studies = [
  {
    id: 'bec',
    year: '2026',
    type: 'Adversarial ML Study',
    title: 'Social Engineering & Adversarial Obfuscation in BEC Attacks',
    abstract:
      'Analyzed how Unicode homoglyphs and zero-width characters break keyword-based phishing detection. Built a character-level classifier that flags obfuscated Business Email Compromise emails that evade conventional defenses.',
    finding: '95.4% detection accuracy',
    methods: ['Character-level modeling', 'Unicode homoglyph injection', 'Zero-width character attacks'],
    tools: ['Python', 'Scikit-learn', 'NLP'],
    link: '/project/bec-adversarial-dashboard',
  },
  {
    id: 'phishing',
    year: '2026',
    type: 'Robustness Evaluation',
    title: 'Robustness of Phishing Detection Under Adversarial Unicode Obfuscation',
    abstract:
      'Evaluated whether a TF-IDF + Logistic Regression classifier trained on clean data remains robust when phishing emails are adversarially obfuscated at test time.',
    finding: '99.8% accuracy · 100% recall',
    methods: ['Clean vs. adversarial test splits', 'Word-level TF-IDF', 'Logistic Regression'],
    tools: ['Python', 'TF-IDF', 'Hugging Face Datasets'],
    link: '/project/phishing-robustness-dashboard',
  },
  {
    id: 'ocr',
    year: '2026',
    type: 'Model Benchmarking',
    title: 'OCR Text Classification: DistilBERT vs Longformer-DeBERTa',
    abstract:
      'Benchmarked transformer architectures on OCR-extracted document classification and compared F1 score, inference latency, and memory footprint for production model selection.',
    finding: '2 architectures benchmarked',
    methods: ['F1 / precision / recall comparison', 'Latency profiling', 'Memory footprint analysis'],
    tools: ['DistilBERT', 'Longformer-DeBERTa', 'Recharts'],
    link: '/project/ml-dashboard',
  },
];

const activeProjects = [
  {
    year: 'Active',
    title: 'OpenDataBD',
    type: 'Open Data Initiative',
    description:
      'Open data initiative for Bangladesh, building infrastructure to make public government data accessible and usable for researchers and citizens.',
    link: 'https://www.opendatabd.com',
    external: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#242424]">
      {/* Hero */}
      <section className="border-b border-[#ded6c9] px-6 pt-28 pb-14">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#7c7163]">
                Shahan Ahmed / Research Notes
              </p>
              <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-[#191919] md:text-7xl">
                Research
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5a52] md:text-xl">
                Publications, conference presentations, and experimental ML studies organized by research category.
              </p>
            </div>

            <div className="rounded-3xl border border-[#ded6c9] bg-[#fffdf8] p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7c7163]">Research index</p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <Stat value={publications.length} label="Publications" />
                <Stat value={presentations.length} label="Presentations" />
                <Stat value={studies.length} label="Studies" />
                <Stat value={activeProjects.length} label="Initiative" />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-[#ded6c9] pt-6">
            {researchAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-[#d0c7b8] bg-[#fffdf8] px-4 py-2 text-sm text-[#5f5a52]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="space-y-14">
          <ResearchSection
            icon={<FileText className="h-5 w-5" />}
            label="Category 01"
            title="Peer-reviewed publications"
            description="Journal articles and manuscript work organized as a clean reading list."
            count={publications.length}
          >
            <div className="divide-y divide-[#ded6c9] overflow-hidden rounded-3xl border border-[#ded6c9] bg-[#fffdf8]">
              {publications.map((pub) => (
                <ListItem
                  key={`${pub.year}-${pub.title}`}
                  year={pub.year}
                  type={pub.type}
                  title={pub.title}
                  meta={`${pub.venue} · ${pub.status}`}
                />
              ))}
            </div>
          </ResearchSection>

          <ResearchSection
            icon={<Presentation className="h-5 w-5" />}
            label="Category 02"
            title="Conference presentations"
            description="Research presentations and academic posters from symposium settings."
            count={presentations.length}
          >
            <div className="divide-y divide-[#ded6c9] overflow-hidden rounded-3xl border border-[#ded6c9] bg-[#fffdf8]">
              {presentations.map((presentation) => (
                <ListItem
                  key={presentation.title}
                  year={presentation.year}
                  type={presentation.type}
                  title={presentation.title}
                  meta={presentation.event}
                  description={presentation.description}
                />
              ))}
            </div>
          </ResearchSection>

          <ResearchSection
            icon={<FlaskConical className="h-5 w-5" />}
            label="Category 03"
            title="Experimental studies"
            description="Applied ML and NLP studies with methods, tools, findings, and result pages."
            count={studies.length}
          >
            <div className="space-y-5">
              {studies.map((study) => (
                <article key={study.id} className="rounded-3xl border border-[#ded6c9] bg-[#fffdf8] p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">
                  <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
                    <div>
                      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#7c7163]">
                        <span className="rounded-full bg-[#f0e9dc] px-3 py-1 font-semibold uppercase tracking-wide">
                          {study.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {study.year}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-semibold leading-snug text-[#191919] md:text-3xl">
                        {study.title}
                      </h3>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5f5a52] md:text-base">
                        {study.abstract}
                      </p>

                      <div className="mt-5 grid gap-5 sm:grid-cols-2">
                        <MiniList title="Methods" items={study.methods} />
                        <MiniList title="Tools" items={study.tools} pill />
                      </div>
                    </div>

                    <div className="md:w-44 md:text-right">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7c7163]">Key result</p>
                      <p className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#191919]">
                        {study.finding}
                      </p>
                      <Link
                        href={study.link}
                        className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#242424] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#3a3a3a]"
                      >
                        View results
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </ResearchSection>

          <ResearchSection
            icon={<Globe2 className="h-5 w-5" />}
            label="Category 04"
            title="Active initiatives"
            description="Ongoing public-interest data projects and research infrastructure work."
            count={activeProjects.length}
          >
            <div className="divide-y divide-[#ded6c9] overflow-hidden rounded-3xl border border-[#ded6c9] bg-[#fffdf8]">
              {activeProjects.map((project) => (
                <div key={project.title} className="grid gap-4 px-6 py-6 md:grid-cols-[6rem_1fr_auto] md:items-start">
                  <div className="text-sm font-bold text-emerald-700">{project.year}</div>
                  <div>
                    <span className="mb-3 inline-flex rounded-full bg-[#f0e9dc] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#6b5f52]">
                      {project.type}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold text-[#191919]">{project.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5f5a52]">{project.description}</p>
                  </div>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[#242424] px-4 py-2 text-sm font-semibold text-[#242424] transition-colors hover:bg-[#242424] hover:text-white"
                  >
                    Visit
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </ResearchSection>
        </div>
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <p className="font-serif text-3xl font-semibold leading-none text-[#191919]">{value}</p>
      <p className="mt-1 text-xs font-medium text-[#7c7163]">{label}</p>
    </div>
  );
}

function ResearchSection({
  icon,
  label,
  title,
  description,
  count,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex flex-col gap-4 border-b border-[#ded6c9] pb-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7c7163]">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#242424] text-white">{icon}</span>
            {label}
          </div>
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#191919] md:text-4xl">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-[#5f5a52] md:text-base">{description}</p>
        </div>
        <span className="w-fit rounded-full border border-[#d0c7b8] bg-[#fffdf8] px-4 py-2 text-sm font-semibold text-[#5f5a52]">
          {count} item{count === 1 ? '' : 's'}
        </span>
      </div>
      {children}
    </section>
  );
}

function ListItem({
  year,
  type,
  title,
  meta,
  description,
}: {
  year: string;
  type: string;
  title: string;
  meta: string;
  description?: string;
}) {
  return (
    <article className="grid gap-4 px-6 py-6 transition-colors hover:bg-[#fbf7ef] md:grid-cols-[6rem_1fr]">
      <div className="text-sm font-bold text-[#7c7163]">{year}</div>
      <div>
        <span className="mb-3 inline-flex rounded-full bg-[#f0e9dc] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#6b5f52]">
          {type}
        </span>
        <h3 className="font-serif text-2xl font-semibold leading-snug text-[#191919]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#5f5a52]">{meta}</p>
        {description && <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5f5a52]">{description}</p>}
      </div>
    </article>
  );
}

function MiniList({ title, items, pill = false }: { title: string; items: string[]; pill?: boolean }) {
  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#7c7163]">{title}</p>
      {pill ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded-full bg-[#f0e9dc] px-3 py-1 text-xs font-medium text-[#5f5a52]">
              {item}
            </span>
          ))}
        </div>
      ) : (
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-6 text-[#5f5a52]">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#7c7163]" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
