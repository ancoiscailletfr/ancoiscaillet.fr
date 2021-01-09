import React from 'react'
import Logo from '@/components/assets/Logo'
import { motion, useSpring, useTransform, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import xw from 'xwind'
import Navigation from '@/components/navigation'
import { bp } from 'lib/constants'

/**
 * Main header component
 * logo, navigation
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
  const { scrollYProgress, scrollY } = useViewportScroll()
  const transformedHeight = useTransform(scrollYProgress, [0, 0.05], ['66,6667%', '0%'])
  const transformedBoxShadow = useTransform(scrollYProgress, [0, 0.05], ['0px 25px 50px -12px rgba(0,0,0,0.4)', '0px 1px 3px 0px rgba(0,0,0,0.1)'])
  const y = useSpring(0, { damping: 10 })

  scrollY.onChange(() => {
    if (window.innerWidth < bp.md && scrollY.get() > 500 && Math.sign(scrollY.getPrevious() - scrollY.get()) < 0) {
      y.set(-60)
    } else {
      y.set(0)
    }
  })

  return (
    <>
      <HeaderBg style={{ height: transformedHeight, boxShadow: transformedBoxShadow, y }} />
      <NavWrapper style={{ y }}>
        <Logo />
        <Navigation />
      </NavWrapper>
    </>
  )
}

const HeaderBg = styled(motion.header)([xw`
  fixed inset-0
  h-7/12 md:h-2/3
  bg-gray-900 bg-opacity-50 md:bg-opacity-25
  shadow z-20
`,
css`
  min-height: 56px;
  backdrop-filter: blur(3px);
`])

const NavWrapper = styled(motion.nav)(xw`
  w-full fixed 
  flex-wrap flex items-center justify-between 
  py-1 px-2 md:px-4
  z-50
`)

export default Header
