import Link from 'next/link';
import type { Lang } from '@/lib/shared';

type DeepSeekModel = {
  key: 'flash' | 'pro';
  name: string;
  modelId: string;
  version: string;
  description: Record<Lang, string>;
  cacheHitIdle: string;
  cacheHitPeak: string;
  cacheMissIdle: string;
  cacheMissPeak: string;
  outputIdle: string;
  outputPeak: string;
  concurrency: string;
};

const MODELS: DeepSeekModel[] = [
  {
    key: 'flash',
    name: 'DeepSeek V4 Flash',
    modelId: 'deepseek-v4-flash',
    version: 'DeepSeek-V4-Flash-0731',
    description: {
      en: 'High-throughput V4 model with the broadest API-format support.',
      zh: '面向高吞吐场景，并提供更完整 API 格式支持的 V4 模型。',
    },
    cacheHitIdle: '¥0.05',
    cacheHitPeak: '¥0.10',
    cacheMissIdle: '¥1.5',
    cacheMissPeak: '¥3.0',
    outputIdle: '¥4.5',
    outputPeak: '¥9.0',
    concurrency: '2500',
  },
  {
    key: 'pro',
    name: 'DeepSeek V4 Pro',
    modelId: 'deepseek-v4-pro',
    version: 'DeepSeek-V4-Pro-0813',
    description: {
      en: 'Higher-priced V4 tier for demanding reasoning and production workloads.',
      zh: '面向高要求推理与生产负载的 V4 高阶模型。',
    },
    cacheHitIdle: '¥0.15',
    cacheHitPeak: '¥0.30',
    cacheMissIdle: '¥4.5',
    cacheMissPeak: '¥9.0',
    outputIdle: '¥13.5',
    outputPeak: '¥27.0',
    concurrency: '500',
  },
];

const COPY = {
  en: {
    eyebrow: 'DeepSeek V4 models',
    title: 'Two depths of V4 intelligence',
    intro: 'Choose Flash for throughput and API flexibility, or Pro for the higher-capability V4 tier. Idle rates are half of peak.',
    modelId: 'Model ID',
    version: 'Version',
    thinking: 'Thinking',
    thinkingValue: 'Non-thinking + thinking (default)',
    idle: 'Idle',
    peak: 'Peak',
    cacheHit: 'Cached input',
    cacheMiss: 'Uncached input',
    output: 'Output',
    context: 'Context',
    maxOutput: 'Max output',
    concurrency: 'Concurrency',
    responses: 'Responses API',
    responsesValue: 'Supported',
    formats: 'API formats',
    formatsValue: 'OpenAI + Anthropic compatible',
    features: 'Features',
    featuresValue: 'JSON Output, Tool Calls, Anthropic API, prefix completion, FIM (non-thinking only)',
    unit: 'CNY per 1M tokens',
    peakHours: 'Peak hours: Beijing time 09:00–12:00 and 14:00–18:00. All other hours are idle, billed at half the peak rate.',
    checked: 'Official DeepSeek price snapshot checked August 21, 2026. Prices can change.',
    full: 'Explore the complete DeepSeek pricing guide',
  },
  zh: {
    eyebrow: 'DeepSeek V4 模型',
    title: 'V4 智能的两种深度',
    intro: '高吞吐与 API 灵活性选择 Flash，更高阶的 V4 生产负载选择 Pro。空闲时段价格为高峰时段的一半。',
    modelId: '模型 ID',
    version: '模型版本',
    thinking: '思考模式',
    thinkingValue: '非思考 + 思考（默认）',
    idle: '空闲',
    peak: '高峰',
    cacheHit: '缓存命中输入',
    cacheMiss: '缓存未命中输入',
    output: '输出',
    context: '上下文',
    maxOutput: '最大输出',
    concurrency: '并发限制',
    responses: 'Responses API',
    responsesValue: '支持',
    formats: 'API 格式',
    formatsValue: '兼容 OpenAI + Anthropic',
    features: '功能',
    featuresValue: 'JSON Output、Tool Calls、Anthropic API、前缀续写、FIM（仅非思考）',
    unit: '人民币 / 百万 tokens',
    peakHours: '高峰时段为北京时间 9:00–12:00、14:00–18:00，其余为空闲时段，空闲价为高峰价的一半。',
    checked: 'DeepSeek 官方价格快照核验于 2026 年 8 月 21 日，价格可能变化。',
    full: '查看完整 DeepSeek 定价指南',
  },
} as const;

