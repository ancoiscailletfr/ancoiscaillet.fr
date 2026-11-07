import Link from 'next/link';
import { publicPath } from '../content/site';
import { t } from '../lib/i18n';

export function Logo({ lang }) {
  return (
    <Link className="logo" href={publicPath(lang)} aria-label={t(lang, 'homeLabel')}>
      <svg width="32" height="32" viewBox="-3 -3 106 106" aria-hidden="true">
        <path
          fill="currentColor"
          d="M100 92.25V7.75C100 3.46979 96.5302 0 92.25 0H50H7.74996C3.46975 0 0 3.46979 0 7.75V52.011C0 56.2912 3.46975 59.761 7.74995 59.761H42.2528C46.533 59.761 50 63.2308 50 67.511V92.25C50 96.5302 53.4698 100 57.75 100H92.25C96.5302 100 100 96.5302 100 92.25Z"
        />
      </svg>
    </Link>
  );
}
