'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Database,
  Globe,
  Lock,
  BookOpen,
  FileText,
  Hash,
  MousePointerClick,
  CheckCircle2,
  ExternalLink,
  TrendingUp,
  Cpu,
  Bot,
  BarChart3,
  PieChart,
  ChevronRight,
  Search,
} from 'lucide-react';
import { PortfolioSchema } from '@/components/StructuredData';

// ─── Types ───────────────────────────────────────────────────────────────────

type AccessLevel = 'Public' | 'Proprietary' | 'Research' | 'Synthetic';

interface DataUsed {
  dataset: string;
  source: string;
  size: string;
  format: string;
  period?: string;
  fields: string[];
  access: AccessLevel;
  notes?: string;
}

interface Product {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  type: string;
  typeIcon: React.ReactNode;
  typeColor: string;
  tech: string[];
  metric: { value: string; label: string };
  dataUsed: DataUsed;
}

// ─── Products ────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 'cancer-prediction-pipeline',
    slug: '/project/cancer-prediction-pipeline',
    title: 'Cancer Risk Prediction Pipeline',
    tagline: 'Identifies high-risk cancer patients at the moment of admission.',
    description:
      'End-to-end ML pipeline on Databricks that flags high-risk patients from CMS Medicare claims. Delta Lake medallion architecture, MLflow tracking, and 100% recall — no critical cases missed.',
    type: 'ML Pipeline',
    typeIcon: <Cpu className="w-3.5 h-3.5" />,
    typeColor: 'text-blue-700 bg-blue-50 border-blue-100',
    tech: ['PySpark', 'Delta Lake', 'MLflow', 'scikit-learn'],
    metric: { value: '93%', label: 'Accuracy · 100% Recall' },
    dataUsed: {
      dataset: 'CMS Medicare Synthetic Dataset',
      source: 'Centers for Medicare & Medicaid Services (CMS)',
      size: '116,352 patients · 66,773 inpatient claims',
      format: 'CSV / Parquet (Delta Lake)',
      period: 'Multi-year Medicare claims',
      fields: [
        'Patient age, gender, race',
        'ICD-9 diagnosis codes',
        'Claim & reimbursement amounts',
        'Admission and discharge dates',
        'Provider & facility codes',
        'Comorbidity flags',
      ],
      access: 'Synthetic',
      notes:
        'Synthetic data mirrors real Medicare claims structure without any PII. Publicly available from CMS for research purposes.',
    },
  },
  {
    id: 'exforge',
    slug: 'https://github.com/shahan24h/exforge',
    title: 'ExForge',
    tagline: 'Autonomous lead generation — from Google Maps to cold email inbox.',
    description:
      'AI agent that scrapes businesses, scores leads with Claude Haiku, audits websites, generates PDF reports, and sends personalized cold emails. Zero manual steps. Runs on a daily schedule.',
    type: 'AI Agent',
    typeIcon: <Bot className="w-3.5 h-3.5" />,
    typeColor: 'text-violet-700 bg-violet-50 border-violet-100',
    tech: ['Python', 'Claude Haiku', 'Playwright', 'SQLite'],
    metric: { value: '64+', label: 'Emails Sent' },
    dataUsed: {
      dataset: 'Google Maps Business Data + Live Website Audits',
      source: 'Google Maps (Playwright scraping) · Real-time website analysis',
      size: '64+ businesses across multiple cities & verticals',
      format: 'CSV (leads) · SQLite (state) · PDF (reports)',
      period: 'Live production campaigns',
      fields: [
        'Business name, address & phone',
        'Google Maps rating & category',
        'Website URL',
        'HTTPS / SSL status',
        'SEO metadata completeness',
        'Mobile responsiveness score',
        'Page load speed',
        'Accessibility flags',
        'AI lead score (1–10, Claude Haiku)',
      ],
      access: 'Proprietary',
      notes:
        'Data collected autonomously via Playwright. SQLite deduplication prevents repeat outreach. All audit metrics generated in real-time from live website analysis.',
    },
  },
  {
    id: 'municipal-court-case-analysis-austin',
    slug: '/project/municipal-court-case-analysis-austin',
    title: 'Austin Municipal Court Analytics',
    tagline: 'Data-driven policy interventions for a city court system.',
    description:
      'Assessment of 19,906 court cases in Austin covering operational triage, equity monitoring, fiscal impact sizing ($263K savings), and prioritized policy recommendations for city leadership.',
    type: 'Analytics',
    typeIcon: <BarChart3 className="w-3.5 h-3.5" />,
    typeColor: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    tech: ['Python', 'Pandas', 'Seaborn', 'Statistical Modeling'],
    metric: { value: '$263K', label: 'Identified Savings' },
    dataUsed: {
      dataset: 'Austin Municipal Court Disposition Data',
      source: 'City of Austin Open Data Portal (data.austintexas.gov)',
      size: '19,906 court case records',
      format: 'CSV',
      period: 'Multi-year case records (pre-2025)',
      fields: [
        'Case number & offense type',
        'Disposition outcome',
        'Scheduled & actual court dates',
        'Fine and fee amounts',
        'Defendant demographics',
        'Case status & resolution type',
      ],
      access: 'Public',
      notes:
        'Publicly available government records via Austin Open Data Portal. No PII was used in the analysis.',
    },
  },
  {
    id: 'qsr-analysis',
    slug: '/project/qsr-analysis',
    title: 'QSR POS Sales Dashboard',
    tagline: 'Revenue optimization for a multi-location restaurant chain.',
    description:
      'Analyzed 1,743 POS transactions across 10 locations. ML models hit 100% accuracy; revenue analysis surfaced $4–5K in monthly upside. Delivered as a live interactive React dashboard.',
    type: 'BI Dashboard',
    typeIcon: <PieChart className="w-3.5 h-3.5" />,
    typeColor: 'text-amber-700 bg-amber-50 border-amber-100',
    tech: ['React', 'Python', 'Random Forest', 'Recharts'],
    metric: { value: '100%', label: 'Model Accuracy' },
    dataUsed: {
      dataset: 'QSR POS Transaction Records',
      source: 'Client-provided internal data (10 restaurant locations)',
      size: '1,743 transactions',
      format: 'CSV / Excel',
      period: 'Single fiscal period',
      fields: [
        'Transaction ID & timestamp',
        'Location ID (anonymized)',
        'Menu item name & category',
        'Unit price & quantity',
        'Payment method',
        'Order type (dine-in / takeout)',
      ],
      access: 'Proprietary',
      notes:
        'Client data anonymized for confidentiality. Location names and identifying details have been redacted.',
    },
  },
];

