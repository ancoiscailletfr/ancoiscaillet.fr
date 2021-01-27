import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useSpring, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import { useInView } from 'react-intersection-observer'
import xw from 'xwind'
import { css } from '@emotion/react'

import { bindActionCreators } from 'redux'
import { setActive } from '@/store/navigation/action'
import { connect } from 'react-redux'

import RotatingPlanet from '@/components/assets/RotatingPlanet'

/**
 * Verse component is a section of my resume
 * each verse describe a part of my resume
 * each one have its planet with its satellite, both rotating
 * @param slug element id / anchor nav
 * @param content the child
 * @param orbit content, planet and satellite
 * @param setActiveSection when verse in view dispatch state
 * @param activeSection current active section/verse
 * @returns {JSX.Element}
 * @constructor
 */
const Verse = ({ slug, content, orbit, setActiveSection, activeSection }) => {
  const [direction, setDirection] = useState(1)
  const [ref, inView] = useInView({
    threshold: [0.45, 0.55],
    triggerOnce: false
  })

  const { scrollY } = useViewportScroll()
  const rotateY = useSpring(0, { stiffness: 50, restDelta: 2 })

  /**
   * on scrollY change redefine direction
   * 1 : scrolling down
   * -1 : scrolling top
   */
  scrollY.onChange((latest) => {
    setDirection(scrollY.getPrevious() > latest ? 1 : -1)
  })

  useEffect(() => {
    const tag = `#${slug}`
    if (inView) {
      rotateY.set(0)
      activeSection !== tag && setActiveSection(tag)
    } else {
      // mark- if we come from top it's going from right to left and vice versa
      rotateY.set(direction > 0 ? -180 : 180)
      // mark- check equality before setting to prevent override
      activeSection === tag && setActiveSection(null)
    }
  }, [inView])

  // noinspection HtmlDeprecatedTag
  return (
    <VerseWrapper ref={ref}>
      <div css={[xw`relative -z-10`]}>
        <a
          id={slug} name={slug} aria-label={slug} css={[xw`absolute invisible -top-14`]}
        />
        <motion.div
          style={{ transformStyle: 'preserve-3d', rotateY, z: -600 }}
        >
          <motion.div
            initial='behind'
            animate={inView ? 'front' : 'behind'}
            exit='behind'
            variants={verse}
            style={{ transform: 'rotateY(360deg) translateZ(600px)' }}
          >
            {content}
          </motion.div>
        </motion.div>
      </div>
      <RotatingPlanet {...orbit} />
    </VerseWrapper>
  )
}

const VerseWrapper = styled.div([xw`
  relative flex flex-col justify-center select-text
`, css`
  height: 75vh;
  min-height: 700px;
  perspective: 1200px;
  transform-style: preserve-3d;
  
  .container{
    ${xw`relative mx-auto my-0 
      w-full max-w-screen-xl 
      overflow-visible
      xl:rounded-2xl shadow-lg py-4 xl:p-3.5 z-10
      bg-opacity-25`};
    box-shadow: inset 0 -0.25rem 0 rgba(0,0,0,0.125);
  }
  
`])

const verse = {
  front: {
    opacity: 1
  },
  behind: {
    opacity: [null, 0]
  }
}

Verse.propTypes = {
  slug: PropTypes.string.isRequired,
  content: PropTypes.node,
  orbit: PropTypes.object,
  setActiveSection: PropTypes.func,
  activeSection: PropTypes.string
}

const mapStateToProps = (state) => ({
  activeSection: state.navigation.active
})

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveSection: bindActionCreators(setActive, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verse)
