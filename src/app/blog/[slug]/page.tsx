import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { getAllBlogPosts, getBlogPostBySlug } from '@/data/blogPosts';

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Shahan Ahmed`,
    description: post.excerpt || `Read ${post.title} by Shahan Ahmed`,
  };
}

const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-white mt-10 mb-4 leading-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-white mt-8 mb-3 leading-tight">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-white mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-gray-300 space-y-1.5 mb-4 ml-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-gray-300 space-y-1.5 mb-4 ml-2">{children}</ol>
  ),
  li: ({ children }) => <li className="text-gray-300 leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 text-gray-400 italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = !!className;
    return isBlock ? (
      <code className="block bg-gray-800 border border-gray-700 text-blue-200 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4 whitespace-pre">
        {children}
      </code>
    ) : (
      <code className="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => <div className="my-4">{children}</div>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline transition-colors"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  em: ({ children }) => <em className="text-gray-300 italic">{children}</em>,
  hr: () => <hr className="border-gray-800 my-8" />,
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const wordCount = post.content.trim().split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors mb-10 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-gray-800">
          <h1 className="text-3xl font-bold text-white leading-tight mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-gray-400 text-lg leading-relaxed mb-5">{post.excerpt}</p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {format(new Date(post.publishDate || post.createdAt), 'MMMM d, yyyy')}
            </span>
            <span>{readTime} min read</span>
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/blog?tag=${encodeURIComponent(t)}`}
                className="flex items-center gap-1 hover:text-gray-300 transition-colors"
              >
                <Tag className="w-3 h-3" />
                {t}
              </Link>
            ))}
          </div>
        </header>

        {/* Content */}
        <article>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            All posts
          </Link>
        </footer>
      </div>
    </main>
  );
}
