'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface BlogEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const previewComponents: Components = {
  h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h1>,
  h2: ({ children }) => <h2 className="text-xl font-bold text-white mt-5 mb-2">{children}</h2>,
  h3: ({ children }) => <h3 className="text-lg font-semibold text-white mt-4 mb-2">{children}</h3>,
  p: ({ children }) => <p className="text-gray-300 leading-relaxed mb-3 text-sm">{children}</p>,
  ul: ({ children }) => <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3 ml-2 text-sm">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal list-inside text-gray-300 space-y-1 mb-3 ml-2 text-sm">{children}</ol>,
  li: ({ children }) => <li className="text-gray-300 text-sm">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-indigo-500 pl-3 my-3 text-gray-400 italic text-sm">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    const isBlock = !!className;
    return isBlock ? (
      <code className="block bg-gray-900 text-blue-200 p-3 rounded text-xs font-mono overflow-x-auto mb-3 whitespace-pre">
        {children}
      </code>
    ) : (
      <code className="bg-gray-900 text-blue-300 px-1 py-0.5 rounded text-xs font-mono">
        {children}
      </code>
    );
  },
  pre: ({ children }) => <div className="my-3">{children}</div>,
  hr: () => <hr className="border-gray-700 my-4" />,
  strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
  a: ({ href, children }) => (
    <a href={href} className="text-blue-400 underline">{children}</a>
  ),
};

const TOOLBAR = [
  { label: 'B', wrap: ['**', '**'], title: 'Bold' },
  { label: 'I', wrap: ['*', '*'], title: 'Italic' },
  { label: 'H2', wrap: ['\n## ', ''], title: 'Heading 2' },
  { label: 'H3', wrap: ['\n### ', ''], title: 'Heading 3' },
  { label: '`code`', wrap: ['`', '`'], title: 'Inline code' },
  { label: '```', wrap: ['\n```\n', '\n```'], title: 'Code block' },
  { label: '- list', wrap: ['\n- ', ''], title: 'Bullet list' },
  { label: '> quote', wrap: ['\n> ', ''], title: 'Blockquote' },
];

export default function BlogEditor({ value, onChange, placeholder }: BlogEditorProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');

  const insertMarkdown = (before: string, after: string) => {
    const textarea = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const newValue = value.substring(0, start) + before + selected + after + value.substring(end);
    onChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden">
      {/* Tabs + toolbar */}
      <div className="flex items-center gap-0 border-b border-gray-700 bg-gray-800">
        <button
          type="button"
          onClick={() => setTab('write')}
          className={`px-4 py-2.5 text-xs font-semibold transition-colors border-r border-gray-700 ${
            tab === 'write' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setTab('preview')}
          className={`px-4 py-2.5 text-xs font-semibold transition-colors border-r border-gray-700 ${
            tab === 'preview' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Preview
        </button>

        {tab === 'write' && (
          <div className="flex items-center gap-0 px-2 overflow-x-auto">
            {TOOLBAR.map((item) => (
              <button
                key={item.title}
                type="button"
                title={item.title}
                onClick={() => insertMarkdown(item.wrap[0], item.wrap[1])}
                className="px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors whitespace-nowrap font-mono"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === 'write' ? (
        <textarea
          id="blog-content-textarea"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-[480px] p-5 bg-gray-900 text-gray-200 font-mono text-sm resize-none focus:outline-none leading-relaxed"
          placeholder={placeholder || 'Write your post in Markdown...'}
          spellCheck
        />
      ) : (
        <div className="h-[480px] overflow-y-auto p-5 bg-gray-900">
          {value.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={previewComponents}>
              {value}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-600 text-sm italic">Nothing to preview yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
