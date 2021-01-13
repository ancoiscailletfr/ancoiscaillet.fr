import { BASE_URL } from '@/lib/constants'

const title = 'François Caillet | Développeur Freelance Fullstack'
const description = 'François Caillet, Développeur FullStack spécialisé en Java/Spring & React/Nextjs. Basé sur Lyon,' +
    ' je suis disponible pour développer votre application sur-mesure. Maitrisant à la fois les technologies ' +
    'Frontend et Backend, de la conception à l’intégration, je serai vous accompagner sur l’ensemble de votre projet.'

export default {
  title: title,
  description: description,
  canonical: BASE_URL,
  openGraph: {
    title: title,
    description: description,
    type: 'website',
    locale: 'fr',
    url: BASE_URL,
    images: [
      { url: 'https://res.cloudinary.com/francoiscaillet/image/upload/v1609240644/OG_IMG.png' }
    ],
    site_name: title
  },
  twitter: {
    handle: '@ancoiscailletfr',
    site: '@ancoiscailletfr',
    creator: '@ancoiscailletfr',
    cardType: 'summary'
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, shrink-to-fit=no'
    }
  ]
}
