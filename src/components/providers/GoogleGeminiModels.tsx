import Link from 'next/link';
import type { Lang } from '@/lib/shared';

type GeminiModel = {
  key: 'prism' | 'pulse' | 'lite';
  name: string;
  modelId: string;
  description: Record<Lang, string>;
  input: string;
  cachedInput: string;
  output: string;
  batchInput: string;
  batchOutput: string;
  priorityInput: string;
  priorityOutput: string;
  latestUpdate: string;
};

const MODELS: GeminiModel[] = [
  {
    key: 'prism',
    name: 'Gemini 3.6 Flash',
    modelId: 'gemini-3.6-flash',
    description: {
      en: 'Google’s latest stable balance of speed and intelligence for agentic and multimodal work.',
      zh: 'Google 最新稳定模型，在速度与智能之间取得平衡，适合智能体和多模态任务。',
    },
    input: '$1.50', cachedInput: '$0.15', output: '$7.50',
    batchInput: '$0.75', batchOutput: '$3.75',
    priorityInput: '$2.70', priorityOutput: '$13.50', latestUpdate: 'Jul 2026',
  },
  {
    key: 'pulse',
    name: 'Gemini 3.5 Flash',
    modelId: 'gemini-3.5-flash',
    description: {
      en: 'Sustained frontier performance for agentic workflows and coding tasks.',
      zh: '面向智能体工作流与编程任务，提供稳定持续的前沿性能。',
    },
    input: '$1.50', cachedInput: '$0.15', output: '$9.00',
    batchInput: '$0.75', batchOutput: '$4.50',
    priorityInput: '$2.70', priorityOutput: '$16.20', latestUpdate: 'May 2026',
  },
  {
    key: 'lite',
    name: 'Gemini 3.5 Flash-Lite',
    modelId: 'gemini-3.5-flash-lite',
    description: {
      en: 'The fastest, most cost-efficient stable 3.5 model for high-throughput execution.',
      zh: 'Gemini 3.5 系列中速度最快、成本最低的稳定模型，适合高吞吐执行。',
    },
    input: '$0.30', cachedInput: '$0.03', output: '$2.50',
    batchInput: '$0.15', batchOutput: '$1.25',
    priorityInput: '$0.54', priorityOutput: '$4.50', latestUpdate: 'Jul 2026',
  },
];

const COPY = {
  en: {
    eyebrow: 'Google Gemini stable models', title: 'Intelligence across the spectrum',
    intro: 'Start with 3.6 Flash for the latest balance, use 3.5 Flash for sustained frontier work, or scale with 3.5 Flash-Lite.',
    modelId: 'Model ID', status: 'Status', stable: 'Stable', input: 'Input', cached: 'Cached input', output: 'Output',
    batch: 'Batch / Flex', priority: 'Priority', inputLimit: 'Input limit', outputLimit: 'Output limit',
    latestUpdate: 'Latest update', capabilities: 'Capabilities',
    capabilityValue: 'Thinking, functions, code execution, file search, Search & Maps grounding, URL context, structured outputs, Computer use (Preview)',
    unit: 'USD per 1M tokens · Paid tier · Standard',
    checked: 'Official Gemini Developer API snapshot checked August 10, 2026. Pricing may change.',
    full: 'Explore the complete Gemini pricing guide',
  },
  zh: {
    eyebrow: 'Google Gemini 稳定模型', title: '覆盖不同负载的智能光谱',
    intro: '最新综合能力选择 3.6 Flash，持续前沿任务选择 3.5 Flash，高吞吐低成本场景选择 3.5 Flash-Lite。',
    modelId: '模型 ID', status: '状态', stable: '稳定版', input: '输入', cached: '缓存输入', output: '输出',
    batch: 'Batch / Flex', priority: 'Priority', inputLimit: '输入上限', outputLimit: '输出上限',
    latestUpdate: '最近更新', capabilities: '能力',
    capabilityValue: 'Thinking、函数调用、代码执行、文件搜索、Search/Maps grounding、URL Context、结构化输出、Computer Use（预览）',
    unit: '美元 / 百万 tokens · 付费层级 · Standard',
    checked: 'Gemini Developer API 官方价格快照核验于 2026 年 8 月 10 日，价格可能变化。',
    full: '查看完整 Gemini 定价指南',
  },
} as const;

