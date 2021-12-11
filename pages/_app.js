import { DefaultSeo } from 'next-seo'
import { CloudinaryContext } from 'cloudinary-react'
import { Global } from '@emotion/react'
import { AnimatePresence, motion } from 'framer-motion'
import xw from 'xwind'
import { wrapper } from '@/store/store'
import '@/styles/base.css'
import '@/lib/fontawesome'
import '@/lib/smoothScroll'
import '@/lib/moment'
import SEO from '../next-seo.config'
import Loader from '@/components/assets/Loader'
import Meta from '@/components/Meta'
import LayoutWrapper from '@/layout/layoutWrapper'
import ContactModal from '@/components/modal/ContactModal'

const App = ({ Component, pageProps, router }) => (
  <>
    <Loader />
    <DefaultSeo {...SEO} />
    <Meta />
    <Global styles={xw`XWIND_GLOBAL`} />
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route} initial='pageInitial' animate='pageAnimate' exit='pageExit' variants={pageVariants}
      >
        <CloudinaryContext cloudName='francoiscaillet'>
          <ContactModal />
          <LayoutWrapper {...pageProps}>
            <Component {...pageProps} />
          </LayoutWrapper>
        </CloudinaryContext>
      </motion.div>
    </AnimatePresence>
  </>
)

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
