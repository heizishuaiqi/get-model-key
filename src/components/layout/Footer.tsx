import Link from 'next/link';

interface FooterProps {
  lang: 'en' | 'zh';
}

export default function Footer({ lang }: FooterProps) {
  const footerLinks = {
    en: [
      { name: 'Offers', href: '/offers/' },
      { name: 'About', href: '/about/' },
      { name: 'Privacy', href: '/privacy/' },
      { name: 'Terms', href: '/terms/' },
      { name: 'Contact', href: '/contact/' },
    ],
    zh: [
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
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left max-w-md">
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
                ? 'This site does not sell API access or replace the official platforms.'
                : '本站不售卖 API，也不替代官方平台。'}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            {currentLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-tertiary hover:text-text-primary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="mt-12 border-t border-white-04 pt-8 text-center">
          <p className="text-sm text-text-tertiary">
            © {currentYear} Get Model Key. {lang === 'en' ? 'All rights reserved.' : '保留所有权利。'}
          </p>
          <p className="mt-2 text-xs text-text-muted">
            {lang === 'en' 
              ? 'Made with ❤️ for the AI community'
              : '为 AI 社区用心打造'}
          </p>
        </div>
      </div>
    </footer>
  );
}
