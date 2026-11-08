import type { Metadata } from 'next';
import { seo } from '../content/seo';
import { type Lang, type Page, publicPath } from '../content/site';

export function buildMetadata(lang: Lang, page: Page): Metadata {
  const { title, description } = seo[lang][page];
  const pagePaths = { fr: publicPath('fr', page), en: publicPath('en', page) };
  const path = pagePaths[lang];
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { fr: pagePaths.fr, en: pagePaths.en, 'x-default': pagePaths.fr },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'François Caillet',
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'François Caillet' }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/og.png'] },
  };
}
