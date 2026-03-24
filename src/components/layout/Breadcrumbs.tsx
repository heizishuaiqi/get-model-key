'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
  lang: 'en' | 'zh';
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

const LABELS = {
  en: {
    home: 'Home',
    about: 'About',
    providers: 'Providers',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms',
  },
  zh: {
    home: '\u9996\u9875',
    about: '\u5173\u4e8e',
    providers: '\u4f9b\u5e94\u5546',
    contact: '\u8054\u7cfb\u6211\u4eec',
    privacy: '\u9690\u79c1\u653f\u7b56',
    terms: '\u670d\u52a1\u6761\u6b3e',
  },
} as const;

function normalizePath(pathname: string): string {
  if (!pathname) return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function humanizeSegment(segment: string): string {
  const decoded = decodeURIComponent(segment);
  return decoded
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getSegmentLabel(segment: string, lang: 'en' | 'zh'): string {
  const labels = LABELS[lang] as Record<string, string>;
  return labels[segment] || humanizeSegment(segment);
}

function buildBreadcrumbs(pathname: string, lang: 'en' | 'zh'): BreadcrumbItem[] {
  const normalized = normalizePath(pathname);
  const rawSegments = normalized.split('/').filter(Boolean);

  const isZhPath = rawSegments[0] === 'zh';
  const contentSegments = isZhPath ? rawSegments.slice(1) : rawSegments;

  const rootHref = lang === 'zh' ? '/zh' : '/';
  const items: BreadcrumbItem[] = [{ label: LABELS[lang].home, href: rootHref }];

  let currentPath = rootHref === '/' ? '' : rootHref;
  for (const segment of contentSegments) {
    currentPath = `${currentPath}/${segment}`;
    items.push({
      label: getSegmentLabel(segment, lang),
      href: currentPath,
    });
  }

  return items;
}

export default function Breadcrumbs({ lang }: BreadcrumbsProps) {
  const pathname = usePathname() || (lang === 'zh' ? '/zh' : '/');
  const items = buildBreadcrumbs(pathname, lang);

  return (
    <nav
      aria-label={lang === 'zh' ? '\u9762\u5305\u5c51\u5bfc\u822a' : 'Breadcrumb'}
      className="container-custom pt-4 pb-2"
    >
      <ol
        className="flex flex-wrap items-center gap-2 text-sm text-text-tertiary"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li
              key={`${item.href}-${item.label}`}
              className="inline-flex items-center gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <span itemProp="name" className="font-medium text-text-primary">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  itemProp="item"
                  className="transition-colors hover:text-brand-300"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              )}
              <meta itemProp="position" content={`${index + 1}`} />
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
