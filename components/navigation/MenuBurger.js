import React from 'react'
import { bindActionCreators } from 'redux'
import { toggleSidebar } from '@/store/navigation/action'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Sidebar from '@/components/modal/Sidebar'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import xw from 'xwind'

/**
 * Menu burger path with motion effect on menu open/close
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Path = props => (
  <motion.path
    fill='transparent'
    css={xw`stroke-current stroke-2`}
    strokeLinecap='round'
    {...props}
  />
)

/**
 * MenuBurger Component
 * only on md
 * @param showSidebar sidebar is visible
 * @param toggleSidebar hide/show sidebar nav
 * @returns {JSX.Element}
 * @constructor
 */
const MenuBurger = ({ showSidebar, toggleSidebar }) => {
  return (
    <>
      <Sidebar />
      <MenuBurgerStyled
        aria-label='menu burger'
        initial={false}
        animate={showSidebar ? 'open' : 'closed'}
        onClick={() => toggleSidebar()}
      >
        <svg width='23' height='23' viewBox='0 0 23 23'>
          <Path
            variants={{
              closed: { d: 'M 2 2.5 L 20 2.5' },
              open: { d: 'M 3 16.5 L 17 2.5' }
            }}
          />
          <Path
            d='M 2 9.423 L 20 9.423'
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 }
            }}
            transition={{ duration: 0.1 }}
          />
          <Path
            variants={{
              closed: { d: 'M 2 16.346 L 20 16.346' },
              open: { d: 'M 3 2.5 L 17 16.346' }
            }}
          />
        </svg>
      </MenuBurgerStyled>
    </>
  )
}

const MenuBurgerStyled = styled(motion.button)(xw`
  lg:hidden z-10
  h-10 
  focus:outline-none
  text-gray-platinum
`)

const mapStateToProps = (state) => ({
  showSidebar: state.navigation.showSidebar
})

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebar: bindActionCreators(toggleSidebar, dispatch)
  }
}

MenuBurger.propTypes = {
  showSidebar: PropTypes.bool,
  toggleSidebar: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBurger)
