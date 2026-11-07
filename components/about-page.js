import Link from 'next/link';
import { getAbout } from '../lib/content';
import { external } from '../lib/external-link';
import { t } from '../lib/i18n';
export function AboutPage({ lang }) {
  const About = getAbout(lang);
  const components = {
    h2: (props) => (
      <h2 className="my-[.2rem] font-code text-[1.2rem] font-bold leading-[1.2]" {...props} />
    ),
    a: ({ href, children }) =>
      href.startsWith('https:') ? (
        <a href={href} {...external}>
          {`${children} `}
          <span aria-hidden="true">↗</span>
          <span className="sr-only">{t(lang, 'newTab')}</span>
        </a>
      ) : (
        <Link href={href}>{children}</Link>
      ),
  };
  return (
    <div className="grid gap-12 min-[900px]:grid-cols-[1.3fr_1fr] min-[900px]:items-start">
      <div>
        <About components={components} />
      </div>
      <picture>
        <source media="(min-width: 900px)" srcSet="/images/workspace.webp" />
        <img
          src="/images/workspace.webp"
          className="hidden h-auto w-full rounded-[.7rem] min-[900px]:block"
          width="800"
          height="800"
          alt={t(lang, 'workspace')}
          loading="lazy"
        />
      </picture>
    </div>
  );
}
