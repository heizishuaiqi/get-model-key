# GetModelKey — Google Trends 数据分析与内容图谱规划

> 数据来源：Google Trends 搜索 "get model key"（2026年7月）
> 分析日期：2026-07-28
> 用途：指导内容图谱设计、支柱页/集群文章选题与发布优先级

---

## 一、原始数据

### 表1：相关查询（上升最快）

| 关键词 | 搜索热度 | 变化率 |
|---|---|---|
| kimi k3 | 0 | +4850% |
| what is a prompt? | 0 | +2100% |
| ai chat bots vs search engines | 0 | +1600% |
| what are hallucinations? | 0 | +1150% |
| 3 main steps of a good prompt | 0 | +1100% |
| walmart near me | 2 | +180% |
| get deepseek api key | 4 | +80% |
| deepseek api | 4 | +70% |
| deepseek api key | 4 | +60% |
| google docs | 5 | +50% |
| google ai studio | 7 | +50% |
| opencode | 2 | +50% |
| deepseek | 5 | +50% |
| ollama models | 1 | +30% |
| gemini models | 2 | +20% |
| how to get deepseek api key | 2 | +20% |
| open ai api key | 4 | +10% |
| openrouter | 5 | +9% |
| open ai | 7 | +5% |
| how to get in shape | 3 | +5% |
| google api key | 21 | +3% |
| kimi api key | 2 | +2% |

### 表2：相关查询（热度排名）

| 关键词 | 搜索热度 | 变化率 |
|---|---|---|
| api key | 100 | -7% |
| how to get api key | 48 | -20% |
| openai | 31 | -3% |
| tesla | 24 | -30% |
| google api key | 21 | +3% |
| claude | 19 | -20% |
| openai api | 17 | -7% |
| openai api key | 17 | -10% |
| google ai | 15 | -10% |
| gemini api | 14 | -9% |
| gemini api key | 14 | -7% |
| get gemini api key | 13 | -10% |
| claude api key | 13 | -20% |
| google gemini | 11 | -2% |
| gemini ai | 10 | -6% |
| tesla model y | 10 | -30% |
| google gemini api key | 8 | -5% |
| how to get claude api key | 8 | -10% |
| how to get openai api key | 8 | -30% |
| what is a public key | 8 | -10% |
| nvidia | 8 | -7% |
| google ai studio | 7 | +50% |
| open ai | 7 | +5% |
| ollama | 6 | -20% |
| how to get license | 6 | -20% |
| anthropic api key | 6 | -40% |
| google docs | 5 | +50% |
| how to get gemini api key | 5 | -50% |
| openrouter | 5 | +9% |
| deepseek | 5 | +50% |
| what is an api key | 5 | -6% |
| chatgpt api key | 4 | -30% |
| hugging face | 4 | -5% |
| deepseek api key | 4 | +60% |
| get deepseek api key | 4 | +80% |
| openrouter api | 4 | -9% |
| open ai api key | 4 | +10% |
| deepseek api | 4 | +70% |
| openrouter api key | 3 | -20% |
| grok | 3 | -30% |
| how to get anthropic api key | 3 | -50% |
| opencode | 2 | +50% |
| gemini models | 2 | +20% |
| grok api | 2 | -40% |
| how to get deepseek api key | 2 | +20% |
| n8n | 2 | -40% |
| kimi api key | 2 | +2% |

---

## 二、噪声词过滤

以下关键词与 "get model key" 主题无关，已排除：

- tesla / tesla model y（汽车品牌）
- walmart near me（超市）
- how to get in shape（健身）
- how to get license（驾照/执照）
- how to get passport（护照）
- openclaw（疑似无关品牌）

---

## 三、搜索集群识别

从有效数据中，用户搜索需求可归纳为 **5 大集群**：

### 集群 1：API Key 获取（核心需求，热度最高）

这是站点的主战场。用户明确知道要哪个平台的 API Key，直接搜索获取方法。

