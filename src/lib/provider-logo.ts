import type { Provider } from '@/types/provider';

export function getProviderLogoUrl(provider: Provider): string {
  return provider.img?.trim() || '';
}

export function getProviderInitials(name: string): string {
  const compact = name.trim();
  if (!compact) return 'AI';

  const words = compact.split(/\s+/).filter(Boolean);
  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return compact.slice(0, 2).toUpperCase();
}
