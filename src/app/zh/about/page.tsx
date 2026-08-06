import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import PillButton from '@/components/ui/PillButton';
import { baseUrl } from '@/lib/root-metadata';
import { buildWebPageStructuredData } from '@/lib/seo';
import { getSiteConfig } from '@/lib/providers';

export const metadata: Metadata = {
  title: '关于 Get Model Key',
  description: '了解 Get Model Key —— 一个基于实测的 AI 模型 API Key 入口目录站，由开发者 Heizi 维护，拥有真实的 API 集成经验。',
  alternates: {
    canonical: '/zh/about/',
    languages: {
      en: '/about/',
      zh: '/zh/about/',
      'x-default': '/about/',
    },
  },
  openGraph: {
    type: 'article',
    url: `${baseUrl}/zh/about/`,
    title: '关于 Get Model Key',
    description: '了解 Get Model Key —— 一个基于实测的 AI 模型 API Key 入口目录站，由开发者 Heizi 维护。',
    siteName: 'Get Model Key',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于 Get Model Key',
    description: '了解 Get Model Key —— 一个基于实测的 AI 模型 API Key 入口目录站。',
  },
};

export default async function ZhAboutPage() {
  const siteConfig = await getSiteConfig();
  const author = siteConfig.author;

  const webPageStructuredData = {
    ...buildWebPageStructuredData('关于 Get Model Key', `${baseUrl}/zh/about/`, 'zh'),
    ...(author ? {
      author: {
        '@type': 'Person',
        name: author.name,
        description: author.bio.zh,
      },
    } : {}),
  };

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageStructuredData) }}
        />
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">关于 Get Model Key</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            一个基于实测的 AI 模型 API Key 入口目录站 —— 每篇指南都基于真实的 API 集成经验。
          </p>
        </div>

        {/* 作者信息 */}
        {author && (
          <div className="mb-16">
            <Card variant="emphasis" padding="lg">
              <div className="flex flex-col items-start gap-6 md:flex-row">
                <div className="flex-shrink-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-12">
                    <span className="text-3xl font-bold text-brand-300">{author.name.charAt(0)}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="mb-2 text-h2 text-text-primary">{author.name}</h2>
                  <p className="mb-4 text-body-sm font-semibold text-brand-300">{author.role.zh}</p>
                  <p className="mb-4 text-body text-text-secondary">{author.bio.zh}</p>
                  <div className="flex flex-wrap gap-4 text-body-sm text-text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="h-4 w-4 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {author.experience.zh}
                    </span>
                    {author.social?.github && (
                      <a
                        href={author.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-brand-300 transition-colors hover:text-brand-400"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 为什么做这个站 */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="mb-4 text-h2 text-text-primary">为什么做这个站</h2>
          </div>
          <div className="space-y-4">
            <p className="text-body text-text-secondary">
              我最初开始接入 AI 模型时，花了好几个小时寻找各家供应商把 API Key 页面藏在了哪里。
              OpenAI 放在平台的 "API Keys" 下，Anthropic 埋在 Console 里，Google 根据你用的是 AI Studio
              还是 Vertex AI 有两条不同的路径。中国的供应商如 DeepSeek、Moonshot 各有自己的后台，导航结构各不相同。
            </p>
            <p className="text-body text-text-secondary">
              我建 Get Model Key 就是为了彻底解决这个问题 —— 一个目录站，直接链接到每家供应商的官方 API Key 页面，
              配上基于亲身经验的操作指南。
            </p>
            <p className="text-body text-text-secondary">
              这里的每篇指南都是在我真正注册了账号、生成了真实 API Key、跑了测试代码之后写的。
              如果有什么变化 —— 控制台更新了、价格变了、新模型出了 —— 我就会更新指南。
            </p>
          </div>
        </div>

        {/* 编辑流程 */}
        {siteConfig.editorialProcess && (
          <div className="mb-16">
            <Card variant="standard" padding="lg">
              <h2 className="mb-4 text-h2 text-text-primary">编辑流程</h2>
              <p className="mb-6 text-body text-text-secondary">{siteConfig.editorialProcess.zh}</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300">1</div>
                  <div>
                    <h3 className="mb-1 text-body font-semibold text-text-primary">注册并测试</h3>
                    <p className="text-body-sm text-text-secondary">我们用真实账号注册并生成实际的 API Key</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300">2</div>
                  <div>
                    <h3 className="mb-1 text-body font-semibold text-text-primary">运行代码</h3>
                    <p className="text-body-sm text-text-secondary">我们编写并执行测试请求，验证 API 可用</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300">3</div>
                  <div>
                    <h3 className="mb-1 text-body font-semibold text-text-primary">完整记录</h3>
                    <p className="text-body-sm text-text-secondary">我们记录截图、定价、错误信息和技巧</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-12 text-caption font-bold text-brand-300">4</div>
                  <div>
                    <h3 className="mb-1 text-body font-semibold text-text-primary">季度复核</h3>
                    <p className="text-body-sm text-text-secondary">我们至少每 3 个月重新检查所有指南</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* 我们的使命 */}
        <div className="mb-16">
          <Card variant="emphasis" padding="lg">
            <div className="flex flex-col items-start gap-6 md:flex-row">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-12">
                  <svg className="h-8 w-8 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-h2 text-text-primary">我们的使命</h2>
                <p className="text-body text-text-secondary">
                  当用户在接入 AI 工具时，最常卡住的一步就是"去哪里申请 API Key"。
                  Get Model Key 通过整理主流平台的官方入口，帮助你少走弯路，更快完成配置。
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* 我们做什么 */}
        <div className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 text-text-primary">我们做什么</h2>
            <p className="mx-auto max-w-3xl text-body text-text-secondary">
              用结构化目录把"找平台、找入口、去申请"这件事做得更直接。
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="standard" hover padding="lg">
              <div className="text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-12">
                  <span className="text-xl font-bold text-brand-300">1</span>
                </div>
                <h3 className="mb-3 text-h4 text-text-primary">聚合</h3>
                <p className="text-body-sm text-text-secondary">汇总主流 AI 模型平台</p>
              </div>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-12">
                  <span className="text-xl font-bold text-brand-300">2</span>
                </div>
                <h3 className="mb-3 text-h4 text-text-primary">分类</h3>
                <p className="text-body-sm text-text-secondary">按区域与类型组织供应商</p>
              </div>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-12">
                  <span className="text-xl font-bold text-brand-300">3</span>
                </div>
                <h3 className="mb-3 text-h4 text-text-primary">直达</h3>
                <p className="text-body-sm text-text-secondary">一键跳转官方 API Key 页面</p>
              </div>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="text-center">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-12">
                  <span className="text-xl font-bold text-brand-300">4</span>
                </div>
                <h3 className="mb-3 text-h4 text-text-primary">提效</h3>
                <p className="text-body-sm text-text-secondary">降低搜索成本，节省配置时间</p>
              </div>
            </Card>
          </div>
        </div>

        {/* 我们不做什么 */}
        <div className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 text-text-primary">我们不做什么</h2>
            <p className="mx-auto max-w-3xl text-body text-text-secondary">
              我们清晰划定边界，避免误导用户。
            </p>
          </div>
          <Card variant="standard" padding="lg">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-body font-semibold text-text-primary">不售卖 API Key</h3>
                  <p className="text-body-sm text-text-secondary">我们不出售 API Key，也不提供代开服务。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-body font-semibold text-text-primary">不替代官方平台</h3>
                  <p className="text-body-sm text-text-secondary">账户注册、计费和权限管理都以官方平台为准。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-body font-semibold text-text-primary">不托管模型服务</h3>
                  <p className="text-body-sm text-text-secondary">我们不提供推理接口，也不承载模型运行。</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500/10">
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-body font-semibold text-text-primary">不强制用户登录</h3>
                  <p className="text-body-sm text-text-secondary">浏览目录不需要注册账户。</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 联系方式 */}
        <Card variant="emphasis" className="text-center">
          <div className="mb-8">
            <h2 className="mb-4 text-h2 text-text-primary">联系我们</h2>
            <p className="mx-auto max-w-2xl text-body text-text-secondary">
              发现链接失效？知道我们应该收录的供应商？对 API 接入有疑问？
              随时联系 —— 每封邮件我都会看。
            </p>
            <p className="mt-4 text-body-sm text-text-muted">
              邮箱：<a href={`mailto:${siteConfig.contactEmail}`} className="text-brand-300 hover:text-brand-400">{siteConfig.contactEmail}</a>
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <PrimaryInverseButton href="/zh/providers/">浏览供应商</PrimaryInverseButton>
            <PillButton variant="ghost" size="lg" href="/zh/contact/">联系我们</PillButton>
          </div>
        </Card>
      </main>
    </div>
  );
}