function DepthVisual({ model }: { model: DeepSeekModel }) {
  return (
    <div className={`deepseek-depth deepseek-depth-${model.key}`} aria-hidden="true">
      <div className="deepseek-sonar" />
      <div className="deepseek-current" />
      <span>{model.key === 'flash' ? 'V4 / FLASH' : 'V4 / PRO'}</span>
    </div>
  );
}

function PriceCell({
  label,
  idle,
  peak,
  idleLabel,
  peakLabel,
}: {
  label: string;
  idle: string;
  peak: string;
  idleLabel: string;
  peakLabel: string;
}) {
  return (
    <div className="rounded-lg border border-[#52d4ff]/15 bg-[#0b202b] p-3">
      <dt className="text-[11px] text-text-muted">{label}</dt>
      <dd className="mt-2 space-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[10px] uppercase tracking-wide text-text-muted">{idleLabel}</span>
          <span className="font-mono text-sm font-semibold text-[#bcecff]">{idle}</span>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[10px] uppercase tracking-wide text-text-muted">{peakLabel}</span>
          <span className="font-mono text-sm font-semibold text-[#bcecff]">{peak}</span>
        </div>
      </dd>
    </div>
  );
}

export default function DeepSeekV4Models({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const copy = COPY[lang];
  const guideHref = lang === 'en' ? '/guides/deepseek-v4-models-pricing/' : '/zh/guides/deepseek-v4-models-pricing/';

  return (
    <section className="overflow-hidden rounded-2xl border border-[#52d4ff]/20 bg-[#07151d] shadow-float">
      <div className="border-b border-[#52d4ff]/15 px-6 py-6 md:px-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-[#52d4ff]">{copy.eyebrow}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-h2 text-text-primary">{copy.title}</h2>
            <p className="mt-2 max-w-3xl text-body-sm text-text-secondary">{copy.intro}</p>
          </div>
          <p className="shrink-0 font-mono text-[11px] text-text-muted">{copy.unit}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2">
        {MODELS.map((model) => (
          <article key={model.modelId} className="border-b border-[#52d4ff]/15 p-5 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 md:p-6">
            <DepthVisual model={model} />
            <h3 className="mt-5 text-h3 text-text-primary">{model.name}</h3>
            <p className="mt-1 min-h-10 text-body-sm text-text-secondary">{model.description[lang]}</p>

            <dl className="mt-5 divide-y divide-white-06 border-y border-white-06 text-body-sm">
              {[[copy.modelId, model.modelId], [copy.version, model.version], [copy.thinking, copy.thinkingValue]].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-text-tertiary">{label}</dt>
                  <dd>
                    <code className="rounded-md bg-white-06 px-2 py-1 font-mono text-xs text-text-primary">{value}</code>
                  </dd>
                </div>
              ))}
            </dl>

            <dl className="mt-4 grid grid-cols-3 gap-2">
              <PriceCell label={copy.cacheHit} idle={model.cacheHitIdle} peak={model.cacheHitPeak} idleLabel={copy.idle} peakLabel={copy.peak} />
              <PriceCell label={copy.cacheMiss} idle={model.cacheMissIdle} peak={model.cacheMissPeak} idleLabel={copy.idle} peakLabel={copy.peak} />
              <PriceCell label={copy.output} idle={model.outputIdle} peak={model.outputPeak} idleLabel={copy.idle} peakLabel={copy.peak} />
            </dl>

            <dl className="mt-4 divide-y divide-white-06 border-y border-white-06 text-body-sm">
              {[
                [copy.context, '1M'],
                [copy.maxOutput, '384K'],
                [copy.concurrency, model.concurrency],
                [copy.responses, copy.responsesValue],
                [copy.formats, copy.formatsValue],
                [copy.features, copy.featuresValue],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-5 py-3">
                  <dt className="shrink-0 text-text-tertiary">{label}</dt>
                  <dd className="text-right font-medium text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="border-t border-[#52d4ff]/20 bg-[#0b202b] px-6 py-4 text-body-sm text-[#bcecff]">{copy.peakHours}</div>
      <div className="flex flex-col gap-3 border-t border-white-06 bg-white-04 px-6 py-4 text-caption text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>{copy.checked}</span>
        {compact ? (
          <Link href={guideHref} className="font-semibold text-[#52d4ff] transition-colors hover:text-white">
            {copy.full} →
          </Link>
        ) : null}
      </div>
    </section>
  );
}
