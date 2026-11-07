import enAbout from '../content/en/about.mdx';
import enLegal from '../content/en/legal.mdx';
import enFreelance, { meta as enFreelanceMeta } from '../content/en/work/freelance.mdx';
import enLeMonde, { meta as enLeMondeMeta } from '../content/en/work/le-monde.mdx';
import enSopraSteria, { meta as enSopraSteriaMeta } from '../content/en/work/sopra-steria.mdx';
import frAbout from '../content/fr/about.mdx';
import frLegal from '../content/fr/legal.mdx';
import frFreelance, { meta as frFreelanceMeta } from '../content/fr/work/freelance.mdx';
import frLeMonde, { meta as frLeMondeMeta } from '../content/fr/work/le-monde.mdx';
import frSopraSteria, { meta as frSopraSteriaMeta } from '../content/fr/work/sopra-steria.mdx';

const pages = { fr: { about: frAbout, legal: frLegal }, en: { about: enAbout, legal: enLegal } };
const jobs = {
  fr: [
    { Content: frLeMonde, ...frLeMondeMeta },
    { Content: frFreelance, ...frFreelanceMeta },
    { Content: frSopraSteria, ...frSopraSteriaMeta },
  ],
  en: [
    { Content: enLeMonde, ...enLeMondeMeta },
    { Content: enFreelance, ...enFreelanceMeta },
    { Content: enSopraSteria, ...enSopraSteriaMeta },
  ],
};
export const getAbout = (lang) => pages[lang].about;
export const getLegal = (lang) => pages[lang].legal;
export const getJobs = (lang) => [...jobs[lang]].sort((a, b) => a.order - b.order);
