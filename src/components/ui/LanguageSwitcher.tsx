'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
  currentLang: 'en' | 'zh';
}

export default function LanguageSwitcher({ currentLang }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || '/';
  const router = useRouter();

  const pathWithoutLang = pathname.replace(/^\/(en|zh)(?=\/|$)/, '');
  const cleanPath = pathWithoutLang === '' ? '/' : pathWithoutLang;

  const languages = [
    { code: 'en', label: 'English', path: cleanPath },
    { code: 'zh', label: '简体中文', path: cleanPath === '/' ? '/zh' : `/zh${cleanPath}` },
  ];

  const handleLanguageClick = (langPath: string) => {
    setIsOpen(false);
    router.push(langPath);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-white-06 bg-white-04 px-4 py-2 hover:bg-white-06 hover:border-white-08 focus:outline-none focus:ring-2 focus:ring-brand-300 focus:ring-offset-2 focus:ring-offset-bg-app backdrop-blur-sm transition-all duration-200"
      >
        <span className="text-sm font-semibold text-text-secondary">
          {currentLang === 'en' ? 'English' : '简体中文'}
        </span>
        <svg
          className={`h-4 w-4 text-text-tertiary transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-44 rounded-xl border border-white-08 bg-surface-1/95 backdrop-blur-xl py-2 shadow-float animate-fade-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageClick(lang.path)}
              className={`block w-full px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                currentLang === lang.code
                  ? 'bg-brand-08 text-brand-300 border-l-2 border-brand-300'
                  : 'text-text-secondary hover:bg-white-04 hover:text-text-primary'
              }`}
            >
              <span className="flex items-center gap-2">
                {lang.label}
                {currentLang === lang.code && (
                  <svg className="h-3 w-3 text-brand-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
