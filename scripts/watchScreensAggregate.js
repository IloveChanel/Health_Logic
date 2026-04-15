const fs = require('fs');
const path = require('path');
const generate = require('./generateScreensAggregate');

const repoRoot = path.resolve(__dirname, '..');
const screensDir = path.join(repoRoot, 'src', 'screens');

if (!fs.existsSync(screensDir)) {
  console.error('Screens directory not found:', screensDir);
  process.exit(1);
}

console.log('Watching screens directory for changes:', screensDir);

let timeout = null;
fs.watch(screensDir, { recursive: true }, (eventType, filename) => {
  if (!filename) return;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    try {
      generate();
    } catch (err) {
      console.error('Failed to generate aggregate:', err);
    }
  }, 300);
});
