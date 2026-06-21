import Link from 'next/link';
import { BookOpen, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { getAllBlogPosts, getAllBlogTags } from '@/data/blogPosts';

export const metadata = {
  title: 'Blog | Shahan Ahmed',
  description: 'Technical walkthroughs, research digests, and perspectives on ML engineering, NLP, and healthcare AI.',
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: activeTag } = await searchParams;
  const posts = getAllBlogPosts();
  const allTags = getAllBlogTags();
  const filtered = activeTag ? posts.filter((p) => p.tags.includes(activeTag)) : posts;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="border-b border-gray-800 pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Shahan Ahmed
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">Blog & Writing</h1>
          <p className="text-gray-400 max-w-2xl leading-relaxed">
            Technical walkthroughs, research notes, and practical lessons from ML engineering,
            NLP, healthcare analytics, and computational social science.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-gray-800">
            <div>
              <p className="text-2xl font-bold text-white">{posts.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Published posts</p>
            </div>
            {allTags.length > 0 && (
              <div>
                <p className="text-2xl font-bold text-white">{allTags.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Topics covered</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Tag filter */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/blog"
              className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                !activeTag
                  ? 'border-white bg-white text-gray-900'
                  : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500 hover:text-gray-200'
              }`}
            >
              All
            </Link>
            {allTags.map((t) => (
              <Link
                key={t}
                href={activeTag === t ? '/blog' : `/blog?tag=${encodeURIComponent(t)}`}
                className={`px-3 py-1 rounded-full border text-xs font-medium transition-colors ${
                  activeTag === t
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500 hover:text-gray-200'
                }`}
              >
                {t}
              </Link>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20 border border-gray-800 rounded-xl bg-gray-900">
            <BookOpen className="w-10 h-10 text-gray-700 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              {posts.length === 0 ? 'No posts yet' : 'No posts in this topic'}
            </h2>
            <p className="text-gray-500 text-sm">
              {posts.length === 0
                ? 'Check back soon for new writing.'
                : 'Try a different tag or view all posts.'}
            </p>
          </div>
        ) : (
          <div className="space-y-0 divide-y divide-gray-800 border border-gray-800 rounded-xl overflow-hidden">
            {filtered.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="flex flex-col gap-2 px-6 py-5 bg-gray-900 hover:bg-gray-800/60 transition-colors group"
              >
                <h2 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(post.publishDate || post.createdAt), 'MMM d, yyyy')}
                  </span>
                  {post.tags.map((t) => (
                    <span key={t} className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {t}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
