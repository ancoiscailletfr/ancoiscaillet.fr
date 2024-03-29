import { motion, useCycle } from 'framer-motion'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from '@emotion/styled'
import xw from 'xwind'
import { setActive } from '@/store/navigation/action'
import { hideModals } from '@/store/actions'

const ActiveLine = styled.svg(xw`
  absolute -bottom-1
  w-full h-1 
  left-1/2
  transform -translate-x-1/2
  text-gray-platinum
`)

const line = {
  open: {
    strokeWidth: [2, 3, 3],
    x2: '100%',
  },
  closed: {
    strokeWidth: [1, 0, 0],
    x2: '0%',
  },
}

/**
 * Link component
 * manage navigation between page and sections
 * @param slug destination identifier, starting with '#' then it's a section otherwise is a page
 * @param content children
 * @param active current active navigation
 * @param setActiveNavigation dispatch active page
 * @param hideModals hide all modals (contact, sidebar..)
 * @returns {JSX.Element}
 * @constructor
 */
const Link = ({
  slug, title, active, hideModals,
}) => {
  const [hover, toggleHover] = useCycle(false, true)

  const handleClick = () => (e) => {
    e.preventDefault()
    hideModals()
    document.querySelector(slug).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.button
      css={xw`relative uppercase focus:outline-none`}
      aria-label={title}
      onClick={handleClick()}
      onHoverStart={() => toggleHover()}
      onHoverEnd={() => toggleHover()}
    >
      {title}
      <ActiveLine xmlns='http://www.w3.org/2000/svg'>
        <motion.line
          x1='0'
          y1='0'
          x2='0%'
          y2='0'
          stroke='currentColor'
          strokeWidth='0'
          animate={active === slug || hover ? 'open' : 'closed'}
          variants={line}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        />
      </ActiveLine>
    </motion.button>
  )
}

const mapStateToProps = (state) => ({
  active: state.navigation.active,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveNavigation: bindActionCreators(setActive, dispatch),
    hideModals: bindActionCreators(hideModals, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Link)
