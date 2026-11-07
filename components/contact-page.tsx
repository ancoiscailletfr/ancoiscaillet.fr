import type { Lang } from '../content/site';
import { t } from '../lib/i18n';
import { Social } from './social';
export function ContactPage({ lang }: { lang: Lang }) {
  return (
    <div className="term">
      <div className="bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="bd">
        <div>
          <b>$</b> echo "{t(lang, 'contactQuestion')}"
        </div>
        <div>{t(lang, 'contactAnswer')}</div>
        <div>
          <b>$</b> open linkedin | malt <i className="cursor" aria-hidden="true" />
        </div>
        <Social lang={lang} />
      </div>
    </div>
  );
}
