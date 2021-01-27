import React from 'react'
import { Earth, Mars, Moon, Saturn, Venus } from '@/lib/planets'

import Me from '@/components/home/verses/Me'
import Experiences from '@/components/home/verses/Experiences'
import Projects from '@/components/home/verses/Projects'
import Degrees from '@/components/home/verses/Diplomas'
import Skills from '@/components/home/verses/Skills'
import References from '@/components/home/bridges/References'
import WorkTogether from '@/components/home/bridges/WorkTogether'
import Services from '@/components/home/bridges/Services'
import PoweredBy from '@/components/home/bridges/PoweredBy'

export const BASE_URL = 'https://ancoiscaillet.fr/'
export const APP_NAME = 'François Caillet'

export const bp = {
  sm: 640, md: 768, lg: 1024, xl: 1280
}

export const SECTION_TYPE = {
  VERSE: 'verse',
  BRIDGE: 'bridge'
}

/**
 * home page sections
 * i'm not really proud of that... any suggestions to make this more sexy? 🤔
 */
export const sections = [
  {
    slug: 'me',
    title: 'me',
    type: SECTION_TYPE.VERSE,
    orbit: {
      planet: <Mars />,
      satellite: 'moon_ocre'
    },
    content: <Me />
  },
  {
    title: 'En quoi puis-je vous être utile?',
    type: SECTION_TYPE.BRIDGE,
    content: <Services />
  },
  {
    slug: 'experiences',
    title: 'expériences',
    type: SECTION_TYPE.VERSE,
    orbit: {
      planet: <Venus />,
      satellite: 'ufo'
    },
    content: <Experiences />
  },
  {
    title: 'On travaille ensemble?',
    type: SECTION_TYPE.BRIDGE,
    content: <WorkTogether />
  },
  {
    slug: 'projects',
    title: 'projets',
    type: SECTION_TYPE.VERSE,
    orbit: {
      planet: <Moon />,
      satellite: 'meteor'
    },
    content: <Projects />
  },
  {
    title: 'Mes Références',
    type: SECTION_TYPE.BRIDGE,
    content: <References />
  },
  {
    slug: 'degrees',
    title: 'diplômes',
    type: SECTION_TYPE.VERSE,
    orbit: {
      planet: <Saturn />,
      satellite: 'satellite'
    },
    content: <Degrees />
  },
  {
    slug: 'skills',
    title: 'skills',
    type: SECTION_TYPE.VERSE,
    orbit: {
      planet: <Earth />,
      satellite: 'moon_gray'
    },
    content: <Skills />
  },
  {
    title: 'Powered By 🚀',
    type: SECTION_TYPE.BRIDGE,
    content: <PoweredBy />
  }
  /*, TODO add when blog available
  {
    title: 'Un peu de lecture...',
    type: SECTION_TYPE.BRIDGE,
    content: <LastArticles />
  } */
]

export const navigations = sections.filter((elt) => elt.type === SECTION_TYPE.VERSE).map(
  ({ slug, title }) => ({ slug: `#${slug}`, title: title })
)
/*  .concat([
    {
      title: 'blog',
      slug: '/blog'
    }
  ]) TODO add blog support */
