import { type Lang, status } from '../content/site';
import { type MessageKey, t } from '../lib/i18n';

const statusMessages = {
  off: 'statusOff',
  soon: 'statusSoon',
  available: 'statusAvailable',
} satisfies Record<(typeof status)['state'], MessageKey>;

export function Status({ lang }: { lang: Lang }) {
  const date =
    status.state === 'soon' && status.until
      ? new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
          new Date(status.until),
        )
      : null;
  return (
    <span className={`status status-${status.state}`}>
      <span className="status-dot" aria-hidden="true" />
      {t(lang, statusMessages[status.state])}
      {date && `${t(lang, 'statusFrom')}${date}`}
    </span>
  );
}
