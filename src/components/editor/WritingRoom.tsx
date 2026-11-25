import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { useEffect, useMemo, useState } from 'react';

const DRAFT_STORAGE_KEY = 'koharu-writing-room-draft-v1';

const DEFAULT_DRAFT = `---
title: 新文章草稿
date: ${new Date().toISOString().slice(0, 10)}
categories:
  - 随笔
tags:
  - Markdown
  - Koharu
---

# 你好，小春写作室

在这里撰写你的 Markdown 文章，右侧将实时预览渲染效果，内容会自动保存到本地浏览器存储中。

## 常用语法示例

- 支持 **粗体**、*斜体*、\`行内代码\` 与 [链接](https://astro.build)
- 支持代码块、引用块与任务列表

> 保持好奇，持续写作。

\`\`\`ts
export function greet(name: string) {
  return \`Hello, \${name}!\`;
}
\`\`\`
`;

function stripFrontmatter(md: string): string {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '');
}

export default function WritingRoom() {
  const { t } = useTranslation();
  const [content, setContent] = useState(DEFAULT_DRAFT);
  const [savedNotice, setSavedNotice] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) setContent(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, content);
        setSavedNotice(true);
        window.setTimeout(() => setSavedNotice(false), 1200);
      } catch {
        // ignore
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, [content]);

  const previewHtml = useMemo(() => {
    const body = stripFrontmatter(content);
    const raw = marked.parse(body, { async: false }) as string;
    return DOMPurify.sanitize(raw);
  }, [content]);

  const wordCount = useMemo(() => {
    const body = stripFrontmatter(content).replace(/\s+/g, '');
    return body.length;
  }, [content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'draft.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 shadow-card">
        <div className="flex items-center gap-2">
          <Icon icon="ri:quill-pen-line" className="h-5 w-5 text-primary" />
          <h1 className="font-bold text-base text-foreground">{t('editor.title')}</h1>
          <span className="text-xs text-muted-foreground tabular-nums">
            ({t('post.wordCount', { count: wordCount })})
          </span>
          {savedNotice && <span className="text-xs text-primary">{t('editor.saved')}</span>}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-lg bg-muted p-0.5 text-xs">
            {(['edit', 'split', 'preview'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={`rounded-md px-2.5 py-1 capitalize transition-colors ${
                  viewMode === mode ? 'bg-card font-semibold text-primary shadow-xs' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Icon icon={copied ? 'ri:check-line' : 'ri:file-copy-line'} className="h-3.5 w-3.5" />
            {copied ? t('common.copied') : t('common.copy')}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
          >
            <Icon icon="ri:download-2-line" className="h-3.5 w-3.5" />
            {t('editor.export')}
          </button>
        </div>
      </div>

      <div
        className={`grid gap-4 ${
          viewMode === 'split' ? 'grid-cols-2 md:grid-cols-1' : 'grid-cols-1'
        }`}
      >
        {viewMode !== 'preview' && (
          <div className="flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-card">
            <div className="border-b border-border/60 bg-muted/40 px-4 py-2 font-medium text-xs text-muted-foreground">
              Markdown
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('editor.placeholder')}
              spellCheck={false}
              className="min-h-[60vh] w-full resize-y bg-transparent p-4 font-mono text-sm leading-6 text-foreground outline-none"
            />
          </div>
        )}

        {viewMode !== 'edit' && (
          <div className="flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-card">
            <div className="border-b border-border/60 bg-muted/40 px-4 py-2 font-medium text-xs text-muted-foreground">
              {t('editor.preview')}
            </div>
            <article
              className="prose prose-sm dark:prose-invert max-w-none p-5"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
