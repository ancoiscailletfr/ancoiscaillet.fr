import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from '@emotion/styled'
import xw from 'xwind'
import { toggleContactModal } from '@/store/contact/action'
import { hideModals } from '@/store/actions'
import Button from '@/components/assets/Button'

const WorkTogether = ({ email, toggleContactModal, hideModals }) => {
  return (
    <div css={xw`flex flex-row flex-wrap justify-around w-4/5 mx-auto text-gray-platinum mt-4`}>
      <ButtonStyled
        css={xw`mb-6`}
        onClick={() => {
          hideModals()
          toggleContactModal()
        }}
      >
        Formulaire de contact
      </ButtonStyled>
      <div>
        <ButtonStyled as='a' href={`mailto:${email}`} css={xw`bg-gray-400 hover:bg-gray-300 lowercase`}>
          {email}
        </ButtonStyled>
      </div>
    </div>
  )
}

const ButtonStyled = styled(Button)(xw`
  focus:border-wildblue-700
  px-10 py-5
`)

const mapStateToProps = (state) => ({
  email: state.api.us.email,
})

const mapDispatchToProps = (dispatch) => {
  return {
    toggleContactModal: bindActionCreators(toggleContactModal, dispatch),
    hideModals: bindActionCreators(hideModals, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkTogether)
