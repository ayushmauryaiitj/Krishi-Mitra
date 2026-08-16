const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const t = require('@babel/types');

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
let dictionary = {};
let keyCounter = 1;

function toSnakeCase(str) {
  return str
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase()
    .substring(0, 30);
}

files.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  try {
    const ast = babel.parseSync(code, {
      sourceType: 'module',
      presets: ['@babel/preset-react'],
      filename: file
    });
    
    let changed = false;
    babel.traverse(ast, {
      JSXText(path) {
        const text = path.node.value.trim();
        if (text && /^[A-Za-z]/.test(text) && !text.includes('{')) {
          const key = 'auto_' + toSnakeCase(text) + '_' + (keyCounter++);
          dictionary[key] = text;
          
          path.replaceWith(
            t.jsxExpressionContainer(
              t.callExpression(t.identifier('t'), [t.stringLiteral('auto.' + key)])
            )
          );
          changed = true;
        }
      },
      JSXAttribute(path) {
        if (path.node.name.name === 'placeholder' || path.node.name.name === 'label' || path.node.name.name === 'title') {
          if (path.node.value && path.node.value.type === 'StringLiteral') {
            const text = path.node.value.value;
            if (text && /^[A-Za-z]/.test(text)) {
              const key = 'auto_' + toSnakeCase(text) + '_' + (keyCounter++);
              dictionary[key] = text;
              
              path.node.value = t.jsxExpressionContainer(
                t.callExpression(t.identifier('t'), [t.stringLiteral('auto.' + key)])
              );
              changed = true;
            }
          }
        }
      }
    });
    
    if (changed) {
      const output = babel.transformFromAstSync(ast, code, {
        sourceType: 'module',
        presets: ['@babel/preset-react'],
        filename: file,
        retainLines: true,
      });
      fs.writeFileSync(file, output.code);
    }
  } catch(e) {}
});

fs.writeFileSync('auto_dict.json', JSON.stringify(dictionary, null, 2));
