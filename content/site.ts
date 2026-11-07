export const languages = ['fr', 'en'] as const;
export type Lang = (typeof languages)[number];

export function isLang(value: string): value is Lang {
  return languages.some((lang) => lang === value);
}

export const routes = {
  home: { fr: '', en: '' },
  about: { fr: 'a-propos', en: 'about' },
  work: { fr: 'work', en: 'work' },
  contact: { fr: 'contact', en: 'contact' },
  legal: { fr: 'mentions-legales', en: 'legal' },
} as const satisfies Record<string, Record<Lang, string>>;
export type Page = keyof typeof routes;
export function publicPath(lang: Lang, page: Page = 'home') {
  return `${lang === 'fr' ? '' : `/${lang}`}/${routes[page][lang]}`.replace(/\/$/, '') || '/';
}
export function routeKey(lang: Lang, slug: string): Page | undefined {
  for (const [key, translations] of Object.entries(routes)) {
    if (translations[lang] === slug && isPage(key)) return key;
  }
  return undefined;
}

function isPage(value: string): value is Page {
  return Object.hasOwn(routes, value);
}

export const paths: Record<Lang, string[]> = { fr: [], en: [] };
for (const lang of languages) {
  for (const key of Object.keys(routes)) {
    if (isPage(key) && key !== 'legal') paths[lang].push(publicPath(lang, key));
  }
}

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/francoiscaillet',
  malt: 'https://www.malt.fr/profile/francoiscaillet',
};

export function person(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'François Caillet',
    url: `https://ancoiscaillet.fr${publicPath(lang)}`,
    image: 'https://ancoiscaillet.fr/images/portrait.webp',
    jobTitle:
      lang === 'fr' ? 'Développeur full stack JavaScript' : 'Full Stack JavaScript Developer',
    sameAs: [socialLinks.linkedin, socialLinks.malt],
    address: { '@type': 'PostalAddress', addressLocality: 'Lyon', addressCountry: 'FR' },
  };
}

// Update by hand; the monthly routine asks whether it is still accurate.
export type Status =
  | { state: 'off' | 'available'; until: null }
  | { state: 'soon'; until: string | null };

export const status: Status = { state: 'off', until: null };
