import { wrapper } from '@/store/store'
import { fetchData } from '@/store/api/action'
import { SECTION_TYPE, sections } from '@/lib/constants'
import Bridge from '@/components/home/Bridge'
import Verse from '@/components/home/Verse'

/**
 * Sections components
 * verse is a anchor navigable section with planet behind and some cool effects
 * bridge is a section between verse, more classical display, less inspired 😆
 * @type child component
 */
const SECTIONS = {
  [SECTION_TYPE.VERSE]: Verse,
  [SECTION_TYPE.BRIDGE]: Bridge
}

/**
 * Home page
 * My resume/portfolio/CV
 * each section is a part of my resume (experiences, diplomas..)
 * @returns {JSX.Element}
 * @constructor
 */
export const Home = () => (
  <>
    {sections.map(({ type, ...props }, i) => {
      const Section = SECTIONS[type] ?? null
      return <Section key={i} {...props} />
    })}
  </>
)

/**
 * fetch app states
 */
export const getStaticProps = wrapper.getStaticProps(
  fetchData()
)

Home.layout = 'home'

export default Home
