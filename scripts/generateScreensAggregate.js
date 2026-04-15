const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const screensDir = path.join(repoRoot, 'src', 'screens');
const outFile = path.join(repoRoot, 'audit', 'all-screens-aggregate.txt');

function generate() {
  if (!fs.existsSync(screensDir)) {
    console.error('Screens directory not found:', screensDir);
    process.exit(1);
  }

  const files = fs.readdirSync(screensDir).filter((f) => f.endsWith('.tsx')).sort();
  const parts = [];
  parts.push('All Screens Aggregate');
  parts.push('Generated: ' + new Date().toISOString());
  parts.push('');

  for (const f of files) {
    const full = path.join(screensDir, f);
    let content = fs.readFileSync(full, 'utf8');
    parts.push('----- START ' + path.join('src','screens', f) + ' -----');
    parts.push(content);
    parts.push('----- END ' + path.join('src','screens', f) + ' -----');
    parts.push('');
  }

  parts.push('Note: To auto-update this file, run scripts/watchScreensAggregate.js');

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, parts.join('\n'), 'utf8');
  console.log('Wrote', outFile);
}

if (require.main === module) generate();

module.exports = generate;
