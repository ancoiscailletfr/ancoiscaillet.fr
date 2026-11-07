import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomePage } from '../../components/home-page';
import { isLang } from '../../content/site';
import { buildMetadata } from '../../lib/metadata';
export async function generateMetadata({ params }: PageProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return buildMetadata(lang, 'home');
}
export default async function Route({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <HomePage lang={lang} />;
}
