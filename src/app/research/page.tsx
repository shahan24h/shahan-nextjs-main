import Link from 'next/link';
import { ExternalLink, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Research | Shahan Ahmed',
  description: 'Peer-reviewed publications, conference presentations, and experimental research by Shahan Ahmed — Data Scientist & ML Engineer.',
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const researchAreas = [
  'Adversarial Machine Learning',
  'NLP & Text Classification',
  'Healthcare Analytics',
  'Federated Learning',
  'Public Health Data',
  'Email Security',
];

const publications = [
  {
    year: '2023',
    title: 'Synthesis and characterization study',
    venue: 'Inorganic Chemistry Communications',
    type: 'Journal Article',
    status: 'published' as const,
  },
  {
    year: '2022',
    title: 'Modeling and simulation of solar cells',
    venue: 'Optics & Laser Technology',
    type: 'Journal Article',
    status: 'published' as const,
  },
  {
    year: null,
    title: 'Federated learning + synthetic data for vaccination equity research',
    venue: 'Manuscript in preparation',
    type: 'Journal Article',
    status: 'upcoming' as const,
  },
];

const presentations = [
  {
    year: '2024',
    title: 'DHS Vaccination Coverage Analysis',
    event: '2024 MSU Student Research Symposium',
    description:
      'Analysis of Demographic and Health Surveys (DHS) data to identify vaccination coverage gaps across countries.',
  },
];

const studies = [
  {
    id: 'bec',
    type: 'Adversarial ML Study',
    title: 'Social Engineering & Adversarial Obfuscation in BEC Attacks',
    abstract:
      'Analyzed how Unicode homoglyphs and zero-width characters break keyword-based phishing detection. Built a character-level classifier that correctly flags obfuscated Business Email Compromise emails that evade conventional defenses.',
    finding: { value: '95.4%', label: 'Detection accuracy' },
    methods: ['Character-level modeling', 'Unicode homoglyph injection', 'Zero-width character attacks', 'Keyword-based baseline comparison'],
    tools: ['Python', 'Scikit-learn', 'NLP', 'Adversarial ML'],
    link: '/project/bec-adversarial-dashboard',
  },
  {
    id: 'phishing',
    type: 'Robustness Evaluation',
    title: 'Robustness of Phishing Detection Under Adversarial Unicode Obfuscation',
    abstract:
      'Evaluated whether a TF-IDF + Logistic Regression classifier — trained on clean data — remains robust when phishing emails are adversarially obfuscated at test time. Contrasted with keyword-based detectors that suffered an 81.3% evasion rate under the same attack.',
    finding: { value: '99.8%', label: 'Accuracy · 100% recall' },
    methods: ['Clean vs. adversarial test splits', 'Word-level TF-IDF features', 'Logistic Regression classifier', 'Homoglyph + zero-width injection'],
    tools: ['Python', 'TF-IDF', 'Logistic Regression', 'Hugging Face Datasets'],
    link: '/project/phishing-robustness-dashboard',
  },
  {
    id: 'ocr',
    type: 'Model Benchmarking',
    title: 'OCR Text Classification: DistilBERT vs Longformer-DeBERTa',
    abstract:
      'Benchmarked two transformer architectures on OCR-extracted document classification. Evaluated F1 score, inference latency, and memory footprint to produce evidence-based model selection guidance for production OCR pipelines.',
    finding: { value: '2', label: 'Architectures benchmarked' },
    methods: ['F1 / precision / recall comparison', 'Inference latency profiling', 'Memory footprint analysis', 'Multi-category document sets'],
    tools: ['DistilBERT', 'Longformer-DeBERTa', 'TypeScript', 'Recharts'],
    link: '/project/ml-dashboard',
  },
];

const activeProjects = [
  {
    title: 'OpenDataBD',
    description:
      'Open data initiative for Bangladesh, building infrastructure to make public government data accessible and usable for researchers and citizens.',
    status: 'Active',
    link: 'https://www.opendatabd.com',
    external: true,
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">

      {/* ── Hero ── */}
      <section className="border-b border-gray-800 pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Shahan Ahmed
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">Research</h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed mb-8">
            Publications, conference presentations, and experimental ML studies focused on adversarial
            robustness, healthcare analytics, and public health data systems.
          </p>

          {/* Research areas */}
          <div className="flex flex-wrap gap-2">
            {researchAreas.map((area) => (
              <span
                key={area}
                className="px-3 py-1 rounded-full border border-gray-700 bg-gray-900 text-gray-400 text-xs font-medium"
              >
                {area}
              </span>
            ))}
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-gray-800">
            {[
              { value: '2', label: 'Peer-reviewed publications' },
              { value: '1', label: 'Conference presentation' },
              { value: '3', label: 'Experimental studies' },
              { value: '1', label: 'Active initiative' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">

        {/* ── Publications ── */}
        <section>
          <SectionHeader label="Publications" count={publications.length} />

          <div className="space-y-0 divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden">
            {publications.map((pub, i) => (
              <div key={i} className="flex gap-6 px-6 py-5 bg-gray-900 hover:bg-gray-800/60 transition-colors">
                {/* year */}
                <div className="w-10 flex-shrink-0 pt-0.5">
                  {pub.year ? (
                    <span className="text-sm font-mono font-semibold text-gray-500">{pub.year}</span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">TBD</span>
                  )}
                </div>

                {/* content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 flex-wrap mb-1.5">
                    <h3 className="text-sm font-semibold text-white leading-snug">{pub.title}</h3>
                    {pub.status === 'upcoming' && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wide flex-shrink-0">
                        In Preparation
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    <span className="text-gray-400 italic">{pub.venue}</span>
                    {' · '}
                    <span>{pub.type}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Presentations ── */}
        <section>
          <SectionHeader label="Presentations" count={presentations.length} />

          <div className="divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden">
            {presentations.map((pres, i) => (
              <div key={i} className="flex gap-6 px-6 py-5 bg-gray-900 hover:bg-gray-800/60 transition-colors">
                <div className="w-10 flex-shrink-0 pt-0.5">
                  <span className="text-sm font-mono font-semibold text-gray-500">{pres.year}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white mb-1">{pres.title}</h3>
                  <p className="text-xs text-blue-400 font-medium mb-1.5">{pres.event}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{pres.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Experimental Studies ── */}
        <section>
          <SectionHeader label="Experimental Studies" count={studies.length} />

          <div className="space-y-4">
            {studies.map((study) => (
              <div
                key={study.id}
                className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden"
              >
                {/* study header */}
                <div className="px-6 pt-5 pb-4 border-b border-gray-800">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                        {study.type}
                      </span>
                      <h3 className="text-base font-semibold text-white leading-snug">
                        {study.title}
                      </h3>
                    </div>
                    {/* key finding */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-black text-white leading-none">{study.finding.value}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5 max-w-[100px] text-right">{study.finding.label}</p>
                    </div>
                  </div>
                </div>

                {/* study body */}
                <div className="px-6 py-4 grid md:grid-cols-[1fr_auto] gap-6">
                  <div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{study.abstract}</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* methods */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Methods</p>
                        <ul className="space-y-1">
                          {study.methods.map((m) => (
                            <li key={m} className="text-xs text-gray-500 flex items-start gap-1.5">
                              <span className="text-gray-700 mt-1">—</span>
                              {m}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* tools */}
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">Tools</p>
                        <div className="flex flex-wrap gap-1.5">
                          {study.tools.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-gray-800 border border-gray-700 text-[11px] text-gray-400"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* link */}
                  <div className="flex md:flex-col items-start md:items-end justify-end gap-2 md:gap-0">
                    <Link
                      href={study.link}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-xs font-semibold text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                    >
                      View results
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Active Projects ── */}
        <section>
          <SectionHeader label="Active Initiatives" count={activeProjects.length} />

          <div className="divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden">
            {activeProjects.map((project, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-5 bg-gray-900 hover:bg-gray-800/60 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">{project.description}</p>
                </div>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  Visit
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className="text-lg font-bold text-white">{label}</h2>
      <span className="text-sm text-gray-600">{count}</span>
    </div>
  );
}
