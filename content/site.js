export const routes = {
  home: { fr: '', en: '' },
  about: { fr: 'a-propos', en: 'about' },
  work: { fr: 'work', en: 'work' },
  contact: { fr: 'contact', en: 'contact' },
  legal: { fr: 'mentions-legales', en: 'legal' },
};
export const languages = Object.keys(routes.home);
export function publicPath(lang, page = 'home') {
  return `${lang === 'fr' ? '' : `/${lang}`}/${routes[page][lang]}`.replace(/\/$/, '') || '/';
}
export function routeKey(lang, slug) {
  return Object.keys(routes).find((key) => routes[key][lang] === slug);
}
export const paths = Object.fromEntries(
  languages.map((lang) => [
    lang,
    Object.keys(routes)
      .filter((key) => key !== 'legal')
      .map((key) => publicPath(lang, key)),
  ]),
);
export const legalPaths = Object.fromEntries(
  languages.map((lang) => [lang, publicPath(lang, 'legal')]),
);

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/francoiscaillet',
  malt: 'https://www.malt.fr/profile/francoiscaillet',
};

export function person(lang) {
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
export const status = { state: 'off', until: null };
