import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { AnimatePresence, motion, useViewportScroll } from 'framer-motion'
import styled from '@emotion/styled'
import xw from 'xwind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWindowWidth } from '@react-hook/window-size'
import { css } from '@emotion/react'
import Overlay from '@/components/Overlay'
import Infos from '@/components/contact/Infos'
import Form from '@/components/contact/Form'
import { bp } from '@/lib/constants'
import { toggleContactModal } from '@/store/contact/action'

const ContactContainerStyled = styled(motion.div)(xw`
  fixed z-50
  text-gray-platinum
  w-full h-full md[rounded w-full h-auto max-h-full max-w-5xl]
  top-1/2 left-1/2
  overflow-y-auto
  bg-gradient-to-tl from-darkblue-600 to-orange-500
`)

const ContactContainer = styled.div(xw`
  relative h-auto 
  flex flex-col justify-between 
  p-2 lg[px-8 py-4]
`)

const CloseModalButton = styled.button(xw`
  absolute top-0 right-0 
  py-4 px-5 
  text-xl 
  focus[outline-none]
`)

const ButtonGroup = styled.button([xw`
  py-0.5 px-2
  border-r border-gray-platinum border-opacity-50
`,
(props) => props.active && xw`bg-gray-platinum bg-opacity-25`,
])

const variants = {
  infos: {
    x: 0,
  },
  form: {
    x: '-50%',
  },
}

const modal = {
  hidden: {
    y: '-100%',
    x: '-50%',
    opacity: 0,
  },
  visible: {
    y: '-50%',
    x: '-50%',
    opacity: 1,
  },
}

/**
 * Contact modal component
 * @param showContactModal bool state (visible or hidden)
 * @param toggleContactModal ✉️ dispatch toggle
 * @returns {JSX.Element}
 * @constructor
 */
const ContactModal = ({ showContactModal, toggleContactModal }) => {
  const [section, setSection] = useState('form')
  const [previousScroll, setPreviousScroll] = useState(0)
  const { scrollY } = useViewportScroll()
  const windowWidth = useWindowWidth()

  useEffect(() => {
    const { body } = document
    if (showContactModal) {
      body.style.position = 'fixed'
      setPreviousScroll(scrollY.get())
    } else {
      const { body } = document
      body.style.position = ''
      body.style.top = ''
      window.scrollTo(0, previousScroll)
    }
    document.body.style.position = showContactModal ? 'fixed' : ''
  }, [showContactModal])

  return (
    <AnimatePresence exitBeforeEnter>
      {showContactModal && (
        <Overlay css={xw`z-50`}>
          <ContactContainerStyled
            variants={modal}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <ContactContainer>
              <CloseModalButton onClick={() => toggleContactModal()}>
                <FontAwesomeIcon icon='times' />
              </CloseModalButton>
              <div>
                <h1 css={xw`font-extrabold text-2xl`}>Contactez-moi 🖖🏻</h1>
                <div css={xw`h-5 w-1/3 bg-gradient-to-l from-orange-500 to-darkblue-600 -mt-5`} />
                <h2 css={xw`font-light text-base md:text-lg pt-2`}>
                  Vous avez des questions, à propos de mon travail, ou une demande?
                </h2>
              </div>
              <div css={xw`lg:hidden flex flex-row justify-center text-xs tracking-tighter mt-5`}>
                <ButtonGroup
                  onClick={() => setSection('infos')}
                  active={section === 'infos'}
                  css={xw`rounded-l border-l py-1`}
                >
                  coordonnées
                </ButtonGroup>
                <ButtonGroup
                  onClick={() => setSection('form')}
                  active={section === 'form'}
                  css={xw`rounded-r py-1`}
                >
                  formulaire
                </ButtonGroup>
              </div>
              <div css={xw`relative overflow-hidden h-full w-full`}>
                <motion.div
                  css={[xw`flex flex-row py-5 items-center h-full lg[w-full]`, css`width: 200%`]}
                  variants={variants}
                  animate={windowWidth <= bp.lg ? section : 'infos'}
                >
                  <Infos />
                  <Form />
                </motion.div>
              </div>
            </ContactContainer>
          </ContactContainerStyled>
        </Overlay>
      )}
    </AnimatePresence>
  )
}

const mapStateToProps = (state) => ({
  showContactModal: state.contact.showContactModal,
})

const mapDispatchToProps = (dispatch) => {
  return {
    toggleContactModal: bindActionCreators(toggleContactModal, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactModal)
