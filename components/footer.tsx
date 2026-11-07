import Link from 'next/link';
import { type Lang, publicPath } from '../content/site';
import { t } from '../lib/i18n';
import { ThemeSwitcher } from './theme-switcher';

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="shell flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pt-4 pb-6 text-[.8rem] text-muted">
      <ThemeSwitcher lang={lang} />
      <p>
        © {new Date().getFullYear()} François Caillet ·{' '}
        <Link href={publicPath(lang, 'legal')}>{t(lang, 'footerLegal')}</Link>
      </p>
    </footer>
  );
}
