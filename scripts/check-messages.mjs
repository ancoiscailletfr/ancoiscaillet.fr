import { readFileSync } from 'node:fs';

const keys = (lang) =>
  Object.keys(
    JSON.parse(readFileSync(new URL(`../content/messages/${lang}.json`, import.meta.url))),
  ).sort();
if (JSON.stringify(keys('fr')) !== JSON.stringify(keys('en')))
  throw new Error('Message keys differ between fr and en');
