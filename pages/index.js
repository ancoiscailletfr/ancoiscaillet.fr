import React from 'react'
import { connect } from 'react-redux'
import { ELEMENT_TYPE, elements } from '@/lib/constants'
import dynamic from 'next/dynamic'
import xw from 'xwind'
import { bindActionCreators } from 'redux'
import {
  fetchDiplomas,
  fetchExperiences,
  fetchPoweredBy,
  fetchProjects,
  fetchReferences,
  fetchServices,
  fetchSkills,
  fetchUs
} from '@/store/api/action'
import { wrapper } from '@/store/store'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/modal/ContactModal'
import VisitCard from '@/components/assets/VisitCard'
import { CloudinaryContext } from 'cloudinary-react'
import { css } from '@emotion/react'

const Intro = dynamic(() => import('@/components/home/Intro'))
const Outro = dynamic(() => import('@/components/home/Outro'))
const Bridge = dynamic(() => import('@/components/home/Bridge'))
const Verse = dynamic(() => import('@/components/home/Verse'))
const HomeBackground = dynamic(() => import('@/components/assets/HomeBackground'), { ssr: false })

/**
 * Home page
 * My resume/portfolio/CV
 * @returns {JSX.Element}
 * @constructor
 */
export const Home = () => (
  <>
    <VisitCard />
    <Header />
    <ContactModal />
    <Footer />
    <HomeBackground />
    <Intro />
    <div css={[xw`relative w-full max-w-full h-full`, css`padding-top: 100vh`]}>
      <div css={xw`flex flex-col justify-between mt-12`}>
        {elements.map(({ type, ...props }) => {
          switch (type) {
            case ELEMENT_TYPE.VERSE:
              return <Verse key={props.slug} {...props} />
            case ELEMENT_TYPE.BRIDGE:
              return <Bridge key={props.title} {...props} />
            default:
              return null
          }
        })}
      </div>
      <Outro />
    </div>
  </>

)

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }) => {
    await store.dispatch(fetchUs())
    await store.dispatch(fetchDiplomas())
    await store.dispatch(fetchProjects())
    await store.dispatch(fetchExperiences())
    await store.dispatch(fetchSkills())
    await store.dispatch(fetchReferences())
    await store.dispatch(fetchServices())
    await store.dispatch(fetchPoweredBy())
  }
)

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMe: bindActionCreators(fetchUs, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Home)
