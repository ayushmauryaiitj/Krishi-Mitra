const fs = require('fs');

const enCode = fs.readFileSync('src/i18n/locales/en.js', 'utf8');
const hiCode = fs.readFileSync('src/i18n/locales/hi.js', 'utf8');

const enJsonStr = enCode.replace('const en = ', '').replace(';\nexport default en;', '');
const hiJsonStr = hiCode.replace('const hi = ', '').replace(';\nexport default hi;', '');

const enDict = JSON.parse(enJsonStr);
const hiDict = JSON.parse(hiJsonStr);

const autoEn = JSON.parse(fs.readFileSync('auto_dict.json', 'utf8'));
const autoHi = JSON.parse(fs.readFileSync('auto_dict_hi.json', 'utf8'));

enDict.auto = autoEn;
hiDict.auto = autoHi;

fs.writeFileSync('src/i18n/locales/en.js', 'const en = ' + JSON.stringify(enDict, null, 2) + ';\nexport default en;');
fs.writeFileSync('src/i18n/locales/hi.js', 'const hi = ' + JSON.stringify(hiDict, null, 2) + ';\nexport default hi;');
