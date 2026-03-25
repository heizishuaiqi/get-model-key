const fs = require('fs');
const path = require('path');

const providersDir = path.join(process.cwd(), 'src/data/providers');
const validRegions = ['global', 'china', 'aggregator', 'cloud'];

fs.readdir(providersDir, (err, files) => {
  if (err) throw err;
  
  files.forEach(file => {
    if (!file.endsWith('.json')) return;
    
    const filePath = path.join(providersDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const provider = JSON.parse(content);
      let updated = false;
      
      // 修正region字段
      if (provider.region && !validRegions.includes(provider.region)) {
        if (provider.region === 'usa' || provider.region === 'cyprus' || provider.region === 'europe' || provider.region === 'global') {
          provider.region = 'global';
        } else if (provider.region === 'china') {
          provider.region = 'china';
        }
        updated = true;
      }
      
      // 修正categories字段
      if (provider.categories) {
        provider.categories = provider.categories.map(cat => {
          if (cat === 'usa' || cat === 'europe' || cat === 'cyprus') {
            return 'global';
          } else if (cat === 'china') {
            return 'china';
          }
          return cat;
        });
        updated = true;
      }
      
      // 修正tags字段
      if (provider.tags) {
        provider.tags = provider.tags.map(tag => {
          if (tag === 'usa' || tag === 'europe' || tag === 'cyprus') {
            return 'global';
          } else if (tag === 'china') {
            return 'china';
          }
          return tag;
        });
        updated = true;
      }
      
      if (updated) {
        fs.writeFileSync(filePath, JSON.stringify(provider, null, 2));
        console.log(`✅ Updated ${file}`);
      }
    } catch (e) {
      console.log(`❌ Error parsing ${file}: ${e.message}`);
    }
  });
});
