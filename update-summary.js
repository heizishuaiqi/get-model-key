const fs = require('fs');
const path = require('path');

const providersDir = path.join(process.cwd(), 'src/data/providers');
const summaryPath = path.join(process.cwd(), 'src/data/providers.summary.json');

fs.readdir(providersDir, (err, files) => {
  if (err) throw err;
  
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
      console.log(`❌ Error parsing ${file}: ${e.message}`);
    }
  });
  
  // 按slug排序
  summary.sort((a, b) => a.slug.localeCompare(b.slug));
  
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log('✅ Updated providers.summary.json');
});
