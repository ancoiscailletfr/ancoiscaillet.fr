import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { motion, useSpring, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import NavigationWrapper from '@/components/navigation/NavigationWrapper'
import { theme } from 'tailwind.config'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import xw from 'xwind'
import { css } from '@emotion/react'

const Planet = dynamic(() => import('@/components/assets/Planet'))

/**
 * Verse component
 * @param index
 * @param slug element id / anchor nav
 * @param content
 * @returns {JSX.Element}
 * @constructor
 */
const Verse = ({ slug, themeColor, planet, satellite, content }) => {
  const tag = `#${slug}`
  const [direction, setDirection] = useState(1)
  const { scrollY } = useViewportScroll()
  const rotateY = useSpring(0, { stiffness: 50, restDelta: 2 })
  const [ref, inView] = useInView({
    /* Optional options */
    threshold: [0.45, 0.55],
    triggerOnce: false
  })

  scrollY.onChange((v) => {
    setDirection(scrollY.getPrevious() > v ? 1 : -1)
  })

  useEffect(() => {
    inView ? rotateY.set(0) : rotateY.set(direction > 0 ? -180 : 180)
  }, [inView])

  // noinspection HtmlDeprecatedTag
  return (
    <NavigationWrapper slug={tag} inView={inView}>
      <VerseWrapper ref={ref}>
        <div css={[xw`relative -z-10`]}>
          <a
            id={slug} name={slug} aria-label={slug} css={[xw`absolute invisible -top-14`]}
          />
          <motion.div
            css={[xw`z-10 relative  w-full`, css`backface-visibility: hidden;`]}
            style={{ transformStyle: 'preserve-3d', rotateY, z: -600 }}
          >
            <VerseContainer
              color={theme.colors[themeColor]['400']}
              initial='behind'
              animate={inView ? 'front' : 'behind'}
              exit='behind'
              variants={verse}
              style={{ transform: 'rotateY(360deg) translateZ(600px)' }}
            >
              {content}
            </VerseContainer>
          </motion.div>
        </div>
        <Planet {...{ planet, satellite }} />
      </VerseWrapper>
    </NavigationWrapper>
  )
}

const VerseWrapper = styled.div([xw`
  relative flex flex-col justify-center select-text
`, css`
  height: 75vh;
  min-height: 700px;
  perspective: 1200px;
  transform-style: preserve-3d;
`])

const VerseContainer = styled(motion.div)([xw`
  relative mx-auto my-0 
  w-full max-w-screen-xl 
  overflow-visible
  xl:rounded-2xl shadow-lg py-4 xl:p-3.5 z-10
`,
props => css`
  background-color: ${props.color}40; /* opacity: 25% */
  box-shadow: inset 0 -0.25rem 0 rgba(0,0,0,0.125);
`
])

const verse = {
  front: {
    opacity: 1
  },
  behind: {
    opacity: [null, 0]
  }
}

Verse.propTypes = {
  content: PropTypes.node,
  planet: PropTypes.node,
  satellite: PropTypes.string,
  slug: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired
}

export default Verse
