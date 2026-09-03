import type { GuideCta, GuideSection, GuideTable } from '@/types/guide';
import type { Lang } from '@/lib/shared';

export function GuideCtaBlock({ cta, lang }: { cta: GuideCta; lang: Lang }) {
  return (
    <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 p-5">
      <a
        href={cta.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-500 px-5 py-2.5 text-body-sm font-semibold text-white transition-colors hover:bg-brand-400"
      >
        {cta.label[lang]}
        <span className="ml-2" aria-hidden="true">↗</span>
      </a>
      {cta.note?.[lang] ? (
        <p className="mt-3 text-body-sm text-text-secondary">{cta.note[lang]}</p>
      ) : null}
    </div>
  );
}

export function GuideTableBlock({ table, lang }: { table: GuideTable; lang: Lang }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-white-06">
      <table className="w-full min-w-[640px] border-collapse text-left text-body-sm">
        {table.caption?.[lang] ? (
          <caption className="border-b border-white-06 bg-surface-2 px-4 py-3 text-left text-caption text-text-muted">
            {table.caption[lang]}
          </caption>
        ) : null}
        <thead className="bg-surface-2 text-text-primary">
          <tr>
            {table.headers[lang].map((header) => (
              <th key={header} scope="col" className="px-4 py-3 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white-06">
          {table.rows.map((row, rowIndex) => (
            <tr key={`${row[lang][0]}-${rowIndex}`} className="bg-surface-1 align-top">
              {row[lang].map((cell, cellIndex) => (
                <td key={`${cellIndex}-${cell}`} className="px-4 py-3 text-text-secondary">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GuideTableOfContents({ sections, lang }: { sections: GuideSection[]; lang: Lang }) {
  const title = lang === 'en' ? 'In this guide' : '本文目录';

  return (
    <nav aria-label={title} className="mb-8 rounded-xl border border-white-06 bg-surface-1 p-5">
      <h2 className="mb-3 text-body font-semibold text-text-primary">{title}</h2>
      <ol className="grid gap-x-6 gap-y-2 text-body-sm text-text-secondary md:grid-cols-2">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a href={`#${section.id}`} className="transition-colors hover:text-brand-300">
              {index + 1}. {section.heading[lang]}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
