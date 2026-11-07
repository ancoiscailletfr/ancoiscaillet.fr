import type { Lang } from '../content/site';
import { t } from '../lib/i18n';
export function Prompt({ command, lang }: { command: string; lang: Lang }) {
  return (
    <p className="prompt">
      <b>{t(lang, 'promptPrefix')}$</b> {command} <i aria-hidden="true" />
    </p>
  );
}
