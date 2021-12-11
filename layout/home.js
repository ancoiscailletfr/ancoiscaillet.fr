import xw from 'xwind'
import { css } from '@emotion/react'
import VisitCard from '@/components/assets/VisitCard'
import Header from '@/components/Header'
import HomeBackground from '@/components/assets/HomeBackground'
import Intro from '@/components/home/Intro'
import Footer from '@/components/Footer'

/**
 * Home page layout
 * default <head> provide by next-seo, see _app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const HomeLayout = ({ children }) => {
  return (
    <>
      <VisitCard />
      <HomeBackground />
      <Header />
      <Intro />
      <div css={[xw`relative w-full h-full mb-96`, css`margin-top: 110vh`]}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default HomeLayout
