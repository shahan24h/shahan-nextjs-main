import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { getAllBlogPosts, getBlogPostBySlug } from '@/data/blogPosts';

const OLD_OCR_TITLE = 'From BERT to Linear SVM to Pegasos: Building a High-Recall OCR Document Classifier';
const UPDATED_OCR_TITLE = 'Healthcare Data Classification: The Role of Model Selection in Building a Reliable OCR-Based Text Classification Pipeline';

function getDisplayTitle(title: string) {
  return title === OLD_OCR_TITLE ? UPDATED_OCR_TITLE : title;
}

function getDisplayContent(content: string) {
  return content.replace(`# ${OLD_OCR_TITLE}`, `# ${UPDATED_OCR_TITLE}`);
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  const displayTitle = getDisplayTitle(post.title);
  return {
    title: `${displayTitle} | Shahan Ahmed`,
    description: post.excerpt || `Read ${displayTitle} by Shahan Ahmed`,
  };
}

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-12 mb-5 font-serif text-4xl font-semibold leading-tight tracking-tight text-[#191919]">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-11 mb-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-[#191919]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-xl font-bold text-[#191919]">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 font-serif text-[21px] leading-[1.75] text-[#292929]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-7 ml-6 list-disc space-y-3 font-serif text-[21px] leading-[1.7] text-[#292929]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-7 ml-6 list-decimal space-y-3 font-serif text-[21px] leading-[1.7] text-[#292929]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-[#242424] pl-5 font-serif text-2xl italic leading-relaxed text-[#4b463f]">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = !!className;
    return isBlock ? (
      <code className="mb-6 block overflow-x-auto rounded-xl border border-[#ded6c9] bg-[#fffdf8] p-5 text-sm leading-7 text-[#242424] shadow-sm">
        {children}
      </code>
    ) : (
      <code className="rounded bg-[#f0e9dc] px-1.5 py-0.5 text-[0.85em] text-[#242424]">
        {children}
      </code>
    );
  },
  pre: ({ children }) => <div className="my-6">{children}</div>,
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-[#ded6c9] bg-[#fffdf8] shadow-sm">
      <table className="w-full min-w-[620px] border-collapse text-left text-sm text-[#292929]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#f0e9dc] text-[#191919]">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-[#ded6c9]">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => (
    <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#5f5a52]">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="px-4 py-3 align-top text-sm leading-6 text-[#292929]">{children}</td>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#6b4eff] underline decoration-[#6b4eff]/30 underline-offset-4 transition-colors hover:text-[#4a34d4]"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="font-bold text-[#191919]">{children}</strong>,
  em: ({ children }) => <em className="italic text-[#292929]">{children}</em>,
  hr: () => <hr className="my-10 border-[#ded6c9]" />,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const displayTitle = getDisplayTitle(post.title);
  const displayContent = getDisplayContent(post.content);
  const wordCount = displayContent.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#242424]">
      <article className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <Link
          href="/blog"
          className="mb-12 inline-flex items-center gap-2 rounded-full border border-[#d0c7b8] bg-[#fffdf8] px-4 py-2 text-sm font-semibold text-[#5f5a52] transition-colors hover:border-[#242424] hover:text-[#242424]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <header className="border-b border-[#ded6c9] pb-10">
          <div className="mb-7 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className="inline-flex items-center gap-1 rounded-full bg-[#f0e9dc] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#6b5f52] transition-colors hover:bg-[#e8decc]"
              >
                <Tag className="h-3 w-3" />
                {t}
              </Link>
            ))}
          </div>

          <h1 className="font-serif text-5xl font-semibold leading-[1.06] tracking-tight text-[#191919] md:text-6xl">
            {displayTitle}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-xl leading-8 text-[#5f5a52] md:text-2xl md:leading-9">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#242424] font-serif text-xl font-semibold text-white">
              S
            </div>
            <div>
              <p className="text-sm font-semibold text-[#242424]">Shahan Ahmed</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-[#7c7163]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(post.publishDate || post.createdAt), 'MMMM d, yyyy')}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="pt-10">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {displayContent}
          </ReactMarkdown>
        </div>

        <footer className="mt-16 border-t border-[#ded6c9] pt-8">
          <div className="rounded-2xl border border-[#ded6c9] bg-[#fffdf8] p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#7c7163]">
              More writing
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#191919]">
              Read more notes from Shahan Ahmed
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5f5a52]">
              Machine learning, data systems, healthcare analytics, and applied research notes.
            </p>
            <Link
              href="/blog"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#242424] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3a3a3a]"
            >
              All posts
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
