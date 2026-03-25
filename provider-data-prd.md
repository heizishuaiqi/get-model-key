# AI模型供应商数据规范PRD
## 1. 文档概述
本规范定义了AI模型供应商数据的JSON格式标准，用于确保项目中所有供应商数据的一致性和可维护性，统一供应商列表的展示和搜索功能。

## 2. 适用范围
本规范适用于`src/data/providers/`目录下的所有供应商数据JSON文件，以及`src/data/providers.summary.json`汇总文件。

## 3. 字段规范
| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| slug | string | 是 | 供应商唯一标识符，小写字母+连字符，如`openai` |
| status | string | 是 | 数据状态：`active`/`hidden`/`draft`，仅`active`状态会在前端展示 |
| categories | string[] | 是 | 分类标签数组，必须包含标准分类slug，可附加自定义业务标签 |
| region | string | 是 | 地区属性，枚举值：`global`/`china`/`aggregator`/`cloud` |
| featured | boolean | 是 | 是否为精选推荐供应商，控制首页展示权重 |
| officialKeyUrl | string | 是 | 官方API Key获取页面地址 |
| officialSiteUrl | string | 否 | 供应商官方网站地址 |
| officialDocsUrl | string | 否 | 供应商官方API文档地址 |
| name | Record<'en' | 'zh', string> | 是 | 多语言名称对象，包含英文和中文名称 |
| summary | Record<'en' | 'zh', string> | 是 | 多语言简介对象，包含英文和中文的供应商描述 |
| models | Record<'en' | 'zh', string[]> | 是 | 多语言模型列表对象，包含英文和中文的模型名称数组 |
| tags | string[] | 是 | 搜索标签数组，用于前端筛选和搜索功能 |
| searchAliases | string[] | 否 | 搜索别名数组，用于扩展搜索匹配 |
| lastVerified | string | 否 | 最后校验日期，格式：`YYYY-MM-DD` |
| seo | Object | 否 | SEO优化配置，包含`title`和`description`的多语言对象 |

## 4. 枚举值规范
### 4.1 region枚举值
| 值 | 说明 |
| --- | --- |
| global | 国际供应商 |
| china | 国内供应商 |
| aggregator | 模型聚合平台 |
| cloud | 云服务提供商 |

### 4.2 标准分类slug（来自`categories.json`）
| slug | 中文名称 | 英文名称 |
| --- | --- | --- |
| top-picks | 热门推荐 | Top Picks |
| global | 国际模型 | Global Providers |
| china | 国内模型 | China Providers |
| aggregator | 聚合平台 | Aggregators |
| cloud | 云平台 | Cloud Platforms |

## 5. 格式示例
```json
{
  "slug": "openai",
  "status": "active",
  "categories": ["global", "llm", "coding"],
  "region": "global",
  "featured": true,
  "officialKeyUrl": "https://platform.openai.com/api-keys",
  "officialSiteUrl": "https://openai.com/",
  "officialDocsUrl": "https://platform.openai.com/docs/overview",
  "name": {
    "en": "OpenAI",
    "zh": "OpenAI"
  },
  "summary": {
    "en": "General purpose, strong ecosystem, good default choice.",
    "zh": "通用能力强，生态完善，默认选择友好。"
  },
  "models": {
    "en": ["GPT-4o", "GPT-4 Turbo", "o3"],
    "zh": ["GPT-4o", "GPT-4 Turbo", "o3"]
  },
  "tags": ["global", "llm", "coding", "ecosystem"],
  "searchAliases": ["gpt", "open ai", "chatgpt"],
  "lastVerified": "2026-03-25",
  "seo": {
    "title": {
      "en": "OpenAI API Key - Official Access",
      "zh": "OpenAI API Key - 官方入口"
    },
    "description": {
      "en": "Get OpenAI API key for GPT models.",
      "zh": "获取OpenAI API Key，使用GPT系列模型。"
    }
  }
}
```

## 6. 校验规则
1.  **JSON语法校验**：所有JSON文件必须通过`JSON.parse()`语法校验
2.  **必填字段校验**：所有标为`必填`的字段必须存在且格式正确
3.  **枚举值校验**：`region`字段必须为指定枚举值之一
4.  **标签校验**：分类标签和搜索标签中不得包含非标准地区标签（如`usa`/`cyprus`等），需替换为`global`或`china`
5.  **多语言校验**：`name`/`summary`/`models`等多语言字段必须同时包含`en`和`zh`两个语言版本

## 7. 维护流程
1.  新增供应商时必须遵循本规范
2.  定期校验现有供应商数据是否符合规范
3.  更新`categories.json`时需同步更新本规范的分类列表