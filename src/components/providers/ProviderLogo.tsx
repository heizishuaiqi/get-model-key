'use client';

import { useMemo, useState } from 'react';
import type { Provider } from '@/types/provider';
import { getProviderInitials, getProviderLogoUrl } from '@/lib/provider-logo';

interface ProviderLogoProps {
  provider: Provider;
  lang: 'en' | 'zh';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASS = {
  sm: 'h-8 w-8 rounded-sm',
  md: 'h-10 w-10 rounded-sm',
  lg: 'h-12 w-12 rounded-sm',
} as const;

export default function ProviderLogo({
  provider,
  lang,
  size = 'md',
  className = '',
}: ProviderLogoProps) {
  const providerName = provider.name[lang];
  const logoAlt =
    lang === 'en' ? `${providerName} logo` : `${providerName} Logo`;
  const logoUrl = useMemo(() => getProviderLogoUrl(provider), [provider]);
  const [loadFailed, setLoadFailed] = useState(false);

  const logoSrc = !loadFailed ? logoUrl : '';
  const initials = getProviderInitials(providerName);
  const shellClass = `flex shrink-0 items-center justify-center overflow-hidden border border-white-06 bg-surface-1 ${SIZE_CLASS[size]} ${className}`.trim();

  if (!logoSrc) {
    return (
      <div className={shellClass} aria-hidden="true">
        <span className="text-xs font-semibold text-text-tertiary">{initials}</span>
      </div>
    );
  }

  return (
    <div className={shellClass} aria-hidden="true">
      <img
        src={logoSrc}
        alt={logoAlt}
        className="h-full w-full object-contain bg-white"
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => setLoadFailed(true)}
      />
    </div>
  );
}
