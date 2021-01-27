import React from 'react'
import PropTypes from 'prop-types'
import { motion, useTransform, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import dynamic from 'next/dynamic'
import GraphemeSplitter from 'grapheme-splitter'
import xw from 'xwind'

import { connect } from 'react-redux'
import { css } from '@emotion/react'

const Typewriter = dynamic(() => import('typewriter-effect'), { ssr: false })
const Copola = dynamic(() => import('@/components/assets/Copola'), { ssr: false })

/**
 * Intro component
 * short presentation of myself
 * @returns {JSX.Element}
 * @constructor
 */
const Intro = ({ us }) => {
  const { fullname } = us
  const { scrollYProgress } = useViewportScroll()

  /**
   * Typewriter emoji splitter
   * prevent strange chars
   * @param string
   * @returns {string[]}
   */
  const stringSplitter = string => {
    const splitter = new GraphemeSplitter()
    return splitter.splitGraphemes(string)
  }

  /**
   * init typewriter
   * @returns {function(*): void}
   */
  const initTypewriter = () => (typewriter) => {
    typewriter.pauseFor(500)
      .typeString('Freelancer 🧑‍💻')
      .pauseFor(500)
      .deleteAll()
      .typeString('Développeur ')
      .pauseFor(250)
      .typeString('Passionné 🤩')
      .pauseFor(500)
      .deleteChars(11)
      .typeString('Full Stack')
      .pauseFor(500)
      .deleteChars(9)
      .typeString('rontend')
      .pauseFor(500)
      .deleteChars(8)
      .typeString('Backend')
      .pauseFor(500)
      .deleteChars(8)
      .deleteChars(12)
      .typeString('Lead Développeur')
      .pauseFor(500)
      .start()
  }

  const fadeOutInOnScroll = useTransform(scrollYProgress, [0, 0.1], [1, 0])

  return (
    <motion.div
      css={[xw`absolute inset-0 z-30`]}
      style={{ opacity: fadeOutInOnScroll }}
      animate={{ opacity: [0, 1] }}
    >
      <Box>
        <h3 css={xw`text-sm md[text-base] p-2`}>
          Hello! je m&apos;appelle
        </h3>
        <h1 css={xw`text-2xl md[text-4xl] font-extrabold`}>
          {fullname}
        </h1>
        <h2 css={xw`text-xl md:text-3xl font-bold pt-4 pb-1.5`}>
          <Typewriter
            onInit={initTypewriter()}
            options={{
              loop: true,
              delay: 100,
              stringSplitter
            }}
          />
        </h2>
      </Box>
      <Copola />
    </motion.div>
  )
}
const Box = styled.section([xw`
  hmd:hidden
  flex flex-col justify-center 
  h-1/3
  text-gray-platinum text-center
`, css`padding-top: 56px`])

Intro.propTypes = {
  us: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  us: state.api.us
})

export default connect(mapStateToProps, null)(Intro)
