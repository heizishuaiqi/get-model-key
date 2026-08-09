import Link from 'next/link';
import type { Lang } from '@/lib/shared';

type FrontierModel = {
  key: 'sol' | 'terra' | 'luna';
  name: string;
  modelId: string;
  alias?: string;
  description: Record<Lang, string>;
  input: string;
  cachedInput: string;
  cacheWrite: string;
  output: string;
  maxOutput: string;
  contextWindow: string;
  knowledgeCutoff: string;
  tools: Record<Lang, string>;
};

const MODELS: FrontierModel[] = [
  {
    key: 'sol',
    name: 'GPT-5.6 Sol',
    modelId: 'gpt-5.6-sol',
    alias: 'gpt-5.6',
    description: {
      en: 'Frontier reasoning and coding for complex professional work.',
      zh: '面向复杂专业任务的前沿推理与编程模型。',
    },
    input: '$5.00',
    cachedInput: '$0.50',
    cacheWrite: '$6.25',
    output: '$30.00',
    maxOutput: '128K tokens',
    contextWindow: '1.05M',
    knowledgeCutoff: 'Feb 16, 2026',
    tools: {
      en: 'Functions, Web search, File search, Computer use',
      zh: '函数调用、网页搜索、文件搜索、计算机操作',
    },
  },
  {
    key: 'terra',
    name: 'GPT-5.6 Terra',
    modelId: 'gpt-5.6-terra',
    description: {
      en: 'Balanced intelligence and cost for everyday production workloads.',
      zh: '在智能水平与成本之间取得平衡，适合日常生产负载。',
    },
    input: '$2.00',
    cachedInput: '$0.20',
    cacheWrite: '$2.50',
    output: '$12.00',
    maxOutput: '128K tokens',
    contextWindow: '1.05M',
    knowledgeCutoff: 'Feb 16, 2026',
    tools: {
      en: 'Functions, Web search, File search, Computer use',
      zh: '函数调用、网页搜索、文件搜索、计算机操作',
    },
  },
  {
    key: 'luna',
    name: 'GPT-5.6 Luna',
    modelId: 'gpt-5.6-luna',
    description: {
      en: 'Cost-sensitive, high-volume intelligence with frontier-family controls.',
      zh: '适合成本敏感、高调用量场景，并保留前沿系列的控制能力。',
    },
    input: '$0.20',
    cachedInput: '$0.02',
    cacheWrite: '$0.25',
    output: '$1.20',
    maxOutput: '128K tokens',
    contextWindow: '1.05M',
    knowledgeCutoff: 'Feb 16, 2026',
    tools: {
      en: 'Functions, Web search, File search, Computer use',
      zh: '函数调用、网页搜索、文件搜索、计算机操作',
    },
  },
];

const COPY = {
  en: {
    eyebrow: 'OpenAI frontier family',
    title: 'Three orbits. One model family.',
    intro: 'Choose Sol for maximum capability, Terra for balance, or Luna for cost-sensitive scale.',
    modelId: 'Model ID',
    alias: 'Alias',
    reasoning: 'Reasoning',
    input: 'Input',
    cached: 'Cached input',
    cacheWrite: 'Cache write',
    output: 'Output',
    maxOutput: 'Max output',
    contextWindow: 'Context window',
    knowledgeCutoff: 'Knowledge cutoff',
    tools: 'Tools',
    unit: 'USD per 1M tokens · Standard · short context',
    checked: 'Price snapshot checked August 10, 2026. Verify final charges with OpenAI.',
    full: 'Explore the complete pricing guide',
  },
  zh: {
    eyebrow: 'OpenAI 前沿模型家族',
    title: '三种轨道，同一模型家族',
    intro: '复杂任务选择 Sol，能力与成本平衡选择 Terra，高并发低成本场景选择 Luna。',
    modelId: '模型 ID',
    alias: '别名',
    reasoning: '推理强度',
    input: '输入',
    cached: '缓存输入',
    cacheWrite: '缓存写入',
    output: '输出',
    maxOutput: '最大输出',
    contextWindow: '上下文窗口',
    knowledgeCutoff: '知识截止日期',
    tools: '工具能力',
    unit: '美元 / 百万 tokens · Standard · 短上下文',
    checked: '价格快照核验于 2026 年 8 月 10 日，最终费用请以 OpenAI 为准。',
    full: '查看完整定价指南',
  },
} as const;

