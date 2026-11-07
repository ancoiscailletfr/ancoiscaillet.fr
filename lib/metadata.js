import { seo } from '../content/seo';
import { legalPaths, paths } from '../content/site';

export function buildMetadata(lang, page) {
  const [title, description] = seo[lang][page];
  const index = ['home', 'about', 'work', 'contact', 'legal'].indexOf(page);
  const pagePaths = page === 'legal' ? legalPaths : { fr: paths.fr[index], en: paths.en[index] };
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