| 关键词 | 热度 | 变化 | 搜索意图 |
|---|---|---|---|
| api key | 100 | -7% | 泛需求：什么是 API Key / 找 API Key |
| how to get api key | 48 | -20% | 通用获取方法 |
| google api key | 21 | +3% | 获取 Google API Key |
| openai api key | 17 | -10% | 获取 OpenAI API Key |
| gemini api key | 14 | -7% | 获取 Gemini API Key |
| get gemini api key | 13 | -10% | 同 Gemini |
| claude api key | 13 | -20% | 获取 Claude API Key |
| how to get claude api key | 8 | -10% | 同 Claude |
| how to get openai api key | 8 | -30% | 同 OpenAI |
| anthropic api key | 6 | -40% | 同 Claude（Anthropic 是公司名） |
| chatgpt api key | 4 | -30% | ChatGPT/OpenAI API Key |
| openrouter api key | 3 | -20% | OpenRouter API Key |
| how to get anthropic api key | 3 | -50% | 同 Claude |
| how to get gemini api key | 5 | -50% | 同 Gemini |
| google gemini api key | 8 | -5% | 同 Gemini |

**关键发现**：
- "api key" 本身热度 100，是所有相关词里最高的，但意图最泛
- "how to get api key" 热度 48，说明大量用户在找通用获取方法
- OpenAI / Google / Claude 是三大高热度平台
- 每个平台的 "how to get [platform] api key" 都是独立长尾词
- chatgpt api key 和 openai api key 是同一事物的不同搜索词

### 集群 2：高增长新兴需求（蓝海机会）

这些关键词当前热度不高，但增长率极高，代表正在爆发的新需求。

| 关键词 | 热度 | 变化 | 搜索意图 |
|---|---|---|---|
| get deepseek api key | 4 | +80% | 获取 DeepSeek API Key |
| deepseek api | 4 | +70% | DeepSeek API 使用 |
| deepseek api key | 4 | +60% | 同 DeepSeek |
| deepseek | 5 | +50% | 品牌泛需求 |
| google ai studio | 7 | +50% | Google AI Studio 使用/Key |
| opencode | 2 | +50% | 新的代码/AI 平台 |
| kimi k3 | 0 | +4850% | Kimi K3 新模型（基数极低） |
| kimi api key | 2 | +2% | Kimi API Key |
| open ai api key | 4 | +10% | OpenAI API Key 变体拼写 |
| openrouter | 5 | +9% | OpenRouter 聚合平台 |
| gemini models | 2 | +20% | Gemini 模型介绍 |
| ollama models | 1 | +30% | Ollama 模型列表 |

**关键发现**：
- DeepSeek 是最值得关注的新兴需求，三个相关词都 +60%~80% 增长
- Kimi K3 增长率 4850% 但基数极低（热度 0），需观察是否持续
- Google AI Studio 增长 50%，热度 7，是 Google 生态的重要入口
- OpenRouter 稳定增长 9%，作为聚合平台有独立搜索需求
- Ollama 模型列表 +30%，反映本地部署需求在增长

### 集群 3：AI 基础知识教育（引流型内容）

这些查询热度绝对值极低，但增长率爆炸，说明大量新手正在涌入 AI 领域。

| 关键词 | 热度 | 变化 | 搜索意图 |
|---|---|---|---|
| what is a prompt? | 0 | +2100% | Prompt 概念 |
| ai chat bots vs search engines | 0 | +1600% | AI 聊天机器人 vs 搜索引擎区别 |
| what are hallucinations? | 0 | +1150% | AI 幻觉概念 |
| 3 main steps of a good prompt | 0 | +1100% | Prompt 工程入门 |
| what is an api key | 5 | -6% | API Key 概念解释 |
| what is a public key | 8 | -10% | 公钥概念（可能与加密有关） |

**关键发现**：
- 这些是完美的支柱页引流内容——新手搜到这些科普文章后，自然引导到 API Key 获取页
- "what is an api key" 热度 5，虽然下降 6%，但仍有稳定搜索量
- 这类内容竞争度低，新站容易拿到排名
- 适合作为内容集群的入口页

### 集群 4：平台/模型选择对比

用户在决策阶段，还没确定用哪个平台，需要对比信息。

| 关键词 | 热度 | 变化 | 搜索意图 |
|---|---|---|---|
| openai | 31 | -3% | 品牌泛需求 |
| claude | 19 | -20% | 品牌泛需求 |
| google ai | 15 | -10% | 品牌泛需求 |
| gemini api | 14 | -9% | 具体产品 API |
| google gemini | 11 | -2% | 具体产品 |
| gemini ai | 10 | -6% | 具体产品 |
| nvidia | 8 | -7% | 品牌泛需求 |
| ollama | 6 | -20% | 本地模型部署 |
| hugging face | 4 | -5% | 模型社区 |
| grok | 3 | -30% | xAI Grok |
| grok api | 2 | -40% | Grok API |
| n8n | 2 | -40% | 自动化工具（可能涉及 API 调用） |

