const fs = require('fs');
const path = require('path');

const providersDir = path.join(process.cwd(), 'src/data/providers');
const validRegions = ['global', 'china', 'aggregator', 'cloud'];
const standardCategorySlugs = ['top-picks', 'global', 'china', 'aggregator', 'cloud'];

fs.readdir(providersDir, (err, files) => {
  if (err) throw err;
  
  files.forEach(file => {
    if (!file.endsWith('.json')) return;
    
    const filePath = path.join(providersDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const provider = JSON.parse(content);
      let updated = false;
      
      // 1. 修正region字段：将非标准地区值替换为标准枚举值
      if (provider.region && !validRegions.includes(provider.region)) {
        const regionMap = {
          'us': 'global',
          'usa': 'global',
          'europe': 'global',
          'cyprus': 'global',
          'uk': 'global',
          'canada': 'global'
        };
        if (regionMap[provider.region]) {
          provider.region = regionMap[provider.region];
          updated = true;
          console.log(`✅ Fixed region in ${file}: ${provider.region} -> ${regionMap[provider.region]}`);
        }
      }
      
      // 2. 修正categories字段：将地区类标签替换为标准分类slug
      if (provider.categories) {
        const updatedCategories = provider.categories.map(cat => {
          // 替换地区标签为标准分类
          const catMap = {
            'us': 'global',
            'usa': 'global',
            'europe': 'global',
            'uk': 'global',
            'china': 'china',
            'cn': 'china'
          };
          if (catMap[cat]) {
            return catMap[cat];
          }
          return cat;
        });
        
        // 确保至少有一个标准分类slug
        const hasStandardCat = updatedCategories.some(cat => standardCategorySlugs.includes(cat));
        if (!hasStandardCat && updatedCategories.length > 0) {
          // 如果没有标准分类，添加默认的global
          updatedCategories.push('global');
          updated = true;
          console.log(`✅ Added default category to ${file}`);
        }
        
        if (JSON.stringify(updatedCategories) !== JSON.stringify(provider.categories)) {
          provider.categories = updatedCategories;
          updated = true;
        }
      }
      
      // 3. 修正tags字段：和categories一样的处理
      if (provider.tags) {
        const updatedTags = provider.tags.map(tag => {
          const tagMap = {
            'us': 'global',
            'usa': 'global',
            'europe': 'global',
            'uk': 'global',
            'china': 'china',
            'cn': 'china'
          };
          if (tagMap[tag]) {
            return tagMap[tag];
          }
          return tag;
        });
        
        if (JSON.stringify(updatedTags) !== JSON.stringify(provider.tags)) {
          provider.tags = updatedTags;
          updated = true;
        }
      }
      
      if (updated) {
        fs.writeFileSync(filePath, JSON.stringify(provider, null, 2));
        console.log(`✅ Saved changes to ${file}`);
      }
    } catch (e) {
      console.log(`❌ Error parsing ${file}: ${e.message}`);
    }
  });
  
  // 更新汇总列表
  const summaryPath = path.join(process.cwd(), 'src/data/providers.summary.json');
  const summary = [];
  
  files.forEach(file => {
    if (!file.endsWith('.json')) return;
    
    const filePath = path.join(providersDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    try {
      const provider = JSON.parse(content);
      if (provider.status !== 'active') return;
      
      const summaryItem = {
        slug: provider.slug,
        region: provider.region,
        officialKeyUrl: provider.officialKeyUrl,
        officialSiteUrl: provider.officialSiteUrl,
        officialDocsUrl: provider.officialDocsUrl,
        name: provider.name,
        models: provider.models
      };
      
      summary.push(summaryItem);
    } catch (e) {
      console.log(`❌ Error updating summary for ${file}: ${e.message}`);
    }
  });
  
  summary.sort((a, b) => a.slug.localeCompare(b.slug));
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log('✅ Updated providers.summary.json');
  
  console.log('\n🎉 All fixes completed!');
});
