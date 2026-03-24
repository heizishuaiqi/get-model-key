import type { Metadata } from 'next';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import PrimaryInverseButton from '@/components/ui/PrimaryInverseButton';
import PillButton from '@/components/ui/PillButton';
import ContactMessageForm from '@/components/forms/ContactMessageForm';

export const metadata: Metadata = {
  title: '联系我们 - Get Model Key',
  description: '联系 Get Model Key，反馈链接错误、补充新提供商或提出产品建议。',
  alternates: {
    canonical: '/zh/contact/',
    languages: {
      en: '/contact/',
      zh: '/zh/contact/',
    },
  },
};

export default function ZhContactPage() {
  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">联系我们</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">
            有问题、建议或信息纠错需求？欢迎通过下方方式与我们联系。
          </p>
        </div>

        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          <Card variant="emphasis" padding="lg">
            <div className="mb-8">
              <h2 className="mb-4 text-h2 text-text-primary">给我们留言</h2>
              <p className="text-body text-text-secondary">
                你可以填写下面的表单，我们会尽快查看并回复。
              </p>
            </div>

            <ContactMessageForm lang="zh" />
          </Card>

          <div className="space-y-8">
            <Card variant="standard" padding="lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                    <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 text-h3 text-text-primary">直接发送邮件</h3>
                  <p className="mb-4 text-body text-text-secondary">如果你习惯邮件沟通，可直接发送到下方邮箱。</p>
                  <a
                    href="mailto:heizishuaiqi@gmail.com"
                    className="inline-flex items-center gap-2 text-h4 text-brand-300 transition-colors hover:text-brand-400"
                  >
                    heizishuaiqi@gmail.com
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </Card>

            <Card variant="standard" padding="lg">
              <h3 className="mb-6 text-h3 text-text-primary">常见问题</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-body font-semibold text-text-primary">如何提交新的提供商？</h4>
                  <p className="text-body-sm text-text-secondary">
                    在表单中选择“新增提供商建议”，并附上平台官网和 API Key 申请页面地址。
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-body font-semibold text-text-primary">发现信息有误怎么办？</h4>
                  <p className="text-body-sm text-text-secondary">
                    请选择“信息纠错”，告诉我们错误项和正确内容，我们会尽快核实更新。
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 text-body font-semibold text-text-primary">一般多久会回复？</h4>
                  <p className="text-body-sm text-text-secondary">
                    常见问题通常会在 48 小时内回复；涉及平台核验的内容可能需要更长时间。
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="standard" padding="lg">
              <h3 className="mb-6 text-h3 text-text-primary">快速入口</h3>
              <div className="space-y-4">
                <Link
                  href="/zh/providers"
                  className="flex items-center justify-between rounded-lg bg-surface-1 p-3 transition-colors hover:bg-surface-2"
                >
                  <span className="text-body text-text-primary">浏览全部供应商</span>
                  <svg className="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/zh/about"
                  className="flex items-center justify-between rounded-lg bg-surface-1 p-3 transition-colors hover:bg-surface-2"
                >
                  <span className="text-body text-text-primary">了解项目定位</span>
                  <svg className="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/zh/privacy"
                  className="flex items-center justify-between rounded-lg bg-surface-1 p-3 transition-colors hover:bg-surface-2"
                >
                  <span className="text-body text-text-primary">查看隐私政策</span>
                  <svg className="h-5 w-5 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-h2 text-text-primary">我们可以帮助你</h2>
            <p className="mx-auto max-w-3xl text-body text-text-secondary">以下是用户最常咨询的几类问题。</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card variant="standard" hover padding="lg" className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="mb-2 text-h4 text-text-primary">新增平台</h3>
              <p className="text-body-sm text-text-secondary">补充目录中尚未收录的模型供应商</p>
            </Card>
            <Card variant="standard" hover padding="lg" className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-h4 text-text-primary">信息纠错</h3>
              <p className="text-body-sm text-text-secondary">反馈失效链接或描述错误</p>
            </Card>
            <Card variant="standard" hover padding="lg" className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-2 text-h4 text-text-primary">功能建议</h3>
              <p className="text-body-sm text-text-secondary">提出产品改进与体验优化建议</p>
            </Card>
            <Card variant="standard" hover padding="lg" className="text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-12">
                <svg className="h-6 w-6 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-h4 text-text-primary">使用支持</h3>
              <p className="text-body-sm text-text-secondary">目录使用过程中的疑问与帮助</p>
            </Card>
          </div>
        </div>

        <Card variant="emphasis" className="text-center">
          <div className="mb-6">
            <h2 className="mb-4 text-h2 text-text-primary">关于 API Key 的说明</h2>
            <p className="mx-auto max-w-2xl text-body text-text-secondary">
              <strong>重要：</strong>Get Model Key 仅提供目录与官方入口导航，不提供 API Key 发放、账户管理或第三方平台技术支持。
              如遇 API Key 申请、计费或权限问题，请联系对应平台官网支持。
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <PrimaryInverseButton href="/zh/providers">浏览供应商</PrimaryInverseButton>
            <PillButton variant="ghost" size="lg" href="/zh/">
              返回首页
            </PillButton>
          </div>
        </Card>
      </main>
    </div>
  );
}
