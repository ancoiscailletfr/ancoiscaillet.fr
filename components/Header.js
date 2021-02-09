import React from 'react'
import { motion, useSpring, useTransform, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import xw from 'xwind'

import { bp } from 'lib/constants'

import Logo from '@/components/assets/Logo'
import Navigation from '@/components/navigation'

/**
 * Main header component
 * logo, navigation
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
  const { scrollYProgress, scrollY } = useViewportScroll()
  const scaleY = useTransform(scrollYProgress, [0, 0.05], [1, 0])
  const y = useSpring(0, { damping: 15 })

  /**
   * hide header when scroll down, reappear on scroll up, for medium devices
   */
  scrollY.onChange((latest) => {
    if (window.innerWidth < bp.md && latest > 500 && Math.sign(scrollY.getPrevious() - latest) < 0) {
      y.set(-60)
    } else {
      y.set(0)
    }
  })

  return (
    <>
      <RollUpShutter className='header' style={{ scaleY }} />
      <HeaderWrapper className='header' style={{ y }}>
        <Logo />
        <Navigation />
      </HeaderWrapper>
    </>
  )
}

const RollUpShutter = styled(motion.div)([xw`
  inset-0
  h-7/12 md:h-2/3
  z-20 origin-top
`,
css`
  top: 56px;
`])

const HeaderWrapper = styled(motion.header)(xw`
  inset-x-0 top-0 z-40
  flex items-center justify-between 
  py-1 px-2 md:px-4
`)

export default Header
