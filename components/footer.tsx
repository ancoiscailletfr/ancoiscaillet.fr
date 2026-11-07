import Link from 'next/link';
import { type Lang, publicPath } from '../content/site';
import { t } from '../lib/i18n';
export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="shell pt-4 pb-6 text-center text-[.8rem] text-muted">
      © {new Date().getFullYear()} François Caillet ·{' '}
      <Link href={publicPath(lang, 'legal')}>{t(lang, 'footerLegal')}</Link>
    </footer>
  );
}
