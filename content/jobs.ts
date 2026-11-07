import type { MDXContent } from 'mdx/types';
import enFreelance from './en/work/freelance.mdx';
import enLeMonde from './en/work/le-monde.mdx';
import enSopraSteria from './en/work/sopra-steria.mdx';
import frFreelance from './fr/work/freelance.mdx';
import frLeMonde from './fr/work/le-monde.mdx';
import frSopraSteria from './fr/work/sopra-steria.mdx';
import type { Lang } from './site';

export type Job = {
  Content: MDXContent;
  title: string;
  dates: string;
  url?: string;
  badges?: readonly string[];
};

const sirius = {
  title: 'Le Monde · Sirius',
  url: 'https://www.sirius.press',
  badges: ['Node.js', 'TypeScript', 'React', 'GraphQL', 'PostgreSQL', 'Yjs', 'TipTap'],
};
const freelance = { title: 'Freelance · EURL Codanko' };
const sopraSteria = { title: 'Sopra Steria', dates: '2016 – 2020' };

// Displayed in this order.
export const jobs: Record<Lang, readonly Job[]> = {
  fr: [
    { Content: frLeMonde, ...sirius, dates: 'Depuis février 2021 · En ce moment' },
    { Content: frFreelance, ...freelance, dates: 'Depuis juillet 2020' },
    { Content: frSopraSteria, ...sopraSteria },
  ],
  en: [
    { Content: enLeMonde, ...sirius, dates: 'Since February 2021 · Currently' },
    { Content: enFreelance, ...freelance, dates: 'Since July 2020' },
    { Content: enSopraSteria, ...sopraSteria },
  ],
};
