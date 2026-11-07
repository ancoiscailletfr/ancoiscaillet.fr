export const paths = {
  fr: ['/', '/a-propos', '/work', '/contact'],
  en: ['/en', '/en/about', '/en/work', '/en/contact'],
};

export const legalPaths = { fr: '/mentions-legales', en: '/en/legal' };

export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/francoiscaillet',
  malt: 'https://www.malt.fr/profile/francoiscaillet',
};

export function person(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'François Caillet',
    url: lang === 'fr' ? 'https://ancoiscaillet.fr' : 'https://ancoiscaillet.fr/en',
    image: 'https://ancoiscaillet.fr/images/portrait.webp',
    jobTitle:
      lang === 'fr' ? 'Développeur full stack JavaScript' : 'Full Stack JavaScript Developer',
    sameAs: [socialLinks.linkedin, socialLinks.malt],
    address: { '@type': 'PostalAddress', addressLocality: 'Lyon', addressCountry: 'FR' },
  };
}

// Update by hand; the monthly routine asks whether it is still accurate.
export const status = { state: 'off', until: null };
