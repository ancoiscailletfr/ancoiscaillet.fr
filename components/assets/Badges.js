import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion, useCycle } from 'framer-motion'
import styled from '@emotion/styled'
import { Transformation } from 'cloudinary-react'
import xw from 'xwind'
import { css } from '@emotion/react'

import Image from '@/components/Image'

/**
 * Badges types
 * @type {{IMG: string, LETTER: string, ICON: string}}
 */
const BADGE_TYPES = {
  ICON: 'icon',
  IMG: 'img',
  LETTER: 'letter'
}

/**
 * @type {number} in px
 */
const BADGE_SIZE = 26

/**
 * List of skills each skill as badge
 * it take up all the available space
 * if all cant be displayed, adding a toggle button to show rest
 * @param badges an array of badge
 * @param all if all is set displayed all badges
 * @param line number of line which have to be displayed
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Badges = ({ badges, line, all, ...props }) => {
  const ref = useRef(null)
  const [nbBadgesDisplayed, setNbBadgesDisplayed] = useState(all ? badges.length : 0)
  const [showMore, toggleShowMore] = useCycle(false, true)

  /**
   * take up all the available space, recalculated on resize
   */
  const updateNbDisplayedBadges = () => {
    const displayedBadges = Math.floor(ref.current.clientWidth / BADGE_SIZE)
    setNbBadgesDisplayed(displayedBadges >= badges.length ? displayedBadges * line : (displayedBadges - 1) * line)
  }

  useEffect(() => {
    if (!all) {
      setTimeout(() => {
        updateNbDisplayedBadges()
      }, 100)
      window.addEventListener('resize', updateNbDisplayedBadges, false)
      return () => {
        window.removeEventListener('resize', updateNbDisplayedBadges, false)
      }
    }
  }, [ref])

  return (
    <div {...props} ref={ref}>
      {badges?.slice(0, nbBadgesDisplayed).map(({ id, ...props }) => <Badge key={id} {...props} />)}
      {badges.length > nbBadgesDisplayed && (
        <motion.div whileHover={{ y: -3 }} css={xw`relative z-0 cursor-pointer`}>
          <BadgeStyled
            style={{ zIndex: 1 }}
            onTap={() => toggleShowMore()}
          >
            {showMore ? <FontAwesomeIcon icon='minus' /> : <FontAwesomeIcon icon='plus' />}
          </BadgeStyled>
          <div
            style={{ zIndex: 0 }}
            css={xw`absolute w-6 h-6 bg-gray-100 bg-opacity-75 rounded-full top-0 left-1/3`}
          />
          {showMore && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200 }}
                css={xw`absolute top-full mt-0.5`}
              >
                <Badges
                  badges={badges.slice(nbBadgesDisplayed, badges.length)}
                  all
                  css={xw`flex flex-col items-center`}
                />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </div>
  )
}

/**
 * Badge component a circle with icon or letter inside, on hover or tap show name
 * represent a skill
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Badge = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const badge = <Icon {...props} />
  return (
    <motion.div
      style={{ zIndex: 0 }}
      animate={isOpen ? { y: -3, zIndex: 10 } : { y: 0, zIndex: 0 }}
      css={xw`relative`}
    >
      {badge && (
        <BadgeStyled
          onHoverStart={() => setIsOpen(true)}
          onHoverEnd={() => setIsOpen(false)}
          onTap={() => setIsOpen(v => !v)}
        >
          {badge}
        </BadgeStyled>
      )}
      {isOpen && (
        <AnimatePresence>
          <Pop
            initial={{ opacity: 0, paddingRight: '0%' }}
            animate={{ opacity: 1, paddingRight: '110%' }}
            exit={{ opacity: 0, paddingRight: '0%' }}
          >
            {props.title}
          </Pop>
        </AnimatePresence>
      )}
    </motion.div>

  )
}

Badge.propTypes = {
  title: PropTypes.string
}

/**
 * icon to display
 * @param type svg,icon,letter
 * @param icon font awesome icon
 * @param svg image
 * @param title icon name
 * @param props
 * @returns {JSX.Element|null}
 * @constructor
 */
export const Icon = ({ type, icon, svg, title }) => {
  switch (type) {
    case BADGE_TYPES.ICON:
      return <FontAwesomeIcon icon={icon.length > 1 ? icon : icon[0]} />
    case BADGE_TYPES.IMG:
      return (
        <Image
          image={svg}
        >
          <Transformation width='25' crop='fit' />
        </Image>
      )
    case BADGE_TYPES.LETTER:
      return <span>{title.charAt(0)}</span>
    default:
      return null
  }
}

Icon.propTypes = {
  icon: PropTypes.any,
  svg: PropTypes.any,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

const Pop = styled(motion.span)(xw`
  absolute inset-y-0 right-0.5 z-0 
  w-auto h-full rounded-full bg-gray-platinum
  flex items-center  
  text-xs whitespace-pre
  pl-2
`)

const BadgeStyled = styled(motion.div)([xw`
  relative w-6 h-6 
  mr-0.5 mb-0.5 
  rounded-full bg-gray-platinum 
  overflow-hidden select-none z-10
`, css`
  box-shadow: inset -0.125rem -0.125rem 0 rgba(255,255,255,0.5);
  svg, img, span{
    ${xw`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
  }
  svg { ${xw`p-0.5 text-gray-700`} }
  img { ${xw`p-1`} }
  span { ${xw`uppercase text-sm font-semibold text-gray-700`} }
`])

Badges.propTypes = {
  all: PropTypes.bool,
  badges: PropTypes.array,
  line: PropTypes.number,
  maxBadgesDisplayed: PropTypes.number
}

Badges.defaultProps = {
  all: false,
  line: 1
}

export default Badges
