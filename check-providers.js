const fs = require('fs');
const path = require('path');

const providersDir = path.join(process.cwd(), 'src/data/providers');
const validRegions = ['global', 'china', 'aggregator', 'cloud'];
const validCategories = ['top-picks', 'global', 'china', 'aggregator', 'cloud'];

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
