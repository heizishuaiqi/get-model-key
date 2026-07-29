'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { normalizePath, type Lang } from '@/lib/shared';

interface HeaderProps {
  lang: Lang;
}

const NAVIGATION = {
  en: [
    { name: 'Home', href: '/' },
    { name: 'Providers', href: '/providers/' },
    { name: 'Guides', href: '/guides/' },
    { name: 'Offers', href: '/offers/' },
    { name: 'About', href: '/about/' },
  ],
  zh: [
    { name: '首页', href: '/zh/' },
    { name: '供应商', href: '/zh/providers/' },
    { name: '指南', href: '/zh/guides/' },
    { name: '福利专题', href: '/zh/offers/' },
    { name: '关于', href: '/zh/about/' },
  ],
} as const;

function isActivePath(currentPath: string, navPath: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(navPath);

  if (target === '/') return current === '/';
  if (target === '/zh') return current === '/zh';

  return current === target || current.startsWith(`${target}/`);
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname() || '/';
  const currentNav = NAVIGATION[lang];

  return (
    <header className="sticky top-0 z-50 h-20 border-b border-white-04 bg-bg-nav/80 backdrop-blur-xl supports-[backdrop-filter]:bg-bg-nav/60">
      <nav className="container-custom flex h-full items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href={lang === 'en' ? '/' : '/zh'} className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Get Model Key logo"
              width={48}
              height={48}
              className="h-12 w-12 rounded-sm object-contain"
              priority
            />
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
                    'inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-brand-300/40 focus:ring-offset-2 focus:ring-offset-bg-nav',
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
