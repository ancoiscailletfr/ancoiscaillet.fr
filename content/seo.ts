import type { Lang, Page } from './site';

export const seo = {
  fr: {
    home: {
      title: 'François Caillet — Développeur Full Stack JavaScript',
      description:
        'Développeur full stack JavaScript à Lyon, François Caillet construit des outils web solides et simples, notamment pour les rédactions du Monde.',
    },
    about: {
      title: 'À propos — François Caillet',
      description:
        'Découvrez le parcours de François Caillet, développeur full stack à Lyon, son expérience, ses convictions et ses centres d’intérêt.',
    },
    work: {
      title: 'Parcours — François Caillet',
      description:
        'Découvrez les expériences de François Caillet : CMS des rédactions du Monde, projets freelance et développement chez Sopra Steria.',
    },
    contact: {
      title: 'Contact — François Caillet',
      description:
        'Un projet ou une mission en développement web ? Contactez François Caillet, développeur full stack JavaScript à Lyon, sur LinkedIn ou Malt.',
    },
    legal: {
      title: 'Mentions légales — François Caillet',
      description:
        'Mentions légales du site personnel de François Caillet : hébergement, données personnelles, crédits photographiques et contact.',
    },
  },
  en: {
    home: {
      title: 'François Caillet — Full Stack JavaScript Developer',
      description:
        'François Caillet is a full stack JavaScript developer in Lyon, building solid, simple web tools for projects including Le Monde’s newsrooms.',
    },
    about: {
      title: 'About — François Caillet',
      description:
        'Discover François Caillet’s background as a full stack developer in Lyon, his experience, approach to software and interests outside code.',
    },
    work: {
      title: 'Experience — François Caillet',
      description:
        'Explore François Caillet’s experience building Le Monde’s newsroom CMS, working on freelance projects and developing software at Sopra Steria.',
    },
    contact: {
      title: 'Contact — François Caillet',
      description:
        'Have a web project or an opportunity? Contact François Caillet, a full stack JavaScript developer based in Lyon, through LinkedIn or Malt.',
    },
    legal: {
      title: 'Legal notice — François Caillet',
      description:
        'Legal information for François Caillet’s personal website, including hosting, personal data, photo credits and contact details.',
    },
  },
} satisfies Record<Lang, Record<Page, { title: string; description: string }>>;
