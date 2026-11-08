import type { Metadata } from 'next';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { Prompt } from '../components/prompt';
import { RootLayout } from '../components/root-layout';
import { t } from '../lib/i18n';

export const metadata: Metadata = { title: '404 — François Caillet', robots: { index: false } };

export default function GlobalNotFound() {
  return (
    <RootLayout lang="fr">
      <ViewTransition enter="page" exit="page" default="none">
        <main className="content shell flex-1">
          <h1 className="content-heading text-orange">404</h1>
          <div className="term">
            <div className="bar" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="bd">
              <Prompt lang="fr" command={t('fr', 'notFoundPrompt')} />
              <div className="error">bash: page-introuvable: No such file or directory</div>
              <div>{t('fr', 'notFoundFrench')}</div>
              <Link href="/">./accueil</Link>
            </div>
          </div>
        </main>
      </ViewTransition>
    </RootLayout>
  );
}
