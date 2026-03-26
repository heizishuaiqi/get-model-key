const fs = require('fs');
const path = require('path');

const providersDir = path.join(process.cwd(), 'src/data/providers');
const validRegions = ['global', 'china', 'aggregator', 'cloud'];
const validCategories = ['top-picks', 'global', 'china', 'aggregator', 'cloud'];
const validOfferStatus = ['active', 'paused', 'expired'];
const validOfferTypes = [
  'daily_free_quota',
  'signup_tokens',
  'signup_credit',
  'model_trial_quota',
  'platform_credit',
];

function isValidDateString(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

fs.readdir(providersDir, (err, files) => {
  if (err) throw err;
  
  const invalidProviders = [];
  
  files.forEach(file => {
    if (!file.endsWith('.json')) return;
    
    const filePath = path.join(providersDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const provider = JSON.parse(content);
      
      // 检查region
      if (!validRegions.includes(provider.region)) {
        invalidProviders.push({
          file: file,
          issue: `Invalid region: ${provider.region}`,
          current: provider.region
        });
      }
      
      // 检查categories
      if (provider.categories) {
        const invalidCats = provider.categories.filter(cat => !validCategories.includes(cat));
        if (invalidCats.length > 0) {
          invalidProviders.push({
            file: file,
            issue: `Invalid categories: ${invalidCats.join(', ')}`,
            current: provider.categories.join(', ')
          });
        }
      }

      if (typeof provider.img !== 'string') {
        invalidProviders.push({
          file,
          issue: 'Invalid img: must be a string (can be empty before URL is configured)',
        });
      }

      // Validate optional offers
      if (provider.offers !== undefined) {
        if (!Array.isArray(provider.offers)) {
          invalidProviders.push({
            file,
            issue: 'Invalid offers: must be an array',
          });
        } else {
          provider.offers.forEach((offer, index) => {
            const key = `${file} offers[${index}]`;

            if (!offer.id || typeof offer.id !== 'string') {
              invalidProviders.push({ file, issue: `${key} missing string id` });
            }

            if (!validOfferStatus.includes(offer.status)) {
              invalidProviders.push({
                file,
                issue: `${key} invalid status: ${offer.status}`,
              });
            }

            if (!validOfferTypes.includes(offer.type)) {
              invalidProviders.push({
                file,
                issue: `${key} invalid type: ${offer.type}`,
              });
            }

            ['title', 'benefit'].forEach((field) => {
              if (
                !offer[field] ||
                typeof offer[field] !== 'object' ||
                typeof offer[field].en !== 'string' ||
                typeof offer[field].zh !== 'string'
              ) {
                invalidProviders.push({
                  file,
                  issue: `${key} invalid ${field}: must include en/zh strings`,
                });
              }
            });

            if (!isValidDateString(offer.verifiedAt)) {
              invalidProviders.push({
                file,
                issue: `${key} invalid verifiedAt: ${offer.verifiedAt}`,
              });
            }

            if (offer.expiresAt && !isValidDateString(offer.expiresAt)) {
              invalidProviders.push({
                file,
                issue: `${key} invalid expiresAt: ${offer.expiresAt}`,
              });
            }
          });
        }
      }
      
    } catch (e) {
      invalidProviders.push({
        file: file,
        issue: `JSON parse error: ${e.message}`
      });
    }
  });
  
  if (invalidProviders.length > 0) {
    console.log('❌ Found invalid providers:');
    invalidProviders.forEach(p => {
      console.log(`\n- ${p.file}: ${p.issue}`);
      if (p.current) console.log(`  Current: ${p.current}`);
    });
  } else {
    console.log('✅ All providers are compliant with the规范!');
  }
});
