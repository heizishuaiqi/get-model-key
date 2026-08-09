import Link from 'next/link';
import type { Lang } from '@/lib/shared';

type ClaudeModel = {
  key: 'fable' | 'opus' | 'sonnet' | 'haiku';
  name: string;
  modelId: string;
  description: Record<Lang, string>;
  input: string;
  cache5m: string;
  cache1h: string;
  cacheHit: string;
  output: string;
  context: string;
  maxOutput: string;
  knowledge: string;
  thinking: Record<Lang, string>;
  latency: Record<Lang, string>;
};

const MODELS: ClaudeModel[] = [
  {
    key: 'fable', name: 'Claude Fable 5', modelId: 'claude-fable-5',
    description: { en: 'Anthropic’s most capable broadly released model for long-running agents.', zh: 'Anthropic 广泛发布模型中能力最强，面向长时间运行的智能体。' },
    input: '$10', cache5m: '$12.50', cache1h: '$20', cacheHit: '$1', output: '$50',
    context: '1M', maxOutput: '128K', knowledge: 'Jan 2026',
    thinking: { en: 'Adaptive, always on', zh: '自适应，始终开启' }, latency: { en: 'Slower', zh: '较慢' },
  },
  {
    key: 'opus', name: 'Claude Opus 5', modelId: 'claude-opus-5',
    description: { en: 'Complex agentic coding and enterprise work with adaptive thinking.', zh: '适合复杂智能体编程和企业工作，支持自适应思考。' },
    input: '$5', cache5m: '$6.25', cache1h: '$10', cacheHit: '$0.50', output: '$25',
    context: '1M', maxOutput: '128K', knowledge: 'May 2026',
    thinking: { en: 'Adaptive', zh: '自适应' }, latency: { en: 'Moderate', zh: '中等' },
  },
  {
    key: 'sonnet', name: 'Claude Sonnet 5', modelId: 'claude-sonnet-5',
    description: { en: 'The strongest balance of speed and intelligence, with introductory pricing.', zh: '速度与智能的最佳组合，目前采用推广价格。' },
    input: '$2', cache5m: '$2.50', cache1h: '$4', cacheHit: '$0.20', output: '$10',
    context: '1M', maxOutput: '128K', knowledge: 'Jan 2026',
    thinking: { en: 'Adaptive', zh: '自适应' }, latency: { en: 'Fast', zh: '快' },
  },
  {
    key: 'haiku', name: 'Claude Haiku 4.5', modelId: 'claude-haiku-4-5-20251001',
    description: { en: 'Anthropic’s fastest model with near-frontier intelligence.', zh: 'Anthropic 速度最快、智能接近前沿水平的模型。' },
    input: '$1', cache5m: '$1.25', cache1h: '$2', cacheHit: '$0.10', output: '$5',
    context: '200K', maxOutput: '64K', knowledge: 'Feb 2025',
    thinking: { en: 'Extended thinking', zh: '扩展思考' }, latency: { en: 'Fastest', zh: '最快' },
  },
];

const COPY = {
  en: {
    eyebrow: 'Current Claude model family', title: 'Capability, composed in four voices',
    intro: 'Use Fable for maximum capability, Opus for complex agentic work, Sonnet for balance, or Haiku for speed and cost.',
    modelId: 'Model ID', input: 'Input', cache5m: '5m cache write', cache1h: '1h cache write', cacheHit: 'Cache hit', output: 'Output',
    context: 'Context', maxOutput: 'Max output', knowledge: 'Reliable knowledge', thinking: 'Thinking', latency: 'Latency',
    unit: 'USD per 1M tokens · Claude API', checked: 'Official Anthropic snapshot checked August 10, 2026.',
    sonnetNotice: 'Sonnet 5 introductory input/output pricing is $2/$10 through August 31, 2026. Standard $3/$15 pricing begins September 1, 2026.',
    full: 'Explore the complete Claude pricing guide',
  },
  zh: {
    eyebrow: '当前 Claude 模型家族', title: '四种声部，覆盖不同能力层级',
    intro: '最高能力选择 Fable，复杂智能体工作选择 Opus，平衡场景选择 Sonnet，速度和成本优先选择 Haiku。',
    modelId: '模型 ID', input: '基础输入', cache5m: '5 分钟缓存写入', cache1h: '1 小时缓存写入', cacheHit: '缓存命中', output: '输出',
    context: '上下文', maxOutput: '最大输出', knowledge: '可靠知识截止', thinking: '思考模式', latency: '相对延迟',
    unit: '美元 / 百万 tokens · Claude API', checked: 'Anthropic 官方价格快照核验于 2026 年 8 月 10 日。',
    sonnetNotice: 'Sonnet 5 输入/输出推广价 $2/$10 有效至 2026 年 8 月 31 日；2026 年 9 月 1 日起执行标准价 $3/$15。',
    full: '查看完整 Claude 定价指南',
  },
} as const;

