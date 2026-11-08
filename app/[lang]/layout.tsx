import { notFound } from 'next/navigation';
import { metadata as meta, RootLayout, viewport as view } from '../../components/root-layout';
import { isLang, languages } from '../../content/site';
export const metadata = meta;
export const viewport = view;
export const dynamicParams = false;
export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}
export default async function Layout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return <RootLayout lang={lang}>{children}</RootLayout>;
}
