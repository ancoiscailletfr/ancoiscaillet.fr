import en from '../content/messages/en.json';
import fr from '../content/messages/fr.json';
import type { Lang } from '../content/site';

export type Messages = typeof fr;
export type MessageKey = keyof Messages;

const messages: Record<Lang, Messages> = { fr, en };

export function t(lang: Lang, key: MessageKey): string {
  return messages[lang][key];
}
