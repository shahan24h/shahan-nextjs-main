'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  tags: string[];
  status: string;
  publishDate?: string;
  createdAt: string;
}

export default function DashboardBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    apiClient
      .getBlogPosts({ all: true })
      .then((res) => {
        const r = res as { success?: boolean; data?: BlogPost[] };
        if (r.success && r.data) setPosts(r.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      const res = (await apiClient.deleteBlogPost(id)) as { success?: boolean; message?: string };
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(res.message || 'Failed to delete');
      }
    } catch {
      alert('Error deleting post');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-1/4" />
          <div className="h-64 bg-gray-700 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 border border-gray-700 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">
            {posts.length} post{posts.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button
          onClick={() => router.push('/dashboard/blog/new')}
          className="flex items-center space-x-2 mt-4 sm:mt-0 px-4 py-2 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} />
          <span>New Post</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-white">
          <thead className="bg-gray-700 border-b-2 border-gray-600">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-300">Title</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-300">Date</th>
              <th className="p-4 text-sm font-semibold text-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-gray-400">
                  No posts yet. Write your first one!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-700/50">
                  <td className="p-4 align-top max-w-xs">
                    <p className="font-semibold text-white truncate">{post.title}</p>
                    {post.excerpt && (
                      <p className="text-sm text-gray-400 mt-1 line-clamp-1">{post.excerpt}</p>
                    )}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {post.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-700 text-gray-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="p-4 align-top">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        post.status === 'published'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-amber-900/50 text-amber-300'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400 align-top">
                    {format(
                      new Date(post.publishDate || post.createdAt),
                      'MMM d, yyyy'
                    )}
                  </td>
                  <td className="p-4 text-center align-top">
                    <div className="flex items-center justify-center space-x-1">
                      {post.status === 'published' && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:bg-gray-600 rounded"
                          title="View post"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <button
                        onClick={() => router.push(`/dashboard/blog/${post._id}/edit`)}
                        className="p-2 text-indigo-400 hover:bg-gray-600 rounded"
                        title="Edit"
                      >
                        <Edit size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="p-2 text-red-400 hover:bg-gray-600 rounded"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
