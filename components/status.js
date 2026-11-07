import { status } from '../content/site';
import { t } from '../lib/i18n';
export function Status({ lang }) {
  const date =
    status.state === 'soon' && status.until
      ? new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
          new Date(status.until),
        )
      : null;
  return (
    <span className={`status status-${status.state}`}>
      <span className="status-dot" aria-hidden="true" />
      {t(
        lang,
        { off: 'statusOff', soon: 'statusSoon', available: 'statusAvailable' }[status.state],
      )}
      {date && `${t(lang, 'statusFrom')}${date}`}
    </span>
  );
}
