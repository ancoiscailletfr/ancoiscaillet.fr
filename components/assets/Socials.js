import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bp, openLinkInNewTabProps as newTab } from '@/lib/constants'
import { motion, useViewportScroll } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'
import { useWindowWidth } from '@react-hook/window-size'
import xw from 'xwind'

/**
 * Socials component
 * Mobile/desktop
 * @returns {JSX.Element}
 * @constructor
 */
const Socials = ({ socials }) => {
  const { scrollYProgress } = useViewportScroll()
  const [isOpen, toggleSocialsMenu] = useState(false)
  const windowWidth = useWindowWidth()

  useEffect(() => {
    scrollYProgress.onChange(() => isOpen && toggleSocialsMenu(false))
  }, [isOpen])

  return (
    <SocialsNavigation>
      <ToggleButton aria-label='toggle socials networks menu' onClick={() => toggleSocialsMenu(v => !v)}>
        {isOpen ? <FontAwesomeIcon icon='times' /> : <FontAwesomeIcon icon='share-alt' />}
      </ToggleButton>
      {socials?.map(({ id, title, url, icon }, index) => (
        <SocialLink
          key={id}
          aria-label={title} href={url} {...newTab}
          custom={index}
          {...(windowWidth >= bp.md
            ? navAnimations
            : {
                animate: isOpen ? 'open' : 'closed',
                transition: { duration: 0.4, ease: 'easeOut' },
                variants: socialsMenuVariants
              })}
        >
          <FontAwesomeIcon icon={['fab', icon]} />
        </SocialLink>
      ))}
    </SocialsNavigation>
  )
}

const navAnimations = {
  animate: {
    x: '0%',
    y: '0%',
    opacity: 1,
    scale: 1
  },
  whileHover: {
    y: ['0%', '-10%', '0%']
  }
}

const socialsMenuVariants = {
  open: (index) => ({
    scale: [0.5, 1],
    opacity: 1,
    x: '-50%',
    y: `-${50 + 110 * (index + 1)}%`
  }),
  closed: {
    opacity: 0,
    scale: 0,
    x: '-50%',
    y: '-50%'
  }
}

const SocialsNavigation = styled.nav(xw`
  relative 
  w-12 h-12 text-xl 
  md[flex flex-wrap justify-around items-center
  w-3/12 text-2xl text-gray-800]
  lg:w-1/6
  z-10
`)

const SocialLink = styled(motion.a)(xw`
  absolute top-1/2 left-1/2 -z-10
  w-full h-full rounded-full
  flex items-center justify-center 
  bg-darkblue-700 shadow-inner shadow-sm
  text-gray-platinum
  transform -translate-x-1/2 -translate-y-1/2
  md[top-0 left-0 z-0 
    w-auto h-auto
    relative block rounded-none 
    text-gray-700 
    bg-transparent shadow-none
    transform translate-x-0 translate-y-0]
`)

const ToggleButton = styled.button(xw`
  z-10 
  w-full h-full rounded-full
  bg-darkblue-800
  text-gray-platinum
  md:hidden
  focus:outline-none
`)

Socials.propTypes = {
  socials: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  socials: state.api.us.socialNetworks
})

export default connect(mapStateToProps, null)(Socials)
