const fs = require('fs');
const path = require('path');

const PROVIDERS_DIR = path.join(__dirname, '../src/data/providers');

// Keywords identifying the boilerplate disclaimer paragraph
const DISCLAIMER_KEYWORDS_EN = [
  'only links', 'does not sell', 'do not sell', 'not sell', 'not broker',
  'does not broker', 'only link', 'only links the official', 'not proxy',
  'does not proxy',
];
const DISCLAIMER_KEYWORDS_ZH = [
  '不出售', '不售卖', '不销售', '只链到官方', '只提供官方', '只引导至', '不代开',
  '不代生成', '不转发', '不中转', '仅跳转', '仅引导',
];

// Keywords identifying the "does getmodelkey sell keys" FAQ question
const SELL_FAQ_KEYWORDS_EN = [
  'sell', 'broker', 'proxy', 'mint', 'purchase', 'buy',
];
const SELL_FAQ_KEYWORDS_ZH = ['卖', '出售', '售卖', '代开', '代购'];

function isDisclaimerParagraph(text, lang) {
  const keywords = lang === 'en' ? DISCLAIMER_KEYWORDS_EN : DISCLAIMER_KEYWORDS_ZH;
  const lower = text.toLowerCase();
  return keywords.some(k => lower.includes(k.toLowerCase()));
}

function isSellFaqQuestion(question) {
  const enLower = (question.en || '').toLowerCase();
  const zhText = question.zh || '';
  const enMatch = SELL_FAQ_KEYWORDS_EN.some(k => enLower.includes(k));
  const zhMatch = SELL_FAQ_KEYWORDS_ZH.some(k => zhText.includes(k));
  return enMatch || zhMatch;
}

const files = fs.readdirSync(PROVIDERS_DIR).filter(f => f.endsWith('.json'));
let totalOverviewRemoved = 0;
let totalFaqRemoved = 0;

files.forEach(file => {
  const filePath = path.join(PROVIDERS_DIR, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let changed = false;

  // Clean overview last paragraph(s)
  if (data.overview) {
    ['en', 'zh'].forEach(lang => {
      if (!Array.isArray(data.overview[lang])) return;
      const before = data.overview[lang].length;
      data.overview[lang] = data.overview[lang].filter(
        para => !isDisclaimerParagraph(para, lang)
      );
      const removed = before - data.overview[lang].length;
      if (removed > 0) {
        totalOverviewRemoved += removed;
        changed = true;
        console.log(`[${file}] overview.${lang}: removed ${removed} disclaimer paragraph(s)`);
      }
    });
  }

  // Clean FAQ sell-keys question
  if (Array.isArray(data.faq)) {
    const before = data.faq.length;
    data.faq = data.faq.filter(item => !isSellFaqQuestion(item.question));
    const removed = before - data.faq.length;
    if (removed > 0) {
      totalFaqRemoved += removed;
      changed = true;
      console.log(`[${file}] faq: removed ${removed} sell-keys question(s)`);
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  }
});

console.log(`\nDone. Overview paragraphs removed: ${totalOverviewRemoved}, FAQ questions removed: ${totalFaqRemoved}`);
