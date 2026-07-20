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

export async function getRelatedGuides(slug: string, limit = 3): Promise<GuideArticle[]> {
  const guides = await getPublishedGuides();
  const currentGuide = guides.find((guide) => guide.slug === slug);
  if (!currentGuide) return [];

  const sharedProviderGuides = guides.filter(
    (guide) =>
      guide.slug !== slug
      && guide.providerSlugs.some((providerSlug) => currentGuide.providerSlugs.includes(providerSlug))
  );

  if (sharedProviderGuides.length >= limit) {
    return sharedProviderGuides.slice(0, limit);
  }

  const fallbackGuides = guides.filter(
    (guide) => guide.slug !== slug && !sharedProviderGuides.some((item) => item.slug === guide.slug)
  );

  return [...sharedProviderGuides, ...fallbackGuides].slice(0, limit);
}