**关键发现**：
- 品牌泛需求词热度高但意图模糊，难直接转化
- 对比类内容（如 "OpenAI vs Claude"、"Gemini vs OpenAI"）虽未直接出现在数据中，但符合用户决策路径
- Grok 热度下降但仍有搜索量，值得关注
- n8n 作为自动化工具，用户可能需要 API Key 来配置工作流

### 集群 5：模型/产品相关

用户已经知道平台，在找具体模型或产品信息。

| 关键词 | 热度 | 变化 | 搜索意图 |
|---|---|---|---|
| openai api | 17 | -7% | OpenAI API 泛需求 |
| open ai | 7 | +5% | OpenAI 品牌变体 |
| open ai api key | 4 | +10% | OpenAI API Key 变体 |
| gemini models | 2 | +20% | Gemini 模型列表 |
| ollama models | 1 | +30% | Ollama 模型列表 |

**关键发现**：
- "open ai" 是 "openai" 的常见拼写变体，热度 7 且增长 5%
- 模型列表类内容（gemini models、ollama models）有稳定增长
- 拼写变体需要在内容中自然覆盖

---

## 四、内容图谱设计（基于数据）

### 核心主题
**AI 模型 API Key 获取与使用指南**

### 二级内容集群（6 个支柱方向）

#### 集群 A：通用 API Key 入门

| 内容类型 | 选题 | URL 规划 | 目标关键词 |
|---|---|---|---|
| 支柱页 | What is an API Key & How to Get One for AI Models | /guides/what-is-an-api-key/ | api key, what is an api key |
| 集群文章 | API Key vs Public Key vs Private Key | /guides/api-key-vs-public-key/ | what is a public key, api key |
| 集群文章 | How to Choose an AI Model API Provider | /guides/how-to-choose-ai-api-provider/ | how to get api key |
| 集群文章 | Free AI API Keys: Where to Start | /guides/free-ai-api-keys/ | api key, how to get api key |
| 集群文章 | API Key Security Best Practices | /guides/api-key-security/ | api key |

#### 集群 B：OpenAI API Key 完全指南

| 内容类型 | 选题 | URL 规划 | 目标关键词 |
|---|---|---|---|
| 支柱页 | OpenAI API Key Complete Guide | /guides/openai-api-key-guide/ | openai api key, openai api |
| 集群文章 | How to Get OpenAI API Key | /guides/how-to-get-openai-api-key/ | how to get openai api key, openai api key |
| 集群文章 | How to Fix OpenAI API 401 Error | /guides/openai-api-401-error/ | openai api key, openai api |
| 集群文章 | How to Fix OpenAI API 429 Error | /guides/openai-api-429-error/ | openai api key, openai api |
| 集群文章 | OpenAI API Pricing Explained | /guides/openai-api-pricing/ | openai api, openai api key |
| 集群文章 | ChatGPT API Key vs OpenAI API Key | /guides/chatgpt-api-key-vs-openai/ | chatgpt api key, openai api key |
| 集群文章 | OpenAI Free Credits & Trial | /guides/openai-free-credits/ | openai api key |

#### 集群 C：Google/Gemini API Key 完全指南

| 内容类型 | 选题 | URL 规划 | 目标关键词 |
|---|---|---|---|
| 支柱页 | Google Gemini API Key Complete Guide | /guides/gemini-api-key-guide/ | gemini api key, google api key, google gemini |
| 集群文章 | How to Get Gemini API Key | /guides/how-to-get-gemini-api-key/ | get gemini api key, gemini api key |
| 集群文章 | How to Get Google API Key for AI | /guides/how-to-get-google-api-key/ | google api key, google ai |
| 集群文章 | Google AI Studio API Key Setup | /guides/google-ai-studio-api-key/ | google ai studio, google api key |
| 集群文章 | Gemini Models Comparison | /guides/gemini-models-comparison/ | gemini models, gemini api, gemini ai |
| 集群文章 | Gemini API Pricing & Free Tier | /guides/gemini-api-pricing/ | gemini api, gemini api key |

