/* eslint-disable react/prop-types */
import '@/styles/base.css'
import React, { useEffect } from 'react'
import { wrapper } from '@/store/store'
import { AnimatePresence, motion } from 'framer-motion'
import smoothScroll from '@/lib/smoothScroll'
import { library } from '@fortawesome/fontawesome-svg-core'
import { DefaultSeo } from 'next-seo'
import { CloudinaryContext } from 'cloudinary-react'
import SEO from '../next-seo.config'
import { Global } from '@emotion/react'
import xw from 'xwind'

// Define app fontawesome library
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleRight,
  faCheckCircle,
  faClock,
  faDatabase,
  faDiagnoses,
  faEnvelope,
  faExternalLinkAlt,
  faFilePdf,
  faGraduationCap,
  faHandshake,
  faHandsHelping,
  faLaptop,
  faLightbulb,
  faMapMarkedAlt,
  faMapPin,
  faMinus,
  faMobileAlt,
  faPalette,
  faPlus,
  faSearch,
  faShareAlt,
  faSpinner,
  faStreetView,
  faTablet,
  faTimes,
  faTimesCircle,
  faTv,
  faUsers,
  faWater
} from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import moment from 'moment'

library.add(faCopyright, faShareAlt, faTimes, faCheckCircle, faSpinner, faEnvelope, faExternalLinkAlt, faMapMarkedAlt,
  faDatabase, faHandshake, faMobileAlt, faUsers, faTablet, faLaptop, faTv, faMapPin, faPlus, faMinus, faFilePdf,
  faTimesCircle, faDiagnoses, faStreetView, faPalette, faGraduationCap, faHandsHelping, faLightbulb, faWater, faSearch,
  faClock, faAngleRight, fab)

moment.locale('FR')

function App ({ Component, pageProps, router }) {
  useEffect(() => {
    smoothScroll().then(null)
  }, [])

  return (
    <>
      <CloudinaryContext cloudName='francoiscaillet'>
        <DefaultSeo {...SEO} />
        <Global styles={xw`XWIND_GLOBAL`} />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            css={xw`h-full`}
            key={router.route} initial='pageInitial' animate='pageAnimate' exit='pageExit' variants={pageVariants}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </CloudinaryContext>
    </>
  )
}

const pageVariants = {
  pageInitial: {
    opacity: 1
  },
  pageAnimate: {
    opacity: 1
  },
  pageExit: {
    opacity: 1
  }
}

export default wrapper.withRedux(App)
