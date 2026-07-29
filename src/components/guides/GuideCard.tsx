import Link from 'next/link';
import type { GuideArticle } from '@/types/guide';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { TOPIC_LABELS, getGuideDetailHref, type Lang } from '@/lib/shared';

const MAX_VISIBLE_TAGS = 3;

interface GuideCardProps {
  guide: GuideArticle;
  lang: Lang;
}

export default function GuideCard({ guide, lang }: GuideCardProps) {
  const href = getGuideDetailHref(guide.slug, lang);

  return (
    <Card
      variant="standard"
      hover
      className="group relative h-full overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
    >
      <Link
        href={href}
        aria-label={lang === 'en' ? `Read guide: ${guide.title.en}` : `阅读指南：${guide.title.zh}`}
        className="absolute inset-0 z-10 rounded-2xl"
      />

      <div className="pointer-events-none relative z-20 flex h-full flex-col">
        <div className="mb-4 flex items-center gap-2">
          {guide.pillar && (
            <Badge variant="success" size="sm">
              {lang === 'en' ? 'Pillar' : '支柱'}
            </Badge>
          )}
          <Badge variant="brand">{TOPIC_LABELS[lang][guide.topic]}</Badge>
          <span className="text-caption text-text-muted">
            {guide.readingMinutes} {lang === 'en' ? 'min read' : '分钟阅读'}
          </span>
        </div>

        <h2 className="mb-3 text-h4 text-text-primary">{guide.title[lang]}</h2>
        <p className="mb-4 line-clamp-3 text-body-sm text-text-secondary">{guide.excerpt[lang]}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {guide.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
            <Badge key={tag} variant="neutral" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
