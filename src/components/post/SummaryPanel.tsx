/**
 * Summary Panel Component
 *
 * 显示文章手写摘要面板，支持打字机动画展示
 * 支持 prefers-reduced-motion 可访问性
 */

import { ErrorBoundary, InlineErrorFallback } from '@components/common';
import { useMotionLevel } from '@hooks/useMotionLevel';
import { useTranslation } from '@hooks/useTranslation';
import { Icon } from '@iconify/react';
import { cn } from '@lib/utils';
import { memo, type RefObject, useCallback, useEffect, useRef, useState } from 'react';

const SummaryPanelContent = memo(
  ({
    isExpanded,
    summary,
    isTyping,
    textRef,
  }: {
    isExpanded: boolean;
    summary: string;
    isTyping: boolean;
    textRef: RefObject<HTMLSpanElement | null>;
  }) => {
    return (
      <div
        id="summary-panel-content"
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="bg-foreground/5 text-muted-foreground rounded-b-lg px-4 py-4 text-sm leading-relaxed">
            {/* 屏幕阅读器专用 */}
            <span className="sr-only">{summary}</span>

            {/* 视觉展示 - 通过 ref 直接更新 DOM，避免频繁重渲染 */}
            <p aria-hidden="true">
              <span ref={textRef} />
              {isTyping && <span className="typewriter-cursor" />}
            </p>
          </div>
        </div>
      </div>
    );
  },
);

export interface SummaryPanelProps {
  /** 摘要文本 */
  summary: string;
  /** 打字机每个字符的间隔时间（毫秒），默认 25 */
  typingSpeed?: number;
  /** 自定义类名 */
  className?: string;
  /** 页面语言；SSR 岛屿必须传入以避免水合文本不匹配 */
  locale?: string;
}

function SummaryPanel({ summary, typingSpeed = 25, className, locale }: SummaryPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const hasAnimatedRef = useRef(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const textRef = useRef<HTMLSpanElement | null>(null);

  const { t } = useTranslation(locale);
  const label = t('summary.description');

  const motionDisabled = useMotionLevel() === 'reduced';

  // 清理动画
  const clearAnimation = useCallback(() => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  // 使用 requestAnimationFrame 的打字机效果 - 直接操作 DOM
  const startTyping = useCallback(() => {
    if (!textRef.current) return;

    // 如果用户偏好减少动画，或已经播放过动画，直接显示全部
    if (motionDisabled || hasAnimatedRef.current) {
      textRef.current.textContent = summary;
      setIsTyping(false);
      hasAnimatedRef.current = true;
      return;
    }

    setIsTyping(true);
    textRef.current.textContent = '';
    startTimeRef.current = performance.now();

    let previousCharIndex = -1;
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const charIndex = Math.floor(elapsed / typingSpeed);

      if (charIndex < summary.length && textRef.current) {
        if (charIndex !== previousCharIndex) {
          textRef.current.textContent = summary.slice(0, charIndex + 1);
          previousCharIndex = charIndex;
        }
        animationRef.current = requestAnimationFrame(animate);
      } else {
        if (textRef.current) {
          textRef.current.textContent = summary;
        }
        setIsTyping(false);
        hasAnimatedRef.current = true;
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [summary, typingSpeed, motionDisabled]);

  useEffect(() => {
    if (!motionDisabled || !isExpanded) return;
    clearAnimation();
    if (textRef.current) textRef.current.textContent = summary;
    setIsTyping(false);
    hasAnimatedRef.current = true;
  }, [motionDisabled, isExpanded, summary, clearAnimation]);

  // 展开/收起
  const handleToggle = useCallback(() => {
    if (isExpanded) {
      clearAnimation();
      setIsExpanded(false);
      setIsTyping(false);
    } else {
      setIsExpanded(true);
      startTyping();
    }
  }, [isExpanded, clearAnimation, startTyping]);

  // 组件卸载时清理
  useEffect(() => {
    return () => clearAnimation();
  }, [clearAnimation]);

  return (
    <ErrorBoundary FallbackComponent={InlineErrorFallback}>
      <div className={cn('overflow-hidden rounded-lg', className)}>
        {/* 触发按钮 */}
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            'bg-foreground/5 flex w-full cursor-pointer items-center justify-between px-4 py-3 transition-all duration-250',
            'hover:bg-foreground/10',
            isExpanded && 'bg-foreground/10 rounded-t-lg',
            !isExpanded && 'rounded-lg',
          )}
          aria-expanded={isExpanded}
          aria-controls="summary-panel-content"
        >
          <div className="text-muted-foreground flex items-center gap-1.5 text-sm font-medium">
            <Icon icon="ri:book-2-fill" className="text-primary size-4" />
            {label}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={cn('text-muted-foreground size-4 transition-transform duration-300', isExpanded && 'rotate-180')}
            aria-hidden="true"
          >
            <path d="M12 16L6 10H18L12 16Z" />
          </svg>
        </button>
        <SummaryPanelContent isExpanded={isExpanded} summary={summary} isTyping={isTyping} textRef={textRef} />
      </div>
    </ErrorBoundary>
  );
}

export default SummaryPanel;
