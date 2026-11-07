import { notFound } from 'next/navigation';
import { AboutPage } from '../../../components/about-page';
import { ContactPage } from '../../../components/contact-page';
import { LegalPage, legalMetadata } from '../../../components/legal-page';
import { PageShell } from '../../../components/page-shell';
import { WorkPage } from '../../../components/work-page';
import { routeKey, routes } from '../../../content/site';
import { buildMetadata } from '../../../lib/metadata';
export const dynamicParams = false;
export function generateStaticParams({ params: { lang } }) {
  return Object.keys(routes)
    .filter((key) => key !== 'home')
    .map((key) => ({ page: routes[key][lang] }));
}
export async function generateMetadata({ params }) {
  const { lang, page } = await params;
  const key = routeKey(lang, page);
  if (!key) notFound();
  return key === 'legal' ? legalMetadata(lang) : buildMetadata(lang, key);
}
const pages = { about: AboutPage, work: WorkPage, contact: ContactPage };
export default async function Route({ params }) {
  const { lang, page } = await params;
  const key = routeKey(lang, page);
  if (!key) notFound();
  if (key === 'legal') return <LegalPage lang={lang} />;
  const Content = pages[key];
  return (
    <PageShell lang={lang} page={key}>
      <Content lang={lang} />
    </PageShell>
  );
}