// ─── Access config ────────────────────────────────────────────────────────────

const ACCESS_CONFIG: Record<AccessLevel, { label: string; icon: React.ReactNode; color: string }> = {
  Public: {
    label: 'Public',
    icon: <Globe className="w-3.5 h-3.5" />,
    color: 'text-emerald-700 bg-emerald-50 border-emerald-100',
  },
  Synthetic: {
    label: 'Synthetic / Public',
    icon: <Globe className="w-3.5 h-3.5" />,
    color: 'text-sky-700 bg-sky-50 border-sky-100',
  },
  Research: {
    label: 'Research Dataset',
    icon: <BookOpen className="w-3.5 h-3.5" />,
    color: 'text-violet-700 bg-violet-50 border-violet-100',
  },
  Proprietary: {
    label: 'Proprietary',
    icon: <Lock className="w-3.5 h-3.5" />,
    color: 'text-rose-700 bg-rose-50 border-rose-100',
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = PRODUCTS.find((p) => p.id === selectedId) ?? null;

  return (
    <main className="min-h-screen bg-[#f2f1ee] text-[#031b35]">
      <PortfolioSchema />

      {/* Journal masthead */}
      <section className="bg-[#061a33] px-6 pt-20 pb-16 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-[#c8d3df]">
              Shahan Ahmed / Data Products & Systems
            </p>
            <h1 className="font-serif text-5xl font-light uppercase tracking-[0.18em] text-white md:text-6xl lg:text-7xl">
              Products
            </h1>
          </div>

          <div className="relative hidden h-24 w-28 md:block" aria-hidden="true">
            <div className="absolute right-0 top-0 h-20 w-20 rotate-45 border border-white/40 bg-white/10" />
            <div className="absolute right-7 top-7 h-14 w-14 rotate-45 bg-white/25" />
            <div className="absolute right-10 top-10 h-6 w-6 bg-white" />
          </div>
        </div>
      </section>

      {/* Journal navigation */}
      <nav className="border-b border-[#d8d4cc] bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex overflow-x-auto text-sm font-semibold text-[#031b35]">
            <Link href="/blog" className="border-r border-[#e4e0d7] px-5 py-4 hover:bg-[#f2f1ee]">
              Articles
            </Link>
            <Link href="/case-studies" className="border-r border-[#e4e0d7] px-5 py-4 hover:bg-[#f2f1ee]">
              Case Studies
            </Link>
            <Link href="/research" className="border-r border-[#e4e0d7] px-5 py-4 hover:bg-[#f2f1ee]">
              Research
            </Link>
            <Link href="/project" className="border-r border-[#e4e0d7] bg-[#f2f1ee] px-5 py-4 text-[#a00034]">
              Projects
            </Link>
            <Link href="/contact" className="px-5 py-4 hover:bg-[#f2f1ee]">
              Contact
            </Link>
          </div>
          <Search className="hidden h-5 w-5 text-[#031b35] md:block" />
        </div>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-14">
        {/* Editorial introduction */}
        <div className="grid gap-12 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="max-w-3xl">
            <h2 className="font-serif text-4xl font-normal leading-tight tracking-wide text-[#a00034] md:text-5xl">
              From raw data to working systems
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#031b35]">
              A curated list of data products, machine learning pipelines, AI agents, dashboards, and analytics systems built from raw datasets into usable outputs.
            </p>
          </div>

          <aside className="bg-white p-8 shadow-sm">
            <h3 className="mb-6 font-serif text-3xl font-normal text-[#031b35]">Product index</h3>
            <div className="space-y-4 text-base font-semibold text-[#031b35]">
              <div className="flex items-center justify-between border-b border-[#e4e0d7] pb-3">
                <span>Total products</span>
                <span className="font-serif text-2xl text-[#a00034]">{PRODUCTS.length}</span>
              </div>
              <div className="flex items-center justify-between border-b border-[#e4e0d7] pb-3">
                <span>ML systems</span>
                <span className="font-serif text-2xl text-[#a00034]">2</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dashboards / analytics</span>
                <span className="font-serif text-2xl text-[#a00034]">2</span>
              </div>
            </div>
            <p className="mt-7 border-t border-[#e4e0d7] pt-5 text-sm leading-6 text-[#34475a]">
              Select any product to review the dataset, source, size, key fields, and access level.
            </p>
          </aside>
        </div>

        {/* Split layout */}
        <div className="mt-14 flex gap-8 items-start">
          {/* Left: list */}
          <div className="flex-1 min-w-0">
            <div className="mb-6 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#6b6b6b]">
                  Product library
                </p>
                <h2 className="mt-2 font-serif text-4xl font-normal text-[#031b35]">
                  Built systems
                </h2>
              </div>
              <span className="font-serif text-sm tracking-[0.15em] text-[#34475a]">
                {PRODUCTS.length} entries
              </span>
            </div>

            <div className="divide-y divide-[#d8d4cc] border-y border-[#d8d4cc]">
              {PRODUCTS.map((p) => (
                <ProductRow
                  key={p.id}
                  product={p}
                  selected={selectedId === p.id}
                  onSelect={() => setSelectedId(p.id === selectedId ? null : p.id)}
                />
              ))}
            </div>
          </div>

          {/* Right: Data Used panel */}
          <div className="hidden lg:block w-[340px] flex-shrink-0">
            <div className="sticky top-[72px]">
              {selected ? <DataUsedPanel product={selected} /> : <EmptyPanel />}
            </div>
          </div>
        </div>

        {/* Mobile data panel */}
        {selected && (
          <div className="lg:hidden mt-6">
            <DataUsedPanel product={selected} />
          </div>
        )}
      </section>
    </main>
  );
}

// ─── Product Row ──────────────────────────────────────────────────────────────

function ProductRow({
  product: p,
  selected,
  onSelect,
}: {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`group grid cursor-pointer gap-5 py-8 transition-colors md:grid-cols-[9rem_1fr_auto] md:px-5 ${
        selected ? 'bg-white' : 'hover:bg-white/70'
      }`}
    >
      <div className="space-y-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${p.typeColor}`}>
          {p.typeIcon}
          {p.type}
        </span>
        <div>
          <p className="font-serif text-3xl font-normal leading-none text-[#031b35]">{p.metric.value}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b6b6b]">
            {p.metric.label}
          </p>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-3xl font-normal leading-tight text-[#a00034] transition-colors group-hover:text-[#6e0024]">
          {p.title}
        </h3>
        <p className="mt-2 text-base font-semibold leading-7 text-[#031b35]">{p.tagline}</p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#34475a]">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[#34475a] ring-1 ring-[#d8d4cc]">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-start gap-3 md:justify-end">
        <Link
          href={p.slug}
          target={p.slug.startsWith('http') ? '_blank' : undefined}
          rel={p.slug.startsWith('http') ? 'noopener noreferrer' : undefined}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#031b35] group-hover:text-[#a00034]"
          title="Explore product"
        >
          Explore
          <ExternalLink className="w-4 h-4" />
        </Link>
        <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-all duration-150 ${selected ? 'text-[#a00034] rotate-90' : 'text-[#34475a] group-hover:text-[#a00034]'}`} />
      </div>
    </div>
  );
}

// ─── Data Used Panel ──────────────────────────────────────────────────────────

function DataUsedPanel({ product: p }: { product: Product }) {
  const { dataUsed } = p;
  const access = ACCESS_CONFIG[dataUsed.access];

  return (
    <div className="border border-[#d8d4cc] bg-white shadow-sm">
      <div className="border-b border-[#e4e0d7] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#34475a]" />
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#6b6b6b]">
              Data Used
            </span>
          </div>
          <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${access.color}`}>
            {access.icon}
            {access.label}
          </span>
        </div>
        <p className="mt-4 font-serif text-2xl font-normal leading-tight text-[#031b35]">{p.title}</p>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          <DataRow icon={<FileText className="w-3.5 h-3.5" />} label="Dataset">
            {dataUsed.dataset}
          </DataRow>
          <DataRow icon={<Globe className="w-3.5 h-3.5" />} label="Source">
            {dataUsed.source}
          </DataRow>
          <DataRow icon={<Hash className="w-3.5 h-3.5" />} label="Size">
            {dataUsed.size}
          </DataRow>
          <DataRow icon={<FileText className="w-3.5 h-3.5" />} label="Format">
            {dataUsed.format}
          </DataRow>
          {dataUsed.period && (
            <DataRow icon={<TrendingUp className="w-3.5 h-3.5" />} label="Period">
              {dataUsed.period}
            </DataRow>
          )}
        </div>

        <div className="mt-5 border-t border-[#e4e0d7] pt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#6b6b6b]">
            Key Fields
          </p>
          <ul className="space-y-2">
            {dataUsed.fields.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm leading-6 text-[#34475a]">
                <CheckCircle2 className="w-4 h-4 text-[#a00034] flex-shrink-0 mt-1" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {dataUsed.notes && (
          <div className="mt-5 border border-[#e4e0d7] bg-[#f8f6f1] p-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.22em] text-[#6b6b6b]">Notes</p>
            <p className="text-sm leading-6 text-[#34475a]">{dataUsed.notes}</p>
          </div>
        )}

        <Link
          href={p.slug}
          target={p.slug.startsWith('http') ? '_blank' : undefined}
          rel={p.slug.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="mt-5 flex w-full items-center justify-center gap-2 bg-[#031b35] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a00034]"
        >
          Explore Product
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

// ─── Empty panel ──────────────────────────────────────────────────────────────

function EmptyPanel() {
  return (
    <div className="border border-dashed border-[#c9c4bb] bg-white/50 p-8 text-center">
      <MousePointerClick className="w-6 h-6 text-[#a59d91] mx-auto mb-4" />
      <p className="font-serif text-2xl font-normal text-[#031b35]">Select a product</p>
      <p className="mt-2 text-sm leading-6 text-[#34475a]">
        Click any product to see its dataset, source, size, and key fields.
      </p>
    </div>
  );
}

// ─── Data row ─────────────────────────────────────────────────────────────────

function DataRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex-shrink-0 text-[#a59d91]">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6b6b6b]">{label}</p>
        <p className="mt-1 text-sm leading-6 text-[#031b35]">{children}</p>
      </div>
    </div>
  );
}
