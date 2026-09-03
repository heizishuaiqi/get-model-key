export interface GuideSource {
  label: string;
  url: string;
  site: string;
  checkedAt: string;
}

export interface GuideCodeBlock {
  language: string;
  code: string;
  caption?: Record<'en' | 'zh', string>;
}

export interface GuideCta {
  label: Record<'en' | 'zh', string>;
  href: string;
  note?: Record<'en' | 'zh', string>;
}

export interface GuideTable {
  caption?: Record<'en' | 'zh', string>;
  headers: Record<'en' | 'zh', string[]>;
  rows: Array<Record<'en' | 'zh', string[]>>;
}

export interface GuideSection {
  id: string;
  heading: Record<'en' | 'zh', string>;
  paragraphs: Record<'en' | 'zh', string[]>;
  bullets?: Record<'en' | 'zh', string[]>;
  codeBlocks?: GuideCodeBlock[];
  table?: GuideTable;
  cta?: GuideCta;
}

export interface GuideFaqItem {
  question: Record<'en' | 'zh', string>;
  answer: Record<'en' | 'zh', string>;
}

export interface GuideArticle {
  slug: string;
  status: 'published' | 'draft';
  topic: 'api-key-setup' | 'troubleshooting' | 'comparison' | 'offers' | 'basics';
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  coverImage?: Record<'en' | 'zh', string>;
  coverImageAlt?: Record<'en' | 'zh', string>;
  primaryCta?: GuideCta;
  title: Record<'en' | 'zh', string>;
  excerpt: Record<'en' | 'zh', string>;
  tags: string[];
  providerSlugs: string[];
  sections: GuideSection[];
  faq?: GuideFaqItem[];
  sources: GuideSource[];
  /** Marks this article as a pillar page (hub page for a content cluster) */
  pillar?: boolean;
  /** Cluster identifier — groups pillar + cluster articles together (e.g. "openai", "gemini", "deepseek") */
  cluster?: string;
  /** Slug of the pillar page this article belongs to (for back-linking) */
  pillarSlug?: string;
  seo?: {
    title: Record<'en' | 'zh', string>;
    description: Record<'en' | 'zh', string>;
  };
}