function ModelOrb({ model }: { model: FrontierModel }) {
  return (
    <div className={`frontier-orbit frontier-orbit-${model.key}`} aria-hidden="true">
      <div className="frontier-stars" />
      <div className="frontier-planet" />
      <span>{model.key === 'sol' ? 'Sol' : model.key === 'terra' ? 'Terra' : 'Luna'}</span>
    </div>
  );
}

export default function OpenAIFrontierModels({
  lang,
  compact = false,
}: {
  lang: Lang;
  compact?: boolean;
}) {
  const copy = COPY[lang];
  const guideHref = lang === 'en' ? '/guides/openai-api-pricing/' : '/zh/guides/openai-api-pricing/';

  return (
    <section className="overflow-hidden rounded-2xl border border-white-08 bg-[#101513] shadow-float">
      <div className="border-b border-white-06 px-6 py-6 md:px-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-brand-300">{copy.eyebrow}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-h2 text-text-primary">{copy.title}</h2>
            <p className="mt-2 max-w-3xl text-body-sm text-text-secondary">{copy.intro}</p>
          </div>
          <p className="shrink-0 font-mono text-[11px] text-text-muted">{copy.unit}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3">
        {MODELS.map((model) => (
          <article key={model.modelId} className="border-b border-white-06 p-5 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 md:p-6">
            <ModelOrb model={model} />
            <div className="mt-5">
              <h3 className="text-h4 text-text-primary">{model.name}</h3>
              <p className="mt-1 min-h-10 text-body-sm text-text-secondary">{model.description[lang]}</p>
            </div>

            <dl className="mt-5 divide-y divide-white-06 border-y border-white-06 text-body-sm">
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-text-tertiary">{copy.modelId}</dt>
                <dd><code className="rounded-md bg-white-06 px-2 py-1 font-mono text-xs text-text-primary">{model.modelId}</code></dd>
              </div>
              {model.alias ? (
                <div className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-text-tertiary">{copy.alias}</dt>
                  <dd><code className="rounded-md bg-white-06 px-2 py-1 font-mono text-xs text-text-primary">{model.alias}</code></dd>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="text-text-tertiary">{copy.reasoning}</dt>
                <dd className="flex flex-wrap justify-end gap-1">
                  {['none', 'low', 'medium', 'high', 'xhigh', 'max'].map((level) => (
                    <span key={level} className="rounded border border-white-08 bg-white-04 px-1.5 py-0.5 font-mono text-[10px] text-text-secondary">{level}</span>
                  ))}
                </dd>
              </div>
            </dl>

            <dl className="mt-4 grid grid-cols-2 gap-2">
              {[
                [copy.input, model.input],
                [copy.cached, model.cachedInput],
                [copy.cacheWrite, model.cacheWrite],
                [copy.output, model.output],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-white-06 bg-white-04 p-3">
                  <dt className="text-[11px] text-text-muted">{label}</dt>
                  <dd className="mt-1 font-mono text-sm font-semibold text-text-primary">{value}</dd>
                </div>
              ))}
            </dl>

            <dl className="mt-4 divide-y divide-white-06 border-y border-white-06 text-body-sm">
              {[
                [copy.maxOutput, model.maxOutput],
                [copy.contextWindow, model.contextWindow],
                [copy.knowledgeCutoff, model.knowledgeCutoff],
                [copy.tools, model.tools[lang]],
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

      <div className="flex flex-col gap-3 border-t border-white-06 bg-white-04 px-6 py-4 text-caption text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>{copy.checked}</span>
        {compact ? <Link href={guideHref} className="font-semibold text-brand-300 transition-colors hover:text-brand-400">{copy.full} →</Link> : null}
      </div>
    </section>
  );
}
