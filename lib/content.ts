import enAbout from '../content/en/about.mdx';
import enLegal from '../content/en/legal.mdx';
import frAbout from '../content/fr/about.mdx';
import frLegal from '../content/fr/legal.mdx';
import { jobs } from '../content/jobs';
import type { Lang } from '../content/site';

const pages = { fr: { about: frAbout, legal: frLegal }, en: { about: enAbout, legal: enLegal } };
export const getAbout = (lang: Lang) => pages[lang].about;
export const getLegal = (lang: Lang) => pages[lang].legal;
export const getJobs = (lang: Lang) => jobs[lang];
