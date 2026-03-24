'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';

interface HeaderProps {
  lang: 'en' | 'zh';
}

function normalizePath(path: string): string {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

function isActivePath(currentPath: string, navPath: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(navPath);

  if (target === '/') return current === '/';
  if (target === '/zh') return current === '/zh';

  return current === target || current.startsWith(`${target}/`);
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname() || '/';

  const navigation = {
    en: [
      { name: 'Home', href: '/' },
      { name: 'Providers', href: '/providers' },
      { name: 'About', href: '/about' },
    ],
    zh: [
      { name: '\u9996\u9875', href: '/zh' },
      { name: '\u4f9b\u5e94\u5546', href: '/zh/providers' },
      { name: '\u5173\u4e8e', href: '/zh/about' },
    ],
  };

  const currentNav = navigation[lang];

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-white-04 bg-bg-nav/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg-nav/60">
      <nav className="container-custom flex h-full items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={lang === 'en' ? '/' : '/zh'} className="flex items-center gap-2">
            <span className="text-xl font-bold text-text-primary">Get Model Key</span>
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {currentNav.map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus:outline-none',
                    active
                      ? 'text-brand-300'
                      : 'text-text-primary hover:text-brand-300',
                  ].join(' ')}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLang={lang} />
        </div>
      </nav>
    </header>
  );
}
