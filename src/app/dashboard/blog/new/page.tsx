'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import BlogEditor from '@/components/dashboard/BlogEditor';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (saveStatus: 'draft' | 'published') => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const tags = tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const res = (await apiClient.createBlogPost({
        title,
        content,
        excerpt,
        tags,
        status: saveStatus,
      })) as { success?: boolean; message?: string };

      if (res.success) {
        router.push('/dashboard/blog');
      } else {
        setError(res.message || 'Failed to save');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard/blog')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-xl font-bold text-white">New Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setStatus('draft'); handleSave('draft'); }}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded transition-colors disabled:opacity-50"
          >
            <Save size={15} />
            Save Draft
          </button>
          <button
            onClick={() => { setStatus('published'); handleSave('published'); }}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-colors disabled:opacity-50"
          >
            <Eye size={15} />
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white text-lg font-semibold placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Excerpt
          </label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="A short summary shown on the blog listing..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Tags
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="NLP, Machine Learning, Python (comma-separated)"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Content * (Markdown)
          </label>
          <BlogEditor
            value={content}
            onChange={setContent}
            placeholder={`## Introduction\n\nWrite your post here using Markdown...\n\n## Section\n\nAdd content, code blocks, lists, and more.`}
          />
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Status:</span>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            status === 'published' ? 'bg-green-900 text-green-300' : 'bg-amber-900/50 text-amber-300'
          }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
