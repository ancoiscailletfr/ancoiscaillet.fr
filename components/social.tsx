import { type Lang, socialLinks } from '../content/site';
import { external } from '../lib/external-link';
import { t } from '../lib/i18n';
export function Social({ lang }: { lang: Lang }) {
  return (
    <div className="social flex flex-wrap justify-center gap-3">
      <a className="button" href={socialLinks.linkedin} {...external}>
        LinkedIn <span aria-hidden="true">↗</span>
        <span className="sr-only">{t(lang, 'newTab')}</span>
      </a>
      <a className="button secondary" href={socialLinks.malt} {...external}>
        Malt <span aria-hidden="true">↗</span>
        <span className="sr-only">{t(lang, 'newTab')}</span>
      </a>
    </div>
  );
}