function VoiceVisual({ model }: { model: ClaudeModel }) {
  return (
    <div className={`claude-voice claude-voice-${model.key}`} aria-hidden="true">
      <div className="claude-stave" /><div className="claude-mark" />
      <span>{model.key.charAt(0).toUpperCase() + model.key.slice(1)}</span>
    </div>
  );
}

export default function ClaudeModelFamily({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const copy = COPY[lang];
  const guideHref = lang === 'en' ? '/guides/claude-models-api-pricing/' : '/zh/guides/claude-models-api-pricing/';

  return (
    <section className="overflow-hidden rounded-2xl border border-[#d79b78]/20 bg-[#191310] shadow-float">
      <div className="border-b border-[#d79b78]/15 px-6 py-6 md:px-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-[#e6a57f]">{copy.eyebrow}</p>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div><h2 className="text-h2 text-text-primary">{copy.title}</h2><p className="mt-2 max-w-3xl text-body-sm text-text-secondary">{copy.intro}</p></div>
          <p className="shrink-0 font-mono text-[11px] text-text-muted">{copy.unit}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2">
        {MODELS.map((model) => (
          <article key={model.modelId} className="border-b border-[#d79b78]/15 p-5 odd:md:border-r md:p-6">
            <VoiceVisual model={model} />
            <h3 className="mt-5 text-h3 text-text-primary">{model.name}</h3>
            <p className="mt-1 min-h-10 text-body-sm text-text-secondary">{model.description[lang]}</p>
            <dl className="mt-5 border-y border-white-06 text-body-sm">
              <div className="flex items-center justify-between gap-4 py-3"><dt className="text-text-tertiary">{copy.modelId}</dt><dd><code className="rounded-md bg-white-06 px-2 py-1 font-mono text-xs text-text-primary">{model.modelId}</code></dd></div>
            </dl>
            <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {[[copy.input, model.input], [copy.cache5m, model.cache5m], [copy.cache1h, model.cache1h], [copy.cacheHit, model.cacheHit], [copy.output, model.output]].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-[#d79b78]/15 bg-[#251b17] p-3"><dt className="text-[10px] leading-tight text-text-muted">{label}</dt><dd className="mt-1 font-mono text-sm font-semibold text-[#f0c1a5]">{value}</dd></div>
              ))}
            </dl>
            <dl className="mt-4 divide-y divide-white-06 border-y border-white-06 text-body-sm">
              {[[copy.context, model.context], [copy.maxOutput, model.maxOutput], [copy.knowledge, model.knowledge], [copy.thinking, model.thinking[lang]], [copy.latency, model.latency[lang]]].map(([label, value]) => (
                <div key={label} className="flex items-start justify-between gap-5 py-3"><dt className="shrink-0 text-text-tertiary">{label}</dt><dd className="text-right font-medium text-text-primary">{value}</dd></div>
              ))}
            </dl>
          </article>
        ))}
      </div>
      <div className="border-t border-warning-500/20 bg-warning-500/10 px-6 py-4 text-body-sm text-warning-500">{copy.sonnetNotice}</div>
      <div className="flex flex-col gap-3 border-t border-white-06 bg-white-04 px-6 py-4 text-caption text-text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>{copy.checked}</span>
        {compact ? <Link href={guideHref} className="font-semibold text-[#e6a57f] transition-colors hover:text-white">{copy.full} →</Link> : null}
      </div>
    </section>
  );
}
