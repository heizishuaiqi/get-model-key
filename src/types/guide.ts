export interface GuideSource {
  label: string;
  url: string;
  site: string;
  checkedAt: string;
}

export interface GuideSection {
  id: string;
  heading: Record<'en' | 'zh', string>;
  paragraphs: Record<'en' | 'zh', string[]>;
  bullets?: Record<'en' | 'zh', string[]>;
}

export interface GuideFaqItem {
  question: Record<'en' | 'zh', string>;
  answer: Record<'en' | 'zh', string>;
}

export interface GuideArticle {
  slug: string;
  status: 'published' | 'draft';
  topic: 'api-key-setup' | 'troubleshooting' | 'comparison' | 'offers';
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  title: Record<'en' | 'zh', string>;
  excerpt: Record<'en' | 'zh', string>;
  tags: string[];
  providerSlugs: string[];
  sections: GuideSection[];
  faq?: GuideFaqItem[];
  sources: GuideSource[];
  seo?: {
    title: Record<'en' | 'zh', string>;
    description: Record<'en' | 'zh', string>;
  };
}
