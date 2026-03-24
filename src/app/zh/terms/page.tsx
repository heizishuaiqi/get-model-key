import type { Metadata } from 'next';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: '服务条款',
  description: '阅读 Get Model Key 的服务条款，了解目录服务范围、免责声明与使用边界。',
  alternates: {
    canonical: '/zh/terms/',
    languages: {
      en: '/terms/',
      zh: '/zh/terms/',
    },
  },
};

export default function ZhTermsPage() {
  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">服务条款</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">最后更新：2026 年 3 月 24 日</p>
        </div>

        <Card variant="emphasis" className="mb-12">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning-500/10">
                <svg className="h-6 w-6 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-h3 text-text-primary">重要提示</h2>
              <p className="text-body text-text-secondary">
                Get Model Key 仅提供目录与跳转服务，不直接提供 API Key、模型服务或账号能力。
                你在第三方平台上的操作需遵守其官方条款与政策。
              </p>
            </div>
          </div>
        </Card>

        <div className="prose prose-invert max-w-none">
          <h2>1. 条款接受</h2>
          <p>
            访问并使用本网站即表示你同意遵守本服务条款；若不同意，请停止使用本站服务。
          </p>

          <h2>2. 服务说明</h2>
          <p>
            本站提供 AI 模型供应商目录，主要包括：
          </p>
          <ul>
            <li>供应商信息聚合与基础介绍</li>
            <li>分类与区域整理</li>
            <li>官方 API Key 页面入口导航</li>
          </ul>
          <p>
            <strong>特别说明：</strong>
            本站不提供 API Key 发放，不提供模型推理服务，也不参与第三方平台账号体系。
          </p>

          <h2>3. 用户责任</h2>
          <p>使用本站时，你同意：</p>
          <ul>
            <li>仅将本站用于合法用途</li>
            <li>不尝试攻击、破坏或未授权访问本站服务</li>
            <li>不利用本站从事骚扰、欺诈或其他侵权行为</li>
            <li>在依赖信息前自行进行必要核验</li>
          </ul>

          <h2>4. 外部链接声明</h2>
          <p>本站包含第三方外部链接，关于这些链接：</p>
          <ul>
            <li>我们不对第三方内容的准确性、完整性和时效性作担保</li>
            <li>链接仅作为便捷入口，不构成官方背书</li>
            <li>第三方平台的使用风险与规则由用户自行承担</li>
          </ul>

          <h2>5. 知识产权</h2>
          <p>
            本站原创内容、结构设计与展示逻辑受知识产权保护。未经许可，不得复制、分发或用于商业用途。
          </p>

          <h2>6. 免责声明</h2>
          <p>
            本站按“现状”提供服务，不保证持续无中断、无错误或完全实时更新。
          </p>

          <h2>7. 责任限制</h2>
          <p>
            对因使用或无法使用本站、第三方服务中断、信息错误等造成的间接损失，我们在适用法律允许范围内不承担责任。
          </p>

          <h2>8. 条款调整</h2>
          <p>
            我们可能在必要时更新本条款，更新后将以本页最新版本为准。
          </p>

          <h2>9. 适用法律</h2>
          <p>
            本条款适用网站运营所在地相关法律法规，并在该法律框架内进行解释。
          </p>

          <h2>10. 联系方式</h2>
          <p>如有条款相关问题，请联系：</p>
          <ul>
            <li>
              邮箱：
              <a href="mailto:heizishuaiqi@gmail.com" className="text-brand-300 hover:text-brand-400">
                heizishuaiqi@gmail.com
              </a>
            </li>
            <li>
              通过站内联系页面提交：
              <a href="/zh/contact" className="text-brand-300 hover:text-brand-400">
                /zh/contact
              </a>
            </li>
          </ul>
        </div>

        <Card variant="standard" className="mt-12">
          <div className="text-center">
            <h3 className="mb-4 text-h3 text-text-primary">条款摘要</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="mb-2 text-body font-semibold text-text-primary">目录服务</h4>
                <p className="text-body-sm text-text-secondary">仅提供信息导航与官方入口链接</p>
              </div>
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="mb-2 text-body font-semibold text-text-primary">不提供 API 权限</h4>
                <p className="text-body-sm text-text-secondary">API Key、计费与权限均由官方平台负责</p>
              </div>
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="mb-2 text-body font-semibold text-text-primary">外部规则独立</h4>
                <p className="text-body-sm text-text-secondary">跳转后需遵守第三方平台条款与政策</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
