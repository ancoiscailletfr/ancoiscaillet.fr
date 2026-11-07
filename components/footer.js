import Link from 'next/link';
import { t } from '../lib/i18n';
export function Footer({ lang }) {
  return (
    <footer className="shell pt-4 pb-6 text-center text-[.8rem] text-muted">
      © {new Date().getFullYear()} François Caillet ·{' '}
      <Link href={lang === 'fr' ? '/mentions-legales' : '/en/legal'}>{t(lang, 'footerLegal')}</Link>
    </footer>
  );
}
