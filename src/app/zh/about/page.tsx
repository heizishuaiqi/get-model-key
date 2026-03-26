import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import PillButton from '@/components/ui/PillButton';

export const metadata: Metadata = {
  title: '关于 Get Model Key',
  description: '了解 Get Model Key 的定位、原则与服务边界。',
  alternates: {
    canonical: '/zh/about/',
    languages: {
      en: '/about/',
      zh: '/zh/about/',
      'x-default': '/about/',
    },
  },
};

export default function ZhAboutPage() {
  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">关于 Get Model Key</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            我们专注于帮助用户快速找到主流 AI 模型提供商的官方 API Key 页面。
          </p>
        </div>

        <div className="mb-16">
          <Card variant="emphasis" padding="lg">
            <div className="flex flex-col items-start gap-6 md:flex-row">
              <div className="flex-shrink-0">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-12">
                  <svg className="h-8 w-8 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-h2 text-text-primary">我们的使命</h2>
                <p className="text-body text-text-secondary">
                  当用户在接入 AI 工具时，最常卡住的一步就是“去哪里申请 API Key”。
                  Get Model Key 通过整理主流平台的官方入口，帮助你少走弯路，更快完成配置。
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 text-text-primary">我们做什么</h2>
            <p className="mx-auto max-w-3xl text-body text-text-secondary">
              用结构化目录把“找平台、找入口、去申请”这件事做得更直接。
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
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    <svg className="h-5 w-5 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

        <div className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 text-text-primary">我们的原则</h2>
            <p className="mx-auto max-w-3xl text-body text-text-secondary">
              以下原则指导我们持续更新目录质量。
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <Card variant="standard" hover padding="lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-h4 text-text-primary">准确优先</h3>
              <p className="text-body-sm text-text-secondary">优先收录官方入口，并持续做有效性检查。</p>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h3 className="mb-3 text-h4 text-text-primary">保持简洁</h3>
              <p className="text-body-sm text-text-secondary">聚焦“快速找到入口”，避免信息噪音。</p>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="mb-3 text-h4 text-text-primary">透明清晰</h3>
              <p className="text-body-sm text-text-secondary">明确说明我们能做什么、不能做什么。</p>
            </Card>
            <Card variant="standard" hover padding="lg">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-h4 text-text-primary">用户导向</h3>
              <p className="text-body-sm text-text-secondary">每一个页面都围绕“更快完成目标”来设计。</p>
            </Card>
          </div>
        </div>

        <Card variant="emphasis" className="text-center">
          <div className="mb-8">
            <h2 className="mb-4 text-h2 text-text-primary">开始查找官方 API Key</h2>
            <p className="mx-auto max-w-2xl text-body text-text-secondary">
              浏览供应商目录，直接进入目标平台的官方申请页面。
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <PrimaryInverseButton href="/zh/providers">浏览供应商</PrimaryInverseButton>
            <PillButton variant="ghost" size="lg" href="/zh/contact">
              联系我们
            </PillButton>
          </div>
        </Card>
      </main>
    </div>
  );
}
