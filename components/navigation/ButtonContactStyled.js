import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { toggleContactModal } from '@/store/contact/action'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hideModals } from '@/store/actions'
import xw from 'xwind'
import Button from '@/components/assets/Button'

/**
 * Styled button contact
 * @param repeatDelay snooze effect 💥
 * @param toggleContactModal ✉️ dispatch toggle
 * @param hideModals hide all modals
 * @returns {JSX.Element}
 * @constructor
 */
const ButtonContactStyled = ({ repeatDelay = 300, toggleContactModal, hideModals }) => (
  <motion.div
    animate={{ x: [0, -4, 4, -8, 8, 0] }}
    transition={{ type: 'spring', delay: repeatDelay, duration: 1, repeat: Infinity, repeatDelay: repeatDelay }}
  >
    <ButtonContact
      onClick={() => {
        hideModals()
        toggleContactModal()
      }}
    >
      contactez-moi
      <EnvelopeIcon viewBox='0 0 20 16'>
        <path
          fillRule='evenodd'
          d='M0.574002 1.286L8.074 5.315C8.326 5.45 8.652 5.514 8.98 5.514C9.308 5.514 9.634 5.45 9.886 5.315L17.386 1.286C17.875 1.023 18.337 0 17.44 0H0.521002C-0.375998 0 0.0860016 1.023 0.574002 1.286V1.286ZM17.613 3.489L9.886 7.516C9.546 7.694 9.308 7.715 8.98 7.715C8.652 7.715 8.414 7.694 8.074 7.516C7.734 7.338 0.941002 3.777 0.386002 3.488C-0.00399834 3.284 1.61606e-06 3.523 1.61606e-06 3.707V11C1.61606e-06 11.42 0.566002 12 1 12H17C17.434 12 18 11.42 18 11V3.708C18 3.524 18.004 3.285 17.613 3.489V3.489Z'
          clipRule='evenodd'
        />
      </EnvelopeIcon>
    </ButtonContact>
  </motion.div>
)

const ButtonContact = styled(Button)(xw`
  bg-wildblue-600 bg-opacity-75
  hover:bg-wildblue-500
  focus[border-wildblue-700 bg-opacity-100]
`)

const EnvelopeIcon = styled.svg(xw`
  w-5 pl-2 
  text-wildblue-500 group-hover:text-wildblue-400
  fill-current 
  transition ease-in-out duration-150 animate-pulse
`)

const mapDispatchToProps = (dispatch) => {
  return {
    toggleContactModal: bindActionCreators(toggleContactModal, dispatch),
    hideModals: bindActionCreators(hideModals, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ButtonContactStyled)
