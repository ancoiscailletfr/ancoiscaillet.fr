import { readFileSync } from 'node:fs';
import { languages, paths } from '../content/site.js';

const load = (lang) =>
  JSON.parse(readFileSync(new URL(`../content/messages/${lang}.json`, import.meta.url)));
const kind = (value) => (Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value);

const errors = [];
const compare = (fr, en, path) => {
  const type = kind(fr);
  if (type !== kind(en)) return errors.push(`${path}: ${type} in fr, ${kind(en)} in en`);
  if (type === 'string') {
    if (!fr.trim() || !en.trim()) errors.push(`${path}: empty string`);
  } else if (type === 'array') {
    if (fr.length !== en.length)
      errors.push(`${path}: ${fr.length} items in fr, ${en.length} in en`);
    else for (const [i, item] of fr.entries()) compare(item, en[i], `${path}[${i}]`);
  } else if (type === 'object') {
    for (const key of new Set([...Object.keys(fr), ...Object.keys(en)])) {
      const childPath = path ? `${path}.${key}` : key;
      if (!Object.hasOwn(fr, key) || !Object.hasOwn(en, key))
        errors.push(`${childPath}: missing in ${Object.hasOwn(fr, key) ? 'en' : 'fr'}`);
      else compare(fr[key], en[key], childPath);
    }
  }
};

compare(load('fr'), load('en'), '');
for (const lang of languages) {
  const navLength = load(lang).nav.length;
  if (navLength !== paths[lang].length)
    errors.push(
      `nav: ${navLength} items in messages ${lang}, ${paths[lang].length} paths in site.js`,
    );
}
if (errors.length) {
  console.error(`Message files are inconsistent:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
  process.exitCode = 1;
}
