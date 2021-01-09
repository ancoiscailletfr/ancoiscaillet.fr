import React from 'react'
import Me from '@/components/home/verses/Me'
import Experiences from '@/components/home/verses/Experiences'
import Projects from '@/components/home/verses/Projects'
import Degrees from '@/components/home/verses/Diplomas'
import Skills from '@/components/home/verses/Skills'
import { Earth, Mars, Moon, Saturn, Venus } from '@/lib/planets'
import References from '@/components/home/bridges/References'
import WorkTogether from '@/components/home/bridges/WorkTogether'
/* import LastArticles from '@/components/home/bridges/LastArticles' */
import Services from '@/components/home/bridges/Services'
import PoweredBy from '@/components/home/bridges/PoweredBy'

export const BASE_URL = 'https://ancoiscaillet.fr/'
export const APP_NAME = 'François Caillet'

export const bp = {
  sm: 640, md: 768, lg: 1024, xl: 1280
}

export const openLinkInNewTabProps = { target: '_blank', rel: 'noopener noreferrer' }

export const ELEMENT_TYPE = {
  VERSE: 'verse',
  BRIDGE: 'bridge'
}

export const elements = [
  {
    slug: 'me',
    title: 'me',
    type: ELEMENT_TYPE.VERSE,
    themeColor: 'orange',
    planet: <Mars />,
    satellite: 'moon_ocre',
    content: <Me />
  },
  {
    title: 'En quoi puis-je vous être utile?',
    type: ELEMENT_TYPE.BRIDGE,
    content: <Services />
  },
  {
    slug: 'experiences',
    title: 'expériences',
    type: ELEMENT_TYPE.VERSE,
    themeColor: 'grape',
    planet: <Venus />,
    satellite: 'ufo',
    content: <Experiences />
  },
  {
    title: 'On travaille ensemble?',
    type: ELEMENT_TYPE.BRIDGE,
    content: <WorkTogether />
  },
  {
    slug: 'projects',
    title: 'projets',
    type: ELEMENT_TYPE.VERSE,
    themeColor: 'yellow',
    planet: <Moon />,
    satellite: 'meteor',
    content: <Projects />
  },
  {
    title: 'Mes Références',
    type: ELEMENT_TYPE.BRIDGE,
    content: <References />
  },
  {
    slug: 'degrees',
    title: 'diplômes',
    type: ELEMENT_TYPE.VERSE,
    themeColor: 'kaki',
    planet: <Saturn />,
    satellite: 'satellite',
    content: <Degrees />
  },
  {
    slug: 'skills',
    title: 'skills',
    themeColor: 'duck',
    planet: <Earth />,
    satellite: 'moon_gray',
    type: ELEMENT_TYPE.VERSE,
    content: <Skills />
  },
  {
    title: 'Powered By 🚀',
    type: ELEMENT_TYPE.BRIDGE,
    content: <PoweredBy />
  }
  /*, TODO add when blog available
  {
    title: 'Un peu de lecture...',
    type: ELEMENT_TYPE.BRIDGE,
    content: <LastArticles />
  } */
]

export const navigations = elements.filter((elt) => elt.type === ELEMENT_TYPE.VERSE).map(({ slug, title }) => ({ slug: `#${slug}`, title: title }))
/*  .concat([
    {
      title: 'blog',
      slug: '/blog'
    }
  ]) TODO add blog support */
