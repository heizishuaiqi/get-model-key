import type { Metadata } from 'next';
import Card from '@/components/ui/Card';

export const metadata: Metadata = {
  title: '隐私政策',
  description: '了解 Get Model Key 如何处理访问数据与外部链接相关隐私说明。',
  alternates: {
    canonical: '/zh/privacy/',
    languages: {
      en: '/privacy/',
      zh: '/zh/privacy/',
      'x-default': '/privacy/',
    },
  },
};

export default function ZhPrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      <main className="container-custom py-8 md:py-12 lg:py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-h1 text-text-primary">隐私政策</h1>
          <p className="mx-auto max-w-3xl text-body text-text-secondary">最后更新：2026 年 3 月 24 日</p>
        </div>

        <Card variant="emphasis" className="mb-12">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-info-500/10">
                <svg className="h-6 w-6 text-info-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="mb-3 text-h3 text-text-primary">重要说明</h2>
              <p className="text-body text-text-secondary">
                Get Model Key 是一个目录导航站点，主要提供跳转至第三方平台官方页面的链接。
                我们尽量减少数据采集，不要求用户注册账号。
              </p>
            </div>
          </div>
        </Card>

        <div className="prose prose-invert max-w-none">
          <h2>1. 我们收集的信息</h2>
          <p>
            <strong>最小化采集原则：</strong>
            我们仅在必要范围内收集匿名技术数据，用于保障网站运行与改进体验。
          </p>

          <h3>1.1 技术信息</h3>
          <p>可能包含以下匿名数据：</p>
          <ul>
            <li>浏览器类型与版本</li>
            <li>操作系统信息</li>
            <li>来源页面与访问路径</li>
            <li>页面停留时长与访问频次</li>
            <li>大致地区（国家/城市级，非精准定位）</li>
          </ul>

          <h3>1.2 我们不收集的信息</h3>
          <ul>
            <li>姓名、手机号等个人身份信息</li>
            <li>支付信息（本站不处理任何支付）</li>
            <li>社交账号标识</li>
            <li>可直接识别个人身份的敏感数据</li>
          </ul>

          <h2>2. 数据用途</h2>
          <p>我们使用有限数据来：</p>
          <ul>
            <li>监控网站稳定性和性能</li>
            <li>优化页面可读性与导航效率</li>
            <li>识别并修复链接或内容问题</li>
            <li>了解目录使用趋势（不针对个人）</li>
          </ul>

          <h2>3. 第三方服务与外部链接</h2>
          <h3>3.1 外部网站</h3>
          <p>
            本站包含大量外部链接（模型提供商官网、控制台或文档）。
            当你跳转后，将受对应平台隐私政策与条款约束。
          </p>

          <h3>3.2 分析工具</h3>
          <p>
            我们可能使用以隐私为导向的统计工具，不进行跨站个人追踪。
          </p>

          <h2>4. 数据安全</h2>
          <p>
            我们采取合理措施保护有限数据安全。但互联网传输无法保证绝对安全。
          </p>

          <h2>5. 你的权利</h2>
          <ul>
            <li>匿名访问本站服务</li>
            <li>无需提交个人信息</li>
            <li>可使用隐私保护工具（如无痕、VPN）访问本站</li>
          </ul>

          <h2>6. 儿童隐私</h2>
          <p>
            本站不面向 13 岁以下儿童，亦不会有意收集儿童个人信息。
          </p>

          <h2>7. 政策更新</h2>
          <p>
            若本政策发生重要调整，我们会在本页更新“最后更新”日期。
          </p>

          <h2>8. 联系我们</h2>
          <p>
            若你对隐私政策有疑问，请通过
            <a href="/zh/contact"> 联系页面</a>
            与我们沟通。
          </p>
        </div>

        <Card variant="standard" className="mt-12">
          <div className="text-center">
            <h3 className="mb-4 text-h3 text-text-primary">隐私摘要</h3>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="mb-2 text-body font-semibold text-text-primary">无需账号</h4>
                <p className="text-body-sm text-text-secondary">无需注册与登录即可使用</p>
              </div>
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="mb-2 text-body font-semibold text-text-primary">最小化数据</h4>
                <p className="text-body-sm text-text-secondary">只记录匿名技术信息</p>
              </div>
              <div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-12">
                  <svg className="h-5 w-5 text-brand-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="mb-2 text-body font-semibold text-text-primary">外部平台独立</h4>
                <p className="text-body-sm text-text-secondary">跳转后的隐私规则以第三方为准</p>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
