import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, CircleChevronRight, Clock, Search, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { getAllBlogPosts, getAllBlogTags } from '@/data/blogPosts';

export const metadata = {
  title: 'Blog | Shahan Ahmed',
  description: 'Technical walkthroughs, research digests, and perspectives on ML engineering, NLP, and healthcare AI.',
};

function getReadTime(content: string) {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 200));
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: activeTag } = await searchParams;
  const posts = getAllBlogPosts();
  const allTags = getAllBlogTags();
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;
  const latestPost = posts[0];

  return (
    <main className="min-h-screen bg-[#f2f1ee] text-[#031b35]">
      {/* Journal masthead */}
      <section className="bg-[#061a33] px-6 pt-20 pb-16 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-8">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.34em] text-[#c8d3df]">
              Shahan Ahmed / Research & Technical Writing
            </p>
            <h1 className="font-serif text-5xl font-light uppercase tracking-[0.18em] text-white md:text-6xl lg:text-7xl">
              Field Notes
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
            <Link href="/project" className="border-r border-[#e4e0d7] px-5 py-4 hover:bg-[#f2f1ee]">
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
              From the Writer
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-9 text-[#031b35]">
              This blog is a working notebook for applied machine learning, OCR document intelligence,
              healthcare analytics, data cleaning, and research systems. The focus is practical:
              what worked, what failed, what the metrics showed, and what the data taught me.
            </p>
            {latestPost && (
              <Link
                href={`/blog/${latestPost.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#a00034] hover:text-[#6e0024]"
              >
                Latest article
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </div>

          <aside className="bg-white p-8 shadow-sm">
            <h3 className="mb-6 font-serif text-3xl font-normal text-[#031b35]">About this blog</h3>
            <div className="space-y-3 text-base font-semibold text-[#031b35]">
              <Link href="/blog" className="flex items-center gap-3 hover:text-[#a00034]">
                <CircleChevronRight className="h-4 w-4 fill-[#031b35] text-white" />
                Purpose
              </Link>
              <Link href="/blog" className="flex items-center gap-3 text-[#a00034] hover:text-[#6e0024]">
                <CircleChevronRight className="h-4 w-4 fill-[#a00034] text-white" />
                Articles and technical notes
              </Link>
              <Link href="/research" className="flex items-center gap-3 hover:text-[#a00034]">
                <CircleChevronRight className="h-4 w-4 fill-[#031b35] text-white" />
                Research
              </Link>
              <Link href="/case-studies" className="flex items-center gap-3 hover:text-[#a00034]">
                <CircleChevronRight className="h-4 w-4 fill-[#031b35] text-white" />
                Case studies
              </Link>
            </div>
            <div className="mt-8 border-t border-[#e4e0d7] pt-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#6b6b6b]">
                Index
              </p>
              <p className="mt-2 text-sm leading-6 text-[#34475a]">
                {posts.length} articles · {allTags.length} topics
              </p>
            </div>
          </aside>
        </div>

        {/* Topic filters */}
        {allTags.length > 0 && (
          <div className="mt-14 border-y border-[#d8d4cc] py-5">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  !activeTag
                    ? 'border-[#031b35] bg-[#031b35] text-white'
                    : 'border-[#c9c4bb] bg-white text-[#031b35] hover:border-[#a00034] hover:text-[#a00034]'
                }`}
              >
                All articles
              </Link>
              {allTags.map((t) => (
                <Link
                  key={t}
                  href={activeTag === t ? '/blog' : `/blog?tag=${encodeURIComponent(t)}`}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    activeTag === t
                      ? 'border-[#a00034] bg-[#a00034] text-white'
                      : 'border-[#c9c4bb] bg-white text-[#031b35] hover:border-[#a00034] hover:text-[#a00034]'
                  }`}
                >
                  {t}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Article list */}
        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#6b6b6b]">
                Articles
              </p>
              <h2 className="mt-2 max-w-4xl font-serif text-3xl font-normal leading-tight text-[#031b35] md:text-4xl">
                {activeTag
                  ? activeTag
                  : 'Comparative Evaluation of BERT, TF-IDF Linear SVM, and Pegasos Optimization for OCR-Based Document Classification'}
              </h2>
            </div>
            <span className="font-serif text-sm tracking-[0.15em] text-[#34475a]">
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white px-8 py-16 text-center shadow-sm">
              <BookOpen className="mx-auto mb-4 h-10 w-10 text-[#a59d91]" />
              <h3 className="font-serif text-3xl text-[#031b35]">No articles in this topic</h3>
              <p className="mt-2 text-[#34475a]">Try a different topic or view all articles.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#d8d4cc] border-y border-[#d8d4cc]">
              {filtered.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group grid gap-5 py-8 transition-colors hover:bg-white/70 md:grid-cols-[8rem_1fr_auto] md:px-5"
                >
                  <div className="text-sm font-semibold text-[#34475a]">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(post.publishDate || post.createdAt), 'MMM d, yyyy')}
                    </span>
                    <span className="mt-2 flex items-center gap-2 text-xs text-[#6b6b6b]">
                      <Clock className="h-3.5 w-3.5" />
                      {getReadTime(post.content)} min read
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-3xl font-normal leading-tight text-[#a00034] transition-colors group-hover:text-[#6e0024]">
                      {post.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-7 text-[#031b35]">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((t) => (
                        <span key={t} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-[#34475a] ring-1 ring-[#d8d4cc]">
                          <Tag className="h-3 w-3" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-start md:justify-end">
                    <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-[#031b35] group-hover:text-[#a00034]">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
