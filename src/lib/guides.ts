import fs from 'fs/promises';
import path from 'path';
import type { GuideArticle } from '@/types/guide';

const guidesDir = path.join(process.cwd(), 'src/data/guides');

function sortByUpdatedDate(a: GuideArticle, b: GuideArticle): number {
  return b.updatedAt.localeCompare(a.updatedAt);
}

export async function getAllGuides(): Promise<GuideArticle[]> {
  const files = await fs.readdir(guidesDir);
  const guides = await Promise.all(
    files
      .filter((file) => file.endsWith('.json'))
      .map(async (file) => {
        const filePath = path.join(guidesDir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(content) as GuideArticle;
      })
  );

  return guides.sort(sortByUpdatedDate);
}

export async function getPublishedGuides(): Promise<GuideArticle[]> {
  const guides = await getAllGuides();
  return guides.filter((guide) => guide.status === 'published');
}

export async function getGuideBySlug(slug: string): Promise<GuideArticle | null> {
  const filePath = path.join(guidesDir, `${slug}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as GuideArticle;
  } catch {
    return null;
  }
}

export async function getGuidesByProviderSlug(providerSlug: string): Promise<GuideArticle[]> {
  const guides = await getPublishedGuides();
  return guides.filter((guide) => guide.providerSlugs.includes(providerSlug));
}

/**
 * Get cross-cluster guides — articles from OTHER clusters that share providers
 * or topics. Used for the "More Guides" section to avoid duplicating cluster
 * siblings already shown in the "In This Series" block.
 */
export async function getCrossClusterGuides(slug: string, limit = 3): Promise<GuideArticle[]> {
  const guides = await getPublishedGuides();
  const currentGuide = guides.find((guide) => guide.slug === slug);
  if (!currentGuide) return [];

  // Priority 1: shared provider articles from OTHER clusters
  const sharedProviderGuides = guides.filter(
    (guide) =>
      guide.slug !== slug
      && guide.cluster !== currentGuide.cluster
      && guide.providerSlugs.some((providerSlug) => currentGuide.providerSlugs.includes(providerSlug))
  );

  if (sharedProviderGuides.length >= limit) {
    return sharedProviderGuides.slice(0, limit);
  }

  // Priority 2: same topic from OTHER clusters
  const sameTopicGuides = guides.filter(
    (guide) =>
      guide.slug !== slug
      && guide.cluster !== currentGuide.cluster
      && !sharedProviderGuides.some((item) => item.slug === guide.slug)
      && guide.topic === currentGuide.topic
  );

  const combined = [...sharedProviderGuides, ...sameTopicGuides];
  if (combined.length >= limit) {
    return combined.slice(0, limit);
  }

  // Priority 3: fallback to any guide from OTHER clusters
  const fallbackGuides = guides.filter(
    (guide) =>
      guide.slug !== slug
      && guide.cluster !== currentGuide.cluster
      && !combined.some((item) => item.slug === guide.slug)
  );

  return [...combined, ...fallbackGuides].slice(0, limit);
}

/** Get all pillar pages */
export async function getPillarGuides(): Promise<GuideArticle[]> {
  const guides = await getPublishedGuides();
  return guides.filter((guide) => guide.pillar === true);
}

/** Get the pillar page for a given cluster */
export async function getPillarByCluster(cluster: string): Promise<GuideArticle | null> {
  const guides = await getPublishedGuides();
  return guides.find((guide) => guide.pillar === true && guide.cluster === cluster) ?? null;
}

/** Get all cluster articles (non-pillar) for a given cluster */
export async function getClusterArticles(cluster: string): Promise<GuideArticle[]> {
  const guides = await getPublishedGuides();
  return guides.filter(
    (guide) => guide.cluster === cluster && guide.pillar !== true
  );
}

/**
 * Get articles in the same cluster as the given slug (including the pillar).
 * @param limit Maximum number of siblings to return (default 4, per SEO methodology)
 */
export async function getClusterSiblings(slug: string, limit = 4): Promise<GuideArticle[]> {
  const guides = await getPublishedGuides();
  const currentGuide = guides.find((guide) => guide.slug === slug);
  if (!currentGuide?.cluster) return [];

  // Prioritize pillar page first, then most recently updated
  const siblings = guides
    .filter((guide) => guide.cluster === currentGuide.cluster && guide.slug !== slug)
    .sort((a, b) => {
      if (a.pillar && !b.pillar) return -1;
      if (!a.pillar && b.pillar) return 1;
      return b.updatedAt.localeCompare(a.updatedAt);
    });

  return siblings.slice(0, limit);
}

/**
 * Get the pillar guide for a given article slug via its pillarSlug field.
 * Returns null if the article has no pillarSlug or the pillar doesn't exist.
 */
export async function getPillarForGuide(slug: string): Promise<GuideArticle | null> {
  const guide = await getGuideBySlug(slug);
  if (!guide?.pillarSlug) return null;
  return getGuideBySlug(guide.pillarSlug);
}

/** Cluster label map for display */
export const CLUSTER_LABELS: Record<string, Record<'en' | 'zh', string>> = {
  openai: { en: 'OpenAI', zh: 'OpenAI' },
  claude: { en: 'Claude', zh: 'Claude' },
  gemini: { en: 'Gemini', zh: 'Gemini' },
  deepseek: { en: 'DeepSeek', zh: 'DeepSeek' },
  'china-ai': { en: 'China AI Models', zh: '中国 AI 模型' },
  'ai-basics': { en: 'AI Basics', zh: 'AI 基础' },
  grok: { en: 'Grok', zh: 'Grok' },
  siliconflow: { en: 'SiliconFlow', zh: '硅基流动' },
};

/** Get cluster order for consistent display */
export const CLUSTER_ORDER = ['openai', 'claude', 'gemini', 'grok', 'deepseek', 'china-ai', 'siliconflow', 'ai-basics'];

/**
 * Get all published guides grouped by cluster, with pillar pages first.
 * Returns an array of { cluster, label, pillar, articles } sorted by CLUSTER_ORDER.
 */
export async function getGuidesGroupedByCluster(): Promise<{
  cluster: string;
  pillar: GuideArticle | null;
  articles: GuideArticle[];
}[]> {
  const guides = await getPublishedGuides();
  const clusters = new Set(guides.filter((g) => g.cluster).map((g) => g.cluster!));

  return CLUSTER_ORDER
    .filter((c) => clusters.has(c))
    .map((cluster) => {
      const clusterGuides = guides.filter((g) => g.cluster === cluster);
      const pillar = clusterGuides.find((g) => g.pillar) ?? null;
      const articles = clusterGuides.filter((g) => !g.pillar);
      return { cluster, pillar, articles };
    });
}
