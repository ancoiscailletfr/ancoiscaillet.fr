import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bp } from '@/lib/constants'
import { openLinkInNewTabProps as newTab } from '@/lib/utlis'
import { motion, useViewportScroll } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from '@emotion/styled'
import { useWindowWidth } from '@react-hook/window-size'
import xw from 'xwind'
import Button from '@/components/assets/Button'

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
        <SocialLinkWrapper
          key={id}
          custom={index}
          {...(windowWidth >= bp.md
            ? navAnimations
            : {
                animate: isOpen ? 'open' : 'closed',
                transition: { duration: 0.4, ease: 'easeOut' },
                variants: socialsMenuVariants
              })}
        >
          <SocialLink
            as='a'
            aria-label={title} href={url} {...newTab}
          >
            <FontAwesomeIcon icon={['fab', icon]} />
          </SocialLink>
        </SocialLinkWrapper>
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

const SocialLinkWrapper = styled(motion.div)(xw`
  absolute top-1/2 left-1/2 
  transform -translate-x-1/2 -translate-y-1/2 
  -z-10 w-full h-full 
  md[relative block top-0 left-0
  w-auto h-auto 
  transform translate-x-0 translate-y-0]
`)

const SocialLink = styled(Button)(xw`
  w-full h-full rounded-full
  justify-center 
  bg-darkblue-700 shadow-inner shadow-sm
  hover:bg-darkblue-600
  md[z-0
    rounded-none 
    text-gray-700 
    bg-transparent shadow-none hover:bg-transparent]
`)

const ToggleButton = styled(Button)(xw`
  z-10 justify-center
  w-full h-full rounded-full
  bg-darkblue-800 hover:bg-darkblue-700
  md:hidden
`)

const mapStateToProps = (state) => ({
  socials: state.api.us.socialNetworks
})

export default connect(mapStateToProps, null)(Socials)
