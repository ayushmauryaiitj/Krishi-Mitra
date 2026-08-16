import fs from 'fs';
import en from './src/i18n/locales/en.js';
import hi from './src/i18n/locales/hi.js';

const autoEn = JSON.parse(fs.readFileSync('auto_dict.json', 'utf8'));
const autoHi = JSON.parse(fs.readFileSync('auto_dict_hi.json', 'utf8'));

en.auto = autoEn;
hi.auto = autoHi;

fs.writeFileSync('src/i18n/locales/en.js', 'const en = ' + JSON.stringify(en, null, 2) + ';\nexport default en;');
fs.writeFileSync('src/i18n/locales/hi.js', 'const hi = ' + JSON.stringify(hi, null, 2) + ';\nexport default hi;');