#### 集群 D：Claude/Anthropic API Key 完全指南

| 内容类型 | 选题 | URL 规划 | 目标关键词 |
|---|---|---|---|
| 支柱页 | Claude API Key Complete Guide | /guides/claude-api-key-guide/ | claude api key, anthropic api key, claude |
| 集群文章 | How to Get Claude API Key | /guides/how-to-get-claude-api-key/ | how to get claude api key, claude api key |
| 集群文章 | How to Get Anthropic API Key | /guides/how-to-get-anthropic-api-key/ | anthropic api key, how to get anthropic api key |
| 集群文章 | Claude API Pricing | /guides/claude-api-pricing/ | claude api key, claude |
| 集群文章 | Claude vs OpenAI API Comparison | /guides/claude-vs-openai-api/ | claude, openai, openai api |

#### 集群 E：中国 AI API Key 完全指南

| 内容类型 | 选题 | URL 规划 | 目标关键词 |
|---|---|---|---|
| 支柱页 | China AI Model API Keys Complete Guide | /guides/china-ai-api-keys-guide/ | deepseek api key, kimi api key |
| 集群文章 | How to Get DeepSeek API Key | /guides/how-to-get-deepseek-api-key/ | get deepseek api key, deepseek api key, deepseek api |
| 集群文章 | How to Get Kimi API Key (Kimi K3) | /guides/how-to-get-kimi-api-key/ | kimi api key, kimi k3 |
| 集群文章 | How to Get Tongyi (Qwen) API Key | /guides/how-to-get-tongyi-api-key/ | (品牌泛需求引流) |
| 集群文章 | How to Get Baidu Ernie API Key | /guides/how-to-get-ernie-api-key/ | (品牌泛需求引流) |
| 集群文章 | China AI API vs International API Comparison | /guides/china-api-vs-international-api/ | deepseek api, openai api |

#### 集群 F：AI 入门概念科普（引流型）

| 内容类型 | 选题 | URL 规划 | 目标关键词 |
|---|---|---|---|
| 支柱页 | AI Chatbots & Prompts Beginner Guide | /guides/ai-beginner-guide/ | what is a prompt, ai chat bots |
| 集群文章 | What is a Prompt? | /guides/what-is-a-prompt/ | what is a prompt |
| 集群文章 | What are Hallucinations in AI? | /guides/what-are-ai-hallucinations/ | what are hallucinations |
| 集群文章 | AI Chatbots vs Search Engines | /guides/ai-chatbots-vs-search-engines/ | ai chat bots vs search engines |
| 集群文章 | How to Write Good Prompts | /guides/how-to-write-good-prompts/ | 3 main steps of a good prompt |

---

## 五、发布优先级

### P0 — 立即执行（高热度 + 已有供应商数据）

| 优先级 | 内容 | 原因 |
|---|---|---|
| P0-1 | How to Get OpenAI API Key | 热度 17，核心搜索词 |
| P0-2 | How to Get Gemini API Key | 热度 14，核心搜索词 |
| P0-3 | How to Get Claude API Key | 热度 13，核心搜索词 |
| P0-4 | What is an API Key? | 热度 5，支柱页引流 |
| P0-5 | OpenAI API Key Complete Guide（支柱页） | 集群 B 枢纽 |

### P1 — 抢时间窗口（高增长趋势）

| 优先级 | 内容 | 原因 |
|---|---|---|
| P1-1 | How to Get DeepSeek API Key | +80% 增长，正在爆发 |
| P1-2 | Google AI Studio API Key Setup | +50% 增长，热度 7 |
| P1-3 | How to Get Kimi API Key (Kimi K3) | +4850% 增长（观察持续性） |
| P1-4 | DeepSeek API Key Complete Guide（支柱页） | 集群 E 枢纽 |

### P2 — 补充集群深度

| 优先级 | 内容 | 原因 |
|---|---|---|
| P2-1 | Gemini API Key Complete Guide（支柱页） | 集群 C 枢纽 |
| P2-2 | Claude API Key Complete Guide（支柱页） | 集群 D 枢纽 |
| P2-3 | China AI API Keys Complete Guide（支柱页） | 集群 E 枢纽 |
| P2-4 | OpenAI API Pricing Explained | 横向补充 |
| P2-5 | Gemini Models Comparison | +20% 增长 |
| P2-6 | Claude vs OpenAI API Comparison | 决策类内容 |

