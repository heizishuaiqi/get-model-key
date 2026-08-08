'use client';

import { useEffect, useRef } from 'react';

const NATIVE_KEY = 'd1e6c1c05678890f7d0cf4ac282bf3f8';
const NATIVE_SRC = `https://pl30746349.effectivecpmnetwork.com/${NATIVE_KEY}/invoke.js`;

const BANNERS = {
  '300x250': {
    key: '5db3f723679bf17a4a4d668f8c35296a',
    width: 300,
    height: 250,
  },
  '160x600': {
    key: '8e6521dba181016d4915faa6a326ce74',
    width: 160,
    height: 600,
  },
} as const;

type BannerSize = keyof typeof BANNERS;

declare global {
  interface Window {
    atOptions?: Record<string, unknown>;
  }
}

function AdLabel({ lang }: { lang?: 'en' | 'zh' }) {
  return (
    <p className="mb-2 text-center text-caption text-text-muted">
      {lang === 'zh' ? '广告' : 'Advertisement'}
    </p>
  );
}

/** Native Banner — safe to place on any page */
export function AdsterraNative({
  className = '',
  lang = 'en',
}: {
  className?: string;
  lang?: 'en' | 'zh';
}) {
  const ready = useRef(false);

  useEffect(() => {
    if (ready.current) return;
    ready.current = true;

    const container = document.getElementById(`container-${NATIVE_KEY}`);
    if (!container) return;

    if (document.querySelector(`script[data-adsterra="${NATIVE_KEY}"]`)) return;

    const script = document.createElement('script');
    script.async = true;
    script.dataset.cfasync = 'false';
    script.dataset.adsterra = NATIVE_KEY;
    script.src = NATIVE_SRC;
    container.before(script);
  }, []);

  return (
    <aside className={`w-full overflow-hidden ${className}`} aria-label="Advertisement">
      <AdLabel lang={lang} />
      <div id={`container-${NATIVE_KEY}`} />
    </aside>
  );
}

/** Banner units that use window.atOptions — only one size per page */
export function AdsterraBanner({
  size,
  className = '',
  lang = 'en',
}: {
  size: BannerSize;
  className?: string;
  lang?: 'en' | 'zh';
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const config = BANNERS[size];

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.dataset.loaded === '1') return;
    host.dataset.loaded = '1';

    window.atOptions = {
      key: config.key,
      format: 'iframe',
      height: config.height,
      width: config.width,
      params: {},
    };

    const script = document.createElement('script');
    script.src = `https://www.highperformanceformat.com/${config.key}/invoke.js`;
    host.appendChild(script);
  }, [config]);

  return (
    <aside
      className={`flex flex-col items-center overflow-hidden ${className}`}
      aria-label="Advertisement"
      style={{ minHeight: config.height }}
    >
      <AdLabel lang={lang} />
      <div ref={hostRef} style={{ width: config.width, minHeight: config.height }} />
    </aside>
  );
}
