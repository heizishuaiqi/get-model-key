import Link from 'next/link';

interface FooterProps {
  lang: 'en' | 'zh';
}

export default function Footer({ lang }: FooterProps) {
  const footerLinks = {
    en: [
      { name: 'Guides', href: '/guides/' },
      { name: 'Offers', href: '/offers/' },
      { name: 'About', href: '/about/' },
      { name: 'Privacy', href: '/privacy/' },
      { name: 'Terms', href: '/terms/' },
      { name: 'Contact', href: '/contact/' },
    ],
    zh: [
      { name: '指南', href: '/zh/guides/' },
      { name: '福利专题', href: '/zh/offers/' },
      { name: '关于', href: '/zh/about/' },
      { name: '隐私政策', href: '/zh/privacy/' },
      { name: '服务条款', href: '/zh/terms/' },
      { name: '联系我们', href: '/zh/contact/' },
    ],
  };

  const currentLinks = footerLinks[lang];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white-04 bg-bg-elevated">
      <div className="container-custom py-12">
        <div className="max-w-md text-center md:text-left">
          <div className="mb-4">
            <span className="text-xl font-bold text-text-primary">Get Model Key</span>
          </div>
          <p className="text-sm text-text-secondary">
            {lang === 'en'
              ? 'Get Model Key helps users find official entry pages for major AI model providers.'
              : 'Get Model Key 帮助用户查找主流 AI 模型平台的官方入口页面。'}
          </p>
          <p className="mt-2 text-xs text-text-tertiary">
            {lang === 'en'
              ? 'This site does not sell API access or replace official platforms.'
              : '本站不售卖 API，也不替代任何官方平台。'}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 md:justify-start">
          {currentLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-text-tertiary transition-colors duration-200 hover:text-text-primary"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 border-t border-white-04 pt-8 text-center md:text-left">
          <p className="text-sm text-text-tertiary">
            © {currentYear} Get Model Key. {lang === 'en' ? 'All rights reserved.' : '保留所有权利。'}
          </p>
          <p className="mt-2 text-xs text-text-muted">
            {lang === 'en' ? 'Made for the AI developer community' : '为 AI 开发者社区而建'}
          </p>
        </div>
      </div>
    </footer>
  );
}
