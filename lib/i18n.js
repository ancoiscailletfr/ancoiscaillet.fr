import en from '../content/messages/en.json';
import fr from '../content/messages/fr.json';

const messages = { fr, en };

export function t(lang, key) {
  if (!Object.hasOwn(messages[lang] ?? {}, key)) throw new Error(`Missing message: ${lang}.${key}`);
  return messages[lang][key];
}
