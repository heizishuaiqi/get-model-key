'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { normalizePath, type Lang } from '@/lib/shared';

interface BreadcrumbsProps {
  lang: Lang;
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

const LABELS: Record<Lang, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    providers: 'Providers',
    guides: 'Guides',
    offers: 'Offers',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms',
  },
  zh: {
    home: '首页',
    about: '关于',
    providers: '供应商',
    guides: '指南',
    offers: '福利专题',
    contact: '联系我们',
    privacy: '隐私政策',
    terms: '服务条款',
  },
};

function humanizeSegment(segment: string): string {
  const decoded = decodeURIComponent(segment);
  return decoded
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getSegmentLabel(segment: string, lang: Lang): string {
  const labels = LABELS[lang];
  return labels[segment] || humanizeSegment(segment);
}

function buildBreadcrumbs(pathname: string, lang: Lang): BreadcrumbItem[] {
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
      aria-label={lang === 'zh' ? '面包屑导航' : 'Breadcrumb'}
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
              key={item.href}
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
                  className="transition-colors hover:text-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-300/40 focus:ring-offset-2 focus:ring-offset-bg-app rounded"
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
