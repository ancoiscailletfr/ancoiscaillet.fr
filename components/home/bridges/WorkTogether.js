import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleContactModal } from '@/store/contact/action'
import { hideModals } from '@/store/actions'
import styled from '@emotion/styled'
import xw from 'xwind'

const WorkTogether = ({ email, toggleContactModal, hideModals }) => {
  return (
    <div css={xw`flex flex-row flex-wrap justify-around w-4/5 mx-auto text-gray-platinum mt-4`}>
      <ButtonStyled
        css={xw`bg-darkblue-500 hover:bg-darkblue-400 mb-6 select-none`}
        onClick={() => {
          hideModals()
          toggleContactModal()
        }}
      >
        Formulaire de contact
      </ButtonStyled>
      <div css={xw`mt-4`}>
        <ButtonStyled as='a' href={`mailto:${email}`} css={xw`bg-gray-400 hover:bg-gray-300`}>
          {email}
        </ButtonStyled>
      </div>
    </div>
  )
}

const ButtonStyled = styled.button(xw`
  rounded-md shadow-inner
  bg-opacity-75
  focus[outline-none border-wildblue-700 ring bg-opacity-100]
  px-10 py-5 leading-5
  font-medium tracking-wide
`)

const mapStateToProps = (state) => ({
  email: state.api.us.email
})

const mapDispatchToProps = (dispatch) => {
  return {
    toggleContactModal: bindActionCreators(toggleContactModal, dispatch),
    hideModals: bindActionCreators(hideModals, dispatch)
  }
}

WorkTogether.propTypes = {
  email: PropTypes.string,
  hideModals: PropTypes.func,
  toggleContactModal: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkTogether)
