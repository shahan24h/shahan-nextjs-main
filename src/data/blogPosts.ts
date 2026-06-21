export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishDate: string;
  createdAt: string;
}

export const blogPosts: BlogPost[] = [
  {
    _id: 'medical-document-classifier',
    title: 'Building a Medical Document Classifier from OCR Text',
    slug: 'building-medical-document-classifier-ocr-text',
    excerpt:
      'A practical overview of cleaning noisy OCR text, training document classifiers, and deploying a medical narrative detection pipeline.',
    tags: ['NLP', 'OCR', 'Machine Learning', 'Healthcare'],
    publishDate: '2026-06-21',
    createdAt: '2026-06-21',
    content: `# Building a Medical Document Classifier from OCR Text

Medical documents are rarely clean. They arrive as scans, faxed pages, TIFF files, OCR outputs, and long narrative forms. My goal was to build a reliable classifier that could separate a specific medical narrative document type from other forms using OCR text.

## The problem

The core challenge was not only model training. The larger challenge was building a pipeline that could survive messy real-world text: broken line spacing, repeated banners, OCR artifacts, duplicate pages, empty fields, and inconsistent formatting.

## Data cleaning mattered first

Before modeling, I focused on cleaning and validating the text. The process included Unicode normalization, whitespace cleanup, duplicate detection, banner removal, soft-hyphen repair, and checks for missing or empty text. One important discovery was that empty or near-empty values could create leakage or misleading performance if they were not handled carefully.

## Modeling path

I started with transformer-based methods, then compared lighter baselines such as TF-IDF with linear models. I also tested SVM-style learning, including Pegasos, because linear models can be surprisingly strong for OCR text classification when the signal is consistent.

## What I learned

The biggest lesson was that strong model performance depends on the entire system, not just the algorithm. Cleaning, splitting, leakage control, threshold selection, and deployment testing were all part of the final result.

## Next step

The next step is to keep improving the pipeline with stronger monitoring, better error analysis, and more robust handling of unusual OCR outputs.`,
  },
  {
    _id: 'why-static-blog',
    title: 'Why I Moved This Blog Away from MongoDB',
    slug: 'why-i-moved-this-blog-away-from-mongodb',
    excerpt:
      'For a personal portfolio, a static blog inside the GitHub repo is simpler, faster, and easier to deploy on Vercel.',
    tags: ['Next.js', 'Vercel', 'Portfolio'],
    publishDate: '2026-06-21',
    createdAt: '2026-06-21',
    content: `# Why I Moved This Blog Away from MongoDB

For a personal portfolio, a database is not always necessary. A database is useful when posts need to be created through an admin dashboard, edited by multiple users, or updated frequently from an application interface.

But for a portfolio blog, static content is often better.

## Why static works well

A static blog stores posts directly in the codebase. That means the content lives in GitHub, deploys through Vercel, and does not require a separate database service.

The benefits are simple:

- fewer deployment errors
- no database credentials to manage
- faster page rendering
- easier version control
- simpler long-term maintenance

## Tradeoff

The tradeoff is that new posts require a Git commit. For my use case, that is acceptable because blog posts are part of the portfolio itself.

## Final decision

I chose a static blog because it keeps the site lightweight and reliable. If I need a full CMS later, I can add one. For now, GitHub plus Vercel is enough.`,
  },
  {
    _id: 'research-notes-computational-social-science',
    title: 'Research Notes: Computational Social Science and Health Data',
    slug: 'research-notes-computational-social-science-health-data',
    excerpt:
      'A short note on using computational tools for social research, public health analytics, and policy-relevant data work.',
    tags: ['Research', 'Computational Social Science', 'Health Data'],
    publishDate: '2026-06-21',
    createdAt: '2026-06-21',
    content: `# Research Notes: Computational Social Science and Health Data

Computational social science gives researchers a way to study social patterns using data, code, and theory together. For health research, this is especially useful because access, inequality, risk, and behavior are often shaped by social conditions.

## My research direction

My work sits between social research, machine learning, and health analytics. I am interested in how computational tools can help answer practical questions about healthcare access, public health inequality, document intelligence, and policy implementation.

## Why this matters

Health data is not just technical. It reflects institutions, social structures, and lived experience. That is why computational methods should be combined with careful research design and domain knowledge.

## Tools I use

I often work with Python, R, survey data, text data, machine learning models, and reproducible reporting workflows. The goal is not only to build models, but to produce evidence that can be interpreted and used.

## Ongoing focus

I am continuing to build projects around healthcare analytics, DHS survey analysis, NLP systems, and applied computational research.`,
  },
];

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => {
    const bDate = new Date(b.publishDate || b.createdAt).getTime();
    const aDate = new Date(a.publishDate || a.createdAt).getTime();
    return bDate - aDate;
  });
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}

export function getAllBlogTags() {
  return Array.from(new Set(blogPosts.flatMap((post) => post.tags))).sort();
}
