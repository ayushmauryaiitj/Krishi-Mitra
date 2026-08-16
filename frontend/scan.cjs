const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
let output = [];
files.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  try {
    const ast = babel.parseSync(code, {
      sourceType: 'module',
      presets: ['@babel/preset-react'],
      filename: file
    });
    
    babel.traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (text && /^[A-Za-z]/.test(text) && !text.includes('{')) {
          output.push({file, line: path.node.loc.start.line, text, type: 'JSXText'});
        }
      },
      JSXAttribute(path) {
        if (path.node.name.name === 'placeholder' || path.node.name.name === 'label' || path.node.name.name === 'title') {
          if (path.node.value && path.node.value.type === 'StringLiteral') {
            const text = path.node.value.value;
            if (text && /^[A-Za-z]/.test(text)) {
              output.push({file, line: path.node.loc.start.line, text, type: path.node.name.name});
            }
          }
        }
      }
    });
  } catch(e) {}
});
fs.writeFileSync('missing_strings.json', JSON.stringify(output, null, 2));
