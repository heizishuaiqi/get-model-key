---
name: add-provider
description: Research a new AI provider and create its JSON data file. Use this skill whenever the user says "add provider", "add a new provider", "research [provider name]", "onboard [provider]", or gives you an AI API provider name and wants it added to the site. The skill uses Tavily to search for global and China-specific info, then writes src/data/providers/<slug>.json conforming to the Provider interface.
---

# Add Provider Skill

Given a provider name, research it via Tavily and produce a complete `src/data/providers/<slug>.json` file. Show the draft to the user for review before writing to disk.

## Step 1 — Run 3 Tavily searches

Use the `mcp__MiniMax__web_search` tool (or Bash curl if unavailable) to fire these 3 queries. Run them sequentially so each result can inform the next.

**Search A — International (English)**
```
Query: "<ProviderName> API key documentation models pricing free credits"
```
Looking for: official site (.com), API console URL, docs URL, model names, pricing tier, free quota.

**Search B — China/domestic (Chinese)**
```
Query: "<ProviderName> API key 国内 中文站 免费额度 注册"
```
Also set `country: "cn"` if the tool supports it.
Looking for: China-specific site (.cn domain), domestic pricing differences, CNY credits, real-name auth requirements, referral offers.

**Search C — Key page precision**
```
Query: "<ProviderName> API key create console access token account"
```
If Search B found a `.cn` domain, restrict this search to that domain too.
Looking for: the exact URL where users create/view their API keys (not just the homepage or docs index).

## Step 2 — Extract structured data

From the 3 searches, extract:

| Field | Where to look |
|---|---|
| `officialKeyUrl` | Search C — the exact /api-keys or /account/token page |
| `officialSiteUrl` | Search B — the .cn domain homepage, if one exists |
| `officialSiteUrlGlobal` | Search A — the .com domain homepage, only if it differs from .cn |
| `officialDocsUrl` | Search A — the official docs/reference URL |
| Model names | Search A + B — concrete model IDs/names the provider offers |
| Free credits / offers | Search A + B — signup bonuses, free tier, vouchers, referral programs |
| CN-specific offers | Search B — real-name auth rewards, domestic pricing, CNY vouchers |
| Tags | Infer from models: `coding`, `reasoning`, `chinese`, `multimodal`, `cost-effective`, `vision` |

**Important verification rules:**
- `officialKeyUrl` must be the page where a logged-in user creates or views their keys — not the homepage, not the docs root. If unsure, prefer the console/platform subdomain over the marketing site.
- Only set `officialSiteUrlGlobal` if the provider genuinely operates two separate regional sites (like Silicon Flow's `.cn` + `.com`). If they only have one site, use `officialSiteUrl` alone.
- If a field is genuinely unknown after 3 searches, leave it out rather than guessing. Mark it in your draft with a `// TODO: verify` comment so the user knows.

## Step 3 — Build the JSON draft

Fill in the full `Provider` shape. Required fields: `slug`, `status`, `categories`, `region`, `featured`, `img`, `officialKeyUrl`, `name`, `summary`, `models`, `tags`, `searchAliases`, `lastVerified`.

```jsonc
{
  "slug": "<kebab-case-name>",          // e.g. "mistral-ai"
  "status": "active",
  "categories": ["<category>"],         // see categories below
  "region": "<region>",                 // see regions below
  "featured": false,
  "officialKeyUrl": "<exact-key-page-url>",
  "officialSiteUrl": "<cn-site-or-only-site>",      // omit if no CN site
  "officialSiteUrlGlobal": "<global-site>",          // omit if only one site
  "officialDocsUrl": "<docs-url>",                   // omit if not found
  "name": {
    "en": "<English name>",
    "zh": "<Chinese name or transliteration>"
  },
  "summary": {
    "en": "<One sentence: key strength, target use case, notable feature.>",
    "zh": "<同上，中文版>"
  },
  "models": {
    "en": ["Model A", "Model B"],
    "zh": ["Model A", "Model B"]        // same list unless CN has different names
  },
  "tags": ["tag1", "tag2"],
  "searchAliases": ["alias1", "中文别名"],
  "lastVerified": "<today YYYY-MM-DD>",
  "img": "",                            // leave empty — user will fill in
  "seo": {
    "title": {
      "en": "<ProviderName> API Key - <value prop> | Get Model Key",
      "zh": "<供应商名> API Key - <价值主张> | Get Model Key"
    },
    "description": {
      "en": "<2 sentences: what it is, what you can do with it.>",
      "zh": "<同上，中文版>"
    }
  },
  "overview": {
    "en": ["<Paragraph 1: what the provider is>", "<Paragraph 2: who it suits>"],
    "zh": ["<第一段：平台简介>", "<第二段：适用场景>"]
  },
  "howToGetKey": {
    "en": [
      "Step 1...",
      "Step 2...",
      "Step 3...",
      "Step 4..."
    ],
    "zh": [
      "第一步...",
      "第二步...",
      "第三步...",
      "第四步..."
    ]
  },
  "faq": [
    {
      "question": { "en": "Q1?", "zh": "问题1？" },
      "answer": { "en": "A1.", "zh": "答案1。" }
    }
  ],
  "offers": []                          // fill in if offers found — see schema below
}
```

### Region values
- `"global"` — provider based outside China, serves international users
- `"china"` — China-based provider, primary market is domestic
- `"aggregator"` — multi-model inference platform (not a single model vendor)
- `"cloud"` — major cloud platform (AWS Bedrock, Azure AI, Google Vertex)

### Common category values
`top-picks`, `china`, `aggregator`, `cloud`, `open-source`, `multimodal`, `coding`

### Offer schema (only add if you found concrete offer details)
```jsonc
{
  "id": "<slug>-<year>-<short-desc>",   // e.g. "mistral-2026-signup-credit"
  "status": "active",
  "type": "signup_credit",              // signup_credit | daily_free_quota | signup_tokens | model_trial_quota | platform_credit
  "title": { "en": "...", "zh": "..." },
  "benefit": { "en": "...", "zh": "..." },
  "notes": { "en": "...", "zh": "..." },  // optional
  "verifiedAt": "<today>",
  "expiresAt": "<date if known>"          // omit if open-ended
}
```

## Step 4 — Present the draft

Show the complete JSON in a code block. Highlight anything uncertain with a note below the block, for example:
- "officialKeyUrl not confirmed — found `/console` but key creation page may be different"
- "No CN site found — set only officialSiteUrl"
- "Free tier unconfirmed — search returned conflicting info"
- "img field is empty — please provide a logo URL"

Ask: "Does this look right? I'll write the file once you confirm."

## Step 5 — Write the file

After the user confirms (or provides corrections), write to:
```
src/data/providers/<slug>.json
```

Remind the user to:
1. Fill in the `img` field with a logo URL
2. Verify `officialKeyUrl` by actually opening it
3. Run `npm run build` to catch any TypeScript validation errors
