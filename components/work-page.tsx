import type { Lang } from '../content/site';
import { getJobs } from '../lib/content';
import { external } from '../lib/external-link';
import { t } from '../lib/i18n';

export function WorkPage({ lang }: { lang: Lang }) {
  return (
    <>
      <div className="timeline max-w-[800px] border-l pl-5">
        {getJobs(lang).map(({ Content, title, dates, url, badges }) => (
          <section className="mb-8" key={title}>
            <p className="font-code text-[.85rem] text-accent">{dates}</p>
            <h2 className="my-[.2rem] font-code text-[1.2rem] font-bold leading-[1.2]">
              {url ? (
                <a href={url} {...external}>
                  {`${title} `}
                  <span aria-hidden="true">↗</span>
                  <span className="sr-only">{t(lang, 'newTab')}</span>
                </a>
              ) : (
                title
              )}
            </h2>
            <Content />
            {badges && (
              <ul className="badges mt-[.8rem] flex list-none flex-wrap gap-[.4rem] p-0 font-code text-xs">
                {badges.map((badge) => (
                  <li
                    className="rounded-full border px-[.6rem] py-[.15rem] text-accent"
                    key={badge}
                  >
                    {badge}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <p>{t(lang, 'education')}</p>
    </>
  );
}
