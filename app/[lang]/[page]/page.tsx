import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ComponentType } from 'react';
import { AboutPage } from '../../../components/about-page';
import { ContactPage } from '../../../components/contact-page';
import { LegalPage, legalMetadata } from '../../../components/legal-page';
import { PageShell } from '../../../components/page-shell';
import { WorkPage } from '../../../components/work-page';
import { isLang, type Lang, type Page, routeKey, routes } from '../../../content/site';
import { buildMetadata } from '../../../lib/metadata';

export const dynamicParams = false;

export function generateStaticParams({
  params: { lang },
}: {
  params: Awaited<LayoutProps<'/[lang]'>['params']>;
}) {
  if (!isLang(lang)) return [];

  return Object.values(routes)
    .filter((route) => route !== routes.home)
    .map((route) => ({ page: route[lang] }));
}

export async function generateMetadata({ params }: PageProps<'/[lang]/[page]'>): Promise<Metadata> {
  const { lang, page } = await params;
  if (!isLang(lang)) notFound();

  const key = routeKey(lang, page);
  if (!key || key === 'home') notFound();

  return key === 'legal' ? legalMetadata(lang) : buildMetadata(lang, key);
}

const pages = {
  about: AboutPage,
  work: WorkPage,
  contact: ContactPage,
  legal: LegalPage,
} satisfies Record<Exclude<Page, 'home'>, ComponentType<{ lang: Lang }>>;

export default async function Route({ params }: PageProps<'/[lang]/[page]'>) {
  const { lang, page } = await params;
  if (!isLang(lang)) notFound();

  const key = routeKey(lang, page);
  if (!key || key === 'home') notFound();

  if (key === 'legal') return <LegalPage lang={lang} />;

  const Content = pages[key];

  return (
    <PageShell lang={lang} page={key}>
      <Content lang={lang} />
    </PageShell>
  );
}
