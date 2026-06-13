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
    typeColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
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
    typeColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
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
    typeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
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
    typeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
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
    color: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  },
  Synthetic: {
    label: 'Synthetic / Public',
    icon: <Globe className="w-3.5 h-3.5" />,
    color: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  },
  Research: {
    label: 'Research Dataset',
    icon: <BookOpen className="w-3.5 h-3.5" />,
    color: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  },
  Proprietary: {
    label: 'Proprietary',
    icon: <Lock className="w-3.5 h-3.5" />,
    color: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = PRODUCTS.find((p) => p.id === selectedId) ?? null;

  return (
    <div className="min-h-screen bg-gray-950">
      <PortfolioSchema />

      {/* ── Hero ── */}
      <section className="pt-24 pb-10 px-6 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">Products</h1>
          <p className="text-gray-400 max-w-lg">
            End-to-end systems built from raw data to working output — pipelines, agents, dashboards, and analytics tools.
          </p>
        </div>
      </section>

      {/* ── Split layout ── */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex gap-8 items-start">

          {/* ── Left: list ── */}
          <div className="flex-1 min-w-0">
            {/* list header */}
            <div className="grid grid-cols-[1fr_auto] gap-4 px-4 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-600">Product</span>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-600">Outcome</span>
            </div>

            <div className="divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden">
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

          {/* ── Right: Data Used panel ── */}
          <div className="hidden lg:block w-[320px] flex-shrink-0">
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
      </div>
    </div>
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
      className={`group flex items-center gap-4 px-4 py-4 cursor-pointer transition-colors duration-150 ${
        selected ? 'bg-gray-800' : 'bg-gray-900 hover:bg-gray-800/60'
      }`}
    >
      {/* type badge */}
      <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[11px] font-semibold flex-shrink-0 w-[110px] justify-center ${p.typeColor}`}>
        {p.typeIcon}
        {p.type}
      </span>

      {/* title + tagline */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate transition-colors ${selected ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
          {p.title}
        </p>
        <p className="text-xs text-gray-500 truncate mt-0.5">{p.tagline}</p>
      </div>

      {/* metric */}
      <div className="text-right flex-shrink-0 hidden md:block">
        <p className="text-sm font-bold text-white">{p.metric.value}</p>
        <p className="text-[10px] text-gray-600 mt-0.5">{p.metric.label}</p>
      </div>

      {/* explore link */}
      <Link
        href={p.slug}
        target={p.slug.startsWith('http') ? '_blank' : undefined}
        rel={p.slug.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={(e) => e.stopPropagation()}
        className="flex-shrink-0 p-1.5 rounded-lg text-gray-600 hover:text-white hover:bg-gray-700 transition-all"
        title="Explore product"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>

      {/* selection indicator */}
      <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-all duration-150 ${selected ? 'text-blue-400 rotate-90' : 'text-gray-700 group-hover:text-gray-500'}`} />
    </div>
  );
}

// ─── Data Used Panel ──────────────────────────────────────────────────────────

function DataUsedPanel({ product: p }: { product: Product }) {
  const { dataUsed } = p;
  const access = ACCESS_CONFIG[dataUsed.access];

  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
      {/* header */}
      <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-3.5 h-3.5 text-gray-500" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
            Data Used
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-semibold ${access.color}`}>
          {access.icon}
          {access.label}
        </span>
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-white mb-4 leading-snug">{p.title}</p>

        <div className="space-y-3">
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

        <div className="mt-4 pt-4 border-t border-gray-800">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-2">
            Key Fields
          </p>
          <ul className="space-y-1.5">
            {dataUsed.fields.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-600 flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {dataUsed.notes && (
          <div className="mt-4 p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">Notes</p>
            <p className="text-xs text-gray-400 leading-relaxed">{dataUsed.notes}</p>
          </div>
        )}

        <Link
          href={p.slug}
          target={p.slug.startsWith('http') ? '_blank' : undefined}
          rel={p.slug.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 text-sm font-medium text-gray-200 hover:text-white transition-colors"
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
    <div className="rounded-xl border border-dashed border-gray-800 p-8 text-center">
      <MousePointerClick className="w-5 h-5 text-gray-700 mx-auto mb-3" />
      <p className="text-sm font-medium text-gray-500 mb-1">Select a product</p>
      <p className="text-xs text-gray-700 leading-relaxed">
        Click any row to see its dataset, source, size, and fields.
      </p>
    </div>
  );
}

// ─── Data row ─────────────────────────────────────────────────────────────────

function DataRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5">
      <div className="mt-0.5 text-gray-700 flex-shrink-0">{icon}</div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">{label}</p>
        <p className="text-xs text-gray-300 mt-0.5">{children}</p>
      </div>
    </div>
  );
}