### P3 — 引流型科普内容（低竞争高增长）

| 优先级 | 内容 | 原因 |
|---|---|---|
| P3-1 | What is a Prompt? | +2100% 增长 |
| P3-2 | What are Hallucinations in AI? | +1150% 增长 |
| P3-3 | AI Chatbots vs Search Engines | +1600% 增长 |
| P3-4 | How to Write Good Prompts | +1100% 增长 |
| P3-5 | AI Beginner Guide（支柱页） | 集群 F 枢纽 |

### P4 — 长尾扩展

| 优先级 | 内容 | 原因 |
|---|---|---|
| P4-1 | ChatGPT API Key vs OpenAI API Key | 热度 4，澄清概念 |
| P4-2 | API Key vs Public Key vs Private Key | 热度 8（what is a public key） |
| P4-3 | Free AI API Keys: Where to Start | 引流+转化 |
| P4-4 | How to Get OpenRouter API Key | 热度 3，+9% 增长 |
| P4-5 | Ollama Models List | +30% 增长 |
| P4-6 | How to Get Grok API Key | 热度 3，品牌关注度 |

---

## 六、内链架构设计

### 支柱页 → 集群文章
每个支柱页正文自然链接所有下属集群文章（3-6条内链/页）。

### 集群文章 → 支柱页（回链）
每篇集群文章正文回链所属支柱页 1 次。

### 集群文章 ↔ 集群文章（双向互链）
同集群文章之间 2-4 条互链，形成局部闭环。

### 集群文章 → 供应商详情页
指南文章中提到某供应商时，链接到对应的 `/providers/[slug]/` 页面。

### 供应商详情页 → 指南/支柱页
每个供应商详情页底部增加"相关深度指南"区块，链向对应集群的支柱页和文章。

### 跨集群链接
仅在语义高度相关时少量链接（如"Claude vs OpenAI"文章自然链两个集群）。

### 锚文本配比参考
- 精准锚文本 ~10%（回链支柱页时使用）
- 泛语义锚文本 ~70%（同集群互链主力）
- 自然短句锚文本 ~20%（跨集群链接）

---

## 七、与现有项目结构的结合

### 不动的部分
- 所有现有 URL 保持不变
- 35 个供应商详情页保持不变（只增强内容）
- 现有 8 篇指南保持不变（可能迁移到新集群结构中）
- 现有分类、福利、关于、联系等页面不变

### 新增的部分
- 新增支柱页和集群文章（走 `/guides/[slug]/` 路由）
- 扩展 GuideArticle 数据模型，增加 `pillar` 标记和 `cluster` 字段
- 供应商详情页底部新增"相关深度指南"区块
- sitemap 自动纳入新页面
- 结构化数据覆盖新页面

### 数据驱动决策
- 优先生产高热度+高增长的内容（P0/P1）
- 观察 Kimi K3 增长是否持续，决定是否投入资源
- 定期复查 Google Trends，动态调整优先级

---

## 八、关键数据洞察总结

1. **"api key" 泛词热度 100** — 需要一篇权威的"What is an API Key"支柱页来承接
2. **"how to get api key" 热度 48** — 通用获取指南是第二大流量入口
3. **OpenAI/Gemini/Claude 三足鼎立** — 各自都有独立的"how to get [x] api key"搜索需求
4. **DeepSeek 三连增长 60%-80%** — 最值得抢的新兴需求
5. **Kimi K3 增长 4850%** — 基数极低，但趋势信号明显
6. **Google AI Studio +50%** — Google 生态的重要入口，值得单独内容
7. **AI 基础科普查询爆发式增长** — 新手涌入期，低竞争高增长的引流机会
8. **拼写变体（open ai / openai）** — 内容中需自然覆盖
9. **OpenRouter 稳定增长** — 聚合平台有独立搜索需求
10. **多数关键词呈下降趋势** — 说明市场在成熟，用户搜索更精准，内容需要更专注、更深度

---

*本文档随项目执行持续更新。每完成一批内容后，回来标注完成状态，并根据最新 Trends 数据调整优先级。*
