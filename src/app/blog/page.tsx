import Link from 'next/link';
import { ArrowRight, BookOpen, Calendar, Clock, Tag } from 'lucide-react';
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
  const featuredPost = filtered[0];
  const remainingPosts = filtered.slice(1);

  return (
    <main className="min-h-screen bg-[#f7f4ed] text-[#242424]">
      <section className="border-b border-[#ded6c9] bg-[#f7f4ed] pt-28 pb-14 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-[#6b5f52]">
                Shahan Ahmed / Field Notes
              </p>
              <h1 className="font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-[#191919] md:text-7xl">
                Blog & Writing
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5a52] md:text-xl">
                Practical notes on machine learning, NLP systems, healthcare analytics, research design,
                and building reliable data products.
              </p>
            </div>

            <div className="rounded-full border border-[#242424] px-5 py-2 text-sm font-semibold text-[#242424]">
              {posts.length} posts · {allTags.length} topics
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-8">
        {allTags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2 border-b border-[#ded6c9] pb-6">
            <Link
              href="/blog"
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                !activeTag
                  ? 'border-[#242424] bg-[#242424] text-white'
                  : 'border-[#d0c7b8] bg-[#fffdf8] text-[#5f5a52] hover:border-[#242424] hover:text-[#242424]'
              }`}
            >
              All
            </Link>
            {allTags.map((t) => (
              <Link
                key={t}
                href={activeTag === t ? '/blog' : `/blog?tag=${encodeURIComponent(t)}`}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  activeTag === t
                    ? 'border-[#242424] bg-[#242424] text-white'
                    : 'border-[#d0c7b8] bg-[#fffdf8] text-[#5f5a52] hover:border-[#242424] hover:text-[#242424]'
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#ded6c9] bg-[#fffdf8] px-8 py-20 text-center shadow-sm">
            <BookOpen className="mx-auto mb-4 h-10 w-10 text-[#9c9283]" />
            <h2 className="mb-2 font-serif text-3xl font-semibold text-[#191919]">
              {posts.length === 0 ? 'No posts yet' : 'No posts in this topic'}
            </h2>
            <p className="text-[#6b5f52]">
              {posts.length === 0
                ? 'Check back soon for new writing.'
                : 'Try a different tag or view all posts.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            {featuredPost && (
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block rounded-3xl border border-[#ded6c9] bg-[#fffdf8] p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-8 flex items-center justify-between gap-4 text-sm text-[#6b5f52]">
                  <span className="rounded-full border border-[#d0c7b8] px-3 py-1 font-semibold text-[#242424]">
                    Featured
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {getReadTime(featuredPost.content)} min read
                  </span>
                </div>

                <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight text-[#191919] transition-colors group-hover:text-[#6b4eff] md:text-5xl">
                  {featuredPost.title}
                </h2>
                <p className="mt-5 text-lg leading-8 text-[#5f5a52]">
                  {featuredPost.excerpt}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-[#6b5f52]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(featuredPost.publishDate || featuredPost.createdAt), 'MMM d, yyyy')}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[#f0e9dc] px-3 py-1 text-xs font-medium text-[#5f5a52]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#242424]">
                  Read essay
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )}

            <div className="space-y-4">
              {remainingPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className="group block border-b border-[#ded6c9] bg-transparent py-5 transition-colors hover:bg-[#fffdf8]/60 md:px-4"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[#7c7163]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {format(new Date(post.publishDate || post.createdAt), 'MMM d, yyyy')}
                    </span>
                    <span>·</span>
                    <span>{getReadTime(post.content)} min read</span>
                  </div>

                  <h3 className="font-serif text-2xl font-semibold leading-snug text-[#191919] transition-colors group-hover:text-[#6b4eff]">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#5f5a52]">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((t) => (
                      <span key={t} className="inline-flex items-center gap-1 rounded-full bg-[#f0e9dc] px-2.5 py-1 text-xs text-[#6b5f52]">
                        <Tag className="h-3 w-3" />
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
