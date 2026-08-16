const fs = require('fs');
const babel = require('@babel/core');
const t = require('@babel/types');
const path = require('path');

const dejsxPlugin = {
  visitor: {
    CallExpression(path) {
      if (path.node.callee.name === '_jsxDEV' || path.node.callee.name === 'jsxDEV') {
        const typeNode = path.node.arguments[0];
        const propsNode = path.node.arguments[1];
        
        let name;
        if (t.isStringLiteral(typeNode)) {
          name = t.jsxIdentifier(typeNode.value);
        } else if (t.isIdentifier(typeNode)) {
          name = t.jsxIdentifier(typeNode.name);
        } else if (t.isMemberExpression(typeNode)) {
          name = t.jsxMemberExpression(t.jsxIdentifier(typeNode.object.name), t.jsxIdentifier(typeNode.property.name));
        } else {
          return;
        }
        
        let attributes = [];
        let children = [];
        
        if (t.isObjectExpression(propsNode)) {
          propsNode.properties.forEach(prop => {
            if (t.isObjectProperty(prop)) {
              const isChildren = (t.isIdentifier(prop.key, { name: 'children' }) || t.isStringLiteral(prop.key, { value: 'children' }));
              if (isChildren) {
                const childVal = prop.value;
                if (t.isArrayExpression(childVal)) {
                  childVal.elements.forEach(el => {
                    if (t.isStringLiteral(el)) {
                      children.push(t.jsxText(el.value));
                    } else if (t.isJSXElement(el) || t.isJSXFragment(el)) {
                      children.push(el);
                    } else {
                      children.push(t.jsxExpressionContainer(el));
                    }
                  });
                } else {
                  if (t.isStringLiteral(childVal)) {
                    children.push(t.jsxText(childVal.value));
                  } else if (t.isJSXElement(childVal) || t.isJSXFragment(childVal)) {
                    children.push(childVal);
                  } else {
                    children.push(t.jsxExpressionContainer(childVal));
                  }
                }
              } else {
                let attrName;
                if (t.isIdentifier(prop.key)) {
                  attrName = t.jsxIdentifier(prop.key.name);
                } else if (t.isStringLiteral(prop.key)) {
                  let keyVal = prop.key.value;
                  if (keyVal.includes('-')) {
                    attrName = t.jsxIdentifier(keyVal);
                  } else {
                    attrName = t.jsxIdentifier(keyVal);
                  }
                }
                
                let attrValue;
                if (t.isStringLiteral(prop.value)) {
                  attrValue = prop.value;
                } else if (t.isJSXElement(prop.value) || t.isJSXFragment(prop.value)) {
                   attrValue = t.jsxExpressionContainer(prop.value);
                } else {
                  attrValue = t.jsxExpressionContainer(prop.value);
                }
                if (attrName) {
                  attributes.push(t.jsxAttribute(attrName, attrValue));
                }
              }
            }
          });
        }
        
        const openingElement = t.jsxOpeningElement(name, attributes, children.length === 0);
        const closingElement = children.length === 0 ? null : t.jsxClosingElement(name);
        
        const jsxElement = t.jsxElement(openingElement, closingElement, children);
        path.replaceWith(jsxElement);
      }
    }
  }
};

const files = ['src/components/Navbar.jsx', 'src/features/chat/ChatAssistant.jsx', 'src/features/dashboard/Dashboard.jsx', 'src/features/livestock/AnimalDetail.jsx', 'src/features/market/MarketView.jsx', 'src/features/microfarm/Microfarm.jsx', 'src/features/voice/VoiceControl.jsx', 'src/features/yield/YieldPredictor.jsx'];

files.forEach(file => {
  const code = fs.readFileSync(file, 'utf8');
  try {
    const output = babel.transformSync(code, {
      plugins: [dejsxPlugin],
      filename: file,
      retainLines: true,
      generatorOpts: { jsescOption: { minimal: true } }
    });
    // Remove the imported jsxDEV line if it exists
    let finalCode = output.code.replace(/import\s*\{\s*jsxDEV\s*as\s*_jsxDEV\s*\}\s*from\s*["']react\/jsx-dev-runtime["'];?\n?/g, '');
    finalCode = finalCode.replace(/\/\*#__PURE__\*\//g, '');
    fs.writeFileSync(file, finalCode);
    console.log('Restored JSX in ' + file);
  } catch(e) {
    console.log('Error in ' + file + ': ' + e.message);
  }
});
