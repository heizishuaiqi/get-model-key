import Link from 'next/link';
import type { Lang } from '@/lib/shared';
import type { SiteAuthor } from '@/types/provider';

interface AuthorBylineProps {
  author?: SiteAuthor;
  lang: Lang;
  publishedAt?: string;
  updatedAt?: string;
}

/**
 * Displays an author byline with name, role, and dates.
 * Used on guide pages to establish E-E-A-T signals for AdSense.
 */
export default function AuthorByline({ author, lang, publishedAt, updatedAt }: AuthorBylineProps) {
  if (!author) return null;

  const labels = {
    en: {
      by: 'By',
      published: 'Published',
      updated: 'Updated',
      verified: 'Hands-on tested',
    },
    zh: {
      by: '作者',
      published: '发布于',
      updated: '更新于',
      verified: '实测验证',
    },
  };

  const t = labels[lang];

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-body-sm text-text-secondary">
      <span className="inline-flex items-center gap-1.5">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300"
          aria-hidden="true"
        >
          {author.name.charAt(0)}
        </span>
        <span>
          <span className="text-text-muted">{t.by} </span>
          <span className="font-semibold text-text-primary">{author.name}</span>
        </span>
        {author.role && (
          <span className="text-text-muted">· {author.role[lang]}</span>
        )}
      </span>
      {publishedAt && (
        <span className="text-text-muted">
          · {t.published}: {publishedAt}
        </span>
      )}
      {updatedAt && updatedAt !== publishedAt && (
        <span className="text-text-muted">
          · {t.updated}: {updatedAt}
        </span>
      )}
      <span className="inline-flex items-center gap-1 rounded-full bg-brand-12 px-2 py-0.5 text-caption text-brand-300">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {t.verified}
      </span>
    </div>
  );
}
