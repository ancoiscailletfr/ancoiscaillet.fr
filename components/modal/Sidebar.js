import { AnimatePresence, motion } from 'framer-motion'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import Overlay from '@/components/Overlay'
import Links from '@/components/navigation/Links'
import xw from 'xwind'
import { css } from '@emotion/react'

/**
 * Sidebar navigation
 * toggle on menu burger click
 * act as a modal
 * @param showSidebar
 * @returns {JSX.Element}
 * @constructor
 */
const Sidebar = ({ showSidebar }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showSidebar && (
        <Overlay css={xw`lg:hidden`}>
          <SidebarContainer
            variants={sidebar}
            initial='closed'
            animate='open'
            exit='closed'
          >
            <Links noSeparator />
          </SidebarContainer>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

const SidebarContainer = styled(motion.div)(xw`
fixed top-0 right-0
w-1/2 md[w-1/3] h-full
bg-gradient-to-t from-wildblue-600 to-wildblue-900
overflow-hidden
shadow-2xl
flex lg[hidden] flex-wrap flex-col justify-center items-center
leading-loose tracking-wide text-gray-platinum
list-none
`, css`
  ul{${xw`text-center text-base flex-col`}}
  li{${xw`py-3`}}
  button svg{${xw`bottom-0`}}
`)

const sidebar = {
  open: {
    clipPath: 'circle(150% at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2
    }
  },
  closed: {
    clipPath: 'circle(0% at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40
    }
  }
}

const mapStateToProps = (state) => ({
  showSidebar: state.navigation.showSidebar
})

export default connect(mapStateToProps, null)(Sidebar)
