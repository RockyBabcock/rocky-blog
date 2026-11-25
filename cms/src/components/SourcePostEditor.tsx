import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  postId: string;
  onClose: () => void;
  onSaved?: () => void;
}

/**
 * Self-contained Markdown source editor for the local CMS.
 * Reads and writes directly via `/api/cms/source` with optimistic concurrency,
 * decoupled from the removed public `/editor` writing room.
 */
export function SourcePostEditor({ postId, onClose, onSaved }: Props) {
  const baselineRef = useRef<string | null>(null);
  const onSavedRef = useRef(onSaved);
  onSavedRef.current = onSaved;

  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [conflict, setConflict] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [confirmClose, setConfirmClose] = useState(false);

  const isDirty = !loading && baselineRef.current !== null && source !== baselineRef.current;

  const loadSource = useCallback(async () => {
    setLoading(true);
    setError('');
    setConflict(false);
    setStatusMessage('');
    try {
      const response = await fetch(`/api/cms/source?postId=${encodeURIComponent(postId)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '无法读取文章');
      baselineRef.current = data.source;
      setSource(data.source);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : '无法读取文章');
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    void loadSource();
  }, [loadSource]);

  const handleSave = useCallback(async () => {
    if (saving || loading || baselineRef.current === null) return;
    setSaving(true);
    setError('');
    setConflict(false);
    setStatusMessage('');
    try {
      const response = await fetch('/api/cms/source', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, source, expectedSource: baselineRef.current }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 409) {
          setConflict(true);
          throw new Error('这篇文章已被其他工具修改。请先复制或下载当前原文，再重新加载文件进行合并。');
        }
        throw new Error(data.error || '保存失败，请复制或下载当前原文。');
      }
      baselineRef.current = data.source;
      setSource(data.source);
      setStatusMessage('已保存到本地文件');
      setConfirmClose(false);
      onSavedRef.current?.();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : '保存失败');
    } finally {
      setSaving(false);
    }
  }, [loading, postId, saving, source]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        void handleSave();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleSave]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(source);
      setStatusMessage('已复制 Markdown 原文');
    } catch {
      setError('复制失败，请手动选中复制或点击下载。');
    }
  };

  const handleDownload = () => {
    const filename = `${postId.split('/').filter(Boolean).at(-1) || 'post'}.md`;
    const url = URL.createObjectURL(new Blob([source], { type: 'text/markdown;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  const handleClose = () => {
    if (isDirty && !confirmClose) {
      setConfirmClose(true);
      return;
    }
    onClose();
  };

  return (
    <div className="bg-background fixed inset-0 z-50 flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-2 text-sm">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" className="hover:text-primary shrink-0 cursor-pointer font-medium" onClick={handleClose}>
            ← 返回文章列表
          </button>
          <span className="text-muted-foreground min-w-0 truncate" title={postId}>
            CMS · {postId}
          </span>
          {isDirty && <span className="rounded bg-amber-500/15 px-2 py-0.5 text-xs text-amber-600">未保存</span>}
          {!isDirty && statusMessage && (
            <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-600">{statusMessage}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={loading}
            className="border-input hover:bg-accent cursor-pointer rounded-md border px-2.5 py-1 text-xs disabled:opacity-50"
          >
            复制原文
          </button>
          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="border-input hover:bg-accent cursor-pointer rounded-md border px-2.5 py-1 text-xs disabled:opacity-50"
          >
            下载 .md
          </button>
          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={loading || saving || !isDirty}
            className="bg-primary text-primary-foreground cursor-pointer rounded-md px-3 py-1 text-xs font-medium disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? '保存中…' : '保存 (Ctrl/⌘+S)'}
          </button>
        </div>
      </div>

      {confirmClose && isDirty && (
        <div className="flex items-center justify-between gap-4 border-b bg-amber-500/10 px-4 py-2 text-xs text-amber-800 dark:text-amber-300">
          <span>当前文件有未保存的修改，确定放弃修改并返回列表吗？</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConfirmClose(false)}
              className="border-input bg-background cursor-pointer rounded border px-2.5 py-1"
            >
              继续编辑
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-destructive text-destructive-foreground cursor-pointer rounded px-2.5 py-1"
            >
              放弃修改并返回
            </button>
          </div>
        </div>
      )}

      {error && (
        <div
          className="bg-destructive/10 text-destructive flex items-center justify-between gap-4 border-b px-4 py-3 text-sm"
          role="alert"
        >
          <span>{error}</span>
          {conflict && (
            <button
              type="button"
              onClick={() => void loadSource()}
              className="border-destructive/40 hover:bg-destructive/10 shrink-0 cursor-pointer rounded border px-2.5 py-1 text-xs"
            >
              重新加载磁盘版本
            </button>
          )}
        </div>
      )}

      {loading ? (
        <output className="text-muted-foreground p-4 text-sm">正在读取文章源文件…</output>
      ) : (
        <textarea
          value={source}
          onChange={(event) => {
            setSource(event.target.value);
            setStatusMessage('');
            setConfirmClose(false);
          }}
          aria-label={`编辑文章 ${postId}`}
          spellCheck={false}
          className="bg-background text-foreground min-h-0 w-full flex-1 resize-none border-0 p-4 font-mono text-sm leading-relaxed outline-none"
        />
      )}
    </div>
  );
}
