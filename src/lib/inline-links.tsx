import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Lang } from '@/lib/shared';
import { getGuideDetailHref, getProviderDetailHref } from '@/lib/shared';

/**
 * Parse paragraph text for inline link markers and render as React nodes.
 *
 * Supported link syntax in paragraph text:
 *   [[guide:slug|link text]]  → links to /guides/slug/ (or /zh/guides/slug/)
 *   [[provider:slug|link text]] → links to /providers/slug/ (or /zh/providers/slug/)
 *   [[url|link text]]         → external link (opens in new tab)
 *
 * Text without link markers is returned as-is.
 */

const LINK_PATTERN = /\[\[(guide|provider):([^|]+)\|([^\]]+)\]\]/g;
const EXT_LINK_PATTERN = /\[\[(https?:[^|]+)\|([^\]]+)\]\]/g;

interface ParsedSegment {
  type: 'text' | 'internal' | 'external';
  text: string;
  href?: string;
  linkType?: 'guide' | 'provider';
  slug?: string;
}

function parseParagraph(text: string): ParsedSegment[] {
  const segments: ParsedSegment[] = [];
  let lastIndex = 0;

  // Combine both patterns
  const combinedPattern = new RegExp(
    LINK_PATTERN.source + '|' + EXT_LINK_PATTERN.source,
    'g'
  );

  let match: RegExpExecArray | null;
  while ((match = combinedPattern.exec(text)) !== null) {
    // Add preceding text
    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: text.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // Internal link: guide or provider
      segments.push({
        type: 'internal',
        text: match[3],
        linkType: match[1] as 'guide' | 'provider',
        slug: match[2],
      });
    } else if (match[4]) {
      // External link
      segments.push({
        type: 'external',
        text: match[5],
        href: match[4],
      });
    }

    lastIndex = combinedPattern.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({ type: 'text', text: text.slice(lastIndex) });
  }

  return segments;
}

/**
 * Render a paragraph string, converting any inline link markers to React <Link> components.
 * Falls back to plain text when no markers are present.
 */
export function renderParagraphWithLinks(paragraph: string, lang: Lang): ReactNode {
  const segments = parseParagraph(paragraph);

  if (segments.length === 1 && segments[0].type === 'text') {
    return paragraph;
  }

  return (
    <>
      {segments.map((seg, index) => {
        if (seg.type === 'text') {
          return <span key={index}>{seg.text}</span>;
        }

        if (seg.type === 'internal' && seg.linkType && seg.slug) {
          const href =
            seg.linkType === 'guide'
              ? getGuideDetailHref(seg.slug, lang)
              : getProviderDetailHref(seg.slug, lang);
          return (
            <Link
              key={index}
              href={href}
              className="text-brand-300 transition-colors hover:text-brand-400"
            >
              {seg.text}
            </Link>
          );
        }

        if (seg.type === 'external' && seg.href) {
          return (
            <a
              key={index}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-300 transition-colors hover:text-brand-400"
            >
              {seg.text}
            </a>
          );
        }

        return <span key={index}>{seg.text}</span>;
      })}
    </>
  );
}