function Spectrum({ model }: { model: GeminiModel }) {
  return (
    <div className={`gemini-spectrum gemini-spectrum-${model.key}`} aria-hidden="true">
      <div className="gemini-grid" />
      <div className="gemini-glyph"><span>{model.key === 'prism' ? '3.6' : model.key === 'pulse' ? '3.5' : 'Lite'}</span></div>
    </div>
  );
}

export default function GoogleGeminiModels({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const copy = COPY[lang];
  const guideHref = lang === 'en' ? '/guides/google-gemini-api-pricing/' : '/zh/guides/google-gemini-api-pricing/';

  return (
    <section className="overflow-hidden rounded-2xl border border-white-08 bg-[#11151d] shadow-float">
      <div className="border-b border-white-06 px-6 py-6 md:px-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-[#8ab4f8]">{copy.eyebrow}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div><h2 className="text-h2 text-text-primary">{copy.title}</h2><p className="mt-2 max-w-3xl text-body-sm text-text-secondary">{copy.intro}</p></div>
          <p className="shrink-0 font-mono text-[11px] text-text-muted">{copy.unit}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3">
        {MODELS.map((model) => (
          <article key={model.modelId} className="border-b border-white-06 p-5 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 md:p-6">
            <Spectrum model={model} />
            <h3 className="mt-5 text-h4 text-text-primary">{model.name}</h3>
            <p className="mt-1 min-h-10 text-body-sm text-text-secondary">{model.description[lang]}</p>

            <dl className="mt-5 divide-y divide-white-06 border-y border-white-06 text-body-sm">
              <div className="flex items-center justify-between gap-4 py-3"><dt className="text-text-tertiary">{copy.modelId}</dt><dd><code className="rounded-md bg-white-06 px-2 py-1 font-mono text-xs text-text-primary">{model.modelId}</code></dd></div>
              <div className="flex items-center justify-between gap-4 py-3"><dt className="text-text-tertiary">{copy.status}</dt><dd className="rounded-full border border-[#34a853]/30 bg-[#34a853]/10 px-2 py-0.5 text-xs font-semibold text-[#7bd991]">{copy.stable}</dd></div>
            </dl>

            <dl className="mt-4 grid grid-cols-3 gap-2">
              {[[copy.input, model.input], [copy.cached, model.cachedInput], [copy.output, model.output]].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white-06 bg-white-04 p-3"><dt className="text-[11px] text-text-muted">{label}</dt><dd className="mt-1 font-mono text-sm font-semibold text-text-primary">{value}</dd></div>
              ))}
            </dl>

            <dl className="mt-4 divide-y divide-white-06 border-y border-white-06 text-body-sm">
              {[
                [copy.batch, `${model.batchInput} / ${model.batchOutput}`],
                [copy.priority, `${model.priorityInput} / ${model.priorityOutput}`],
                [copy.inputLimit, '1,048,576'], [copy.outputLimit, '65,536'],
                [copy.latestUpdate, model.latestUpdate], [copy.capabilities, copy.capabilityValue],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-5 py-3"><dt className="shrink-0 text-text-tertiary">{label}</dt><dd className="text-right font-medium text-text-primary">{value}</dd></div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <div className="flex flex-col gap-3 border-t border-white-06 bg-white-04 px-6 py-4 text-caption text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>{copy.checked}</span>
        {compact ? <Link href={guideHref} className="font-semibold text-[#8ab4f8] transition-colors hover:text-white">{copy.full} →</Link> : null}
      </div>
    </section>
  );
}
