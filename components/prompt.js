import { t } from '../lib/i18n';
export function Prompt({ command, lang }) {
  return (
    <p className="prompt">
      <b>{t(lang, 'promptPrefix')}$</b> {command} <i aria-hidden="true" />
    </p>
  );
}
