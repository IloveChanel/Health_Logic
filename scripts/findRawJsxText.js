const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach((f) => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      walk(fp, filelist);
    } else if (fp.endsWith('.tsx')) {
      filelist.push(fp);
    }
  });
  return filelist;
}

function findRawText(content) {
  const results = [];
  // Regex: <Tag ...> SOME TEXT </Tag> where Tag is not Text and SOME TEXT does not contain '<'
  const re = /<([A-Za-z0-9_]+)[^>]*>\s*([^<\n][^<]*)\s*<\/(?:\1|[A-Za-z0-9_]+)>/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const tag = m[1];
    const inner = m[2].trim();
    if (tag === 'Text') continue;
    // ignore cases where inner starts with '{' (JS expression) or is only JSX like <Component />
    if (inner.startsWith('{') || inner.startsWith('<')) continue;
    // common safe patterns: comments, import/export lines etc.
    if (inner.match(/^\w+\s*[:=]/)) continue;
    results.push({ tag, inner, index: m.index });
  }
  return results;
}

const root = path.resolve(__dirname, '..', 'src');
const files = walk(root);
let total = 0;
files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const res = findRawText(content);
  if (res.length) {
    console.log(`\nFile: ${file}`);
    res.forEach((r) => {
      total++;
      // find line number
      const before = content.slice(0, r.index);
      const line = before.split('\n').length;
      console.log(`  Line ${line}: <${r.tag}> ${r.inner.slice(0,80)}${r.inner.length>80? '...':''}`);
    });
  }
});
if (total === 0) console.log('No obvious raw JSX text matches found.');
