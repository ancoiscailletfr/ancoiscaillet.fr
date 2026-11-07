import { ViewTransition } from 'react';
import { t } from '../lib/i18n';
import { Prompt } from './prompt';
export function PageShell({ lang, page, children }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <main className={`content shell flex-1 ${page === 'contact' ? 'contact' : ''}`}>
        <Prompt command={t(lang, `${page}Prompt`)} lang={lang} />
        <h1 className="content-heading">{t(lang, `${page}Title`)}</h1>
        {children}
      </main>
    </ViewTransition>
  );
}
