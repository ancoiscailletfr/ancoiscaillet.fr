import { ViewTransition } from 'react';
import { getLegal } from '../lib/content';
import { t } from '../lib/i18n';
import { buildMetadata } from '../lib/metadata';
import { Prompt } from './prompt';
export function LegalPage({ lang }) {
  const Content = getLegal(lang);
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <main className="content shell flex-1">
        <Prompt lang={lang} command={t(lang, 'legalPrompt')} />
        <h1 className="content-heading">{t(lang, 'legalTitle')}</h1>
        <Content />
      </main>
    </ViewTransition>
  );
}
export const legalMetadata = (lang) => ({
  ...buildMetadata(lang, 'legal'),
  robots: { index: false },
});
