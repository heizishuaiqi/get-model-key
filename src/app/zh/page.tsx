import type { Metadata } from 'next';
import Link from 'next/link';
import { getHomepageMetadata } from '@/lib/seo';
import {
  getAllProviders,
  getCategories,
  getHomepageContent
} from '@/lib/providers';
import { getPillarGuides } from '@/lib/guides';
import HeroSection from '@/components/layout/HeroSection';
import CategorySection from '@/components/providers/CategorySection';

export async function generateMetadata(): Promise<Metadata> {
  return getHomepageMetadata('zh');
}

export default async function ZhHomePage() {
  const [providers, categories, homepageContent, pillarGuides] = await Promise.all([
    getAllProviders(),
    getCategories(),
    getHomepageContent('zh'),
    getPillarGuides(),
  ]);

  const sectionOrder = new Map<string, number>();
  for (const [index, slug] of (homepageContent.sections ?? []).entries()) {
    if (typeof slug === 'string') {
      sectionOrder.set(slug, index);
    }
  }
  const sortedCategories = [...categories].sort((a, b) => {
    const orderA = sectionOrder.get(a.slug) ?? Number.MAX_SAFE_INTEGER + a.order;
    const orderB = sectionOrder.get(b.slug) ?? Number.MAX_SAFE_INTEGER + b.order;
    return orderA - orderB;
  });

  return (
    <>
      <HeroSection title={homepageContent.hero.title} subtitle={homepageContent.hero.subtitle} />

      {sortedCategories.map((category) => {
        if (category.slug === 'top-picks') return null;

        const categoryProviders = providers.filter((provider) => provider.categories.includes(category.slug));
        if (categoryProviders.length === 0) return null;

        return (
          <CategorySection
            key={category.slug}
            category={category}
            providers={categoryProviders}
            lang="zh"
          />
        );
      })}

      {/* 指南入口 — 支柱页内链 */}
      {pillarGuides.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <div className="mb-8 text-center">
              <h2 className="mb-3 text-h2 text-text-primary">API Key 指南</h2>
              <p className="mx-auto max-w-2xl text-body text-text-secondary">
                每个主流 AI 模型提供商的逐步教程，从完整指南到具体问题排查。
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {pillarGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/zh/guides/${guide.slug}/`}
                  className="group block rounded-xl border border-white-06 bg-surface-1 p-5 transition-colors hover:bg-surface-2"
                >
                  <div className="mb-2 text-body font-semibold text-text-primary group-hover:text-brand-300">
                    {guide.title.zh}
                  </div>
                  <div className="line-clamp-2 text-body-sm text-text-secondary">{guide.excerpt.zh}</div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/zh/guides/"
                className="inline-flex items-center gap-2 text-body-sm font-semibold text-brand-300 transition-colors hover:text-brand-400"
              >
                浏览全部指南
                <span aria-hidden="true">{'→'}</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container-custom">
          <div
            className="relative rounded-3xl border border-white-08 bg-bg-elevated/80 p-8 backdrop-blur-xl md:p-12 lg:p-16"
            style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.48)' }}
          >
            <div className="text-center">
              <div className="mb-12">
                <h2 className="mb-4 text-h2 text-text-primary">通往 AI 模型的入口</h2>
                <p className="mx-auto max-w-3xl text-body text-text-secondary">
                  我们帮助你找到适合需求的 AI 模型提供商，并直接前往官方 API Key 页面。
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="text-center">
                  <div className="mb-2 text-h1 text-text-primary">{providers.length}</div>
                  <div className="text-caption font-semibold uppercase tracking-wide text-text-tertiary">
                    提供商
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-h1 text-text-primary">{categories.length}</div>
                  <div className="text-caption font-semibold uppercase tracking-wide text-text-tertiary">
                    分类
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-h1 text-text-primary">
                    {providers.reduce((acc, provider) => acc + provider.models.zh.length, 0)}
                  </div>
                  <div className="text-caption font-semibold uppercase tracking-wide text-text-tertiary">
                    模型
                  </div>
                </div>
                <div className="text-center">
                  <div className="mb-2 text-h1 text-text-primary">100%</div>
                  <div className="text-caption font-semibold uppercase tracking-wide text-text-tertiary">
                    官方链接
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 h-24 w-24">
              <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-gradient-to-br from-brand-300/10 to-teal-500/10 blur-xl" />
            </div>
            <div className="absolute bottom-0 left-0 h-24 w-24">
              <div className="absolute bottom-4 left-4 h-16 w-16 rounded-full bg-gradient-to-tr from-brand-300/10 to-teal-500/10 blur-xl" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
