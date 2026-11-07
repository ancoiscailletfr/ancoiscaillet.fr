import Link from 'next/link';
import { ViewTransition } from 'react';
import { type Lang, person, publicPath } from '../content/site';
import { t } from '../lib/i18n';
import { AvatarWaves } from './avatar-waves';
import { JsonLd } from './json-ld';
import { Prompt } from './prompt';
import { Social } from './social';
import { Status } from './status';
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <JsonLd data={person(lang)} />
      <ViewTransition enter="page" exit="page" default="none">
        <main className="home shell flex-1">
          <div className="portrait aspect-square shrink-0 rounded-full p-[3px]">
            <AvatarWaves />
            {/* biome-ignore lint/performance/noImgElement: Static export serves pre-sized WebP files; next/image adds nothing here. */}
            <img
              className="block h-full w-full rounded-full object-cover"
              src="/images/portrait.webp"
              width="480"
              height="480"
              alt={t(lang, 'portrait')}
            />
          </div>
          <div className="w-full min-w-0 min-[700px]:max-w-[650px]">
            <Prompt command={t(lang, 'homePrompt')} lang={lang} />
            <p className="font-code text-[.85rem] text-accent">
              {lang === 'fr' ? (
                <>
                  <span lang="en">Hello!</span> {t(lang, 'homeGreeting')}
                </>
              ) : (
                t(lang, 'hello')
              )}
            </p>
            <h1 className="mt-[.3rem] mb-4 font-code text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.2] text-orange">
              François Caillet
            </h1>
            <p className="subtitle">
              <span>{t(lang, 'subtitle')}</span>
              <i aria-hidden="true" />
            </p>
            <Status lang={lang} />
            <p className="mb-4">{t(lang, 'intro')}</p>
            <Social lang={lang} />
            <p className="home-links mt-[1.2rem] text-[.9rem] text-muted">
              {t(lang, 'discover')}{' '}
              <Link href={publicPath(lang, 'about')}>{t(lang, 'journey')}</Link> {t(lang, 'and')}{' '}
              <Link href={publicPath(lang, 'work')}>{t(lang, 'workLink')}</Link>.
            </p>
          </div>
        </main>
      </ViewTransition>
    </>
  );
}
