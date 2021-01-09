import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { clearFormData, updateFormData } from '@/store/contact/action'
import xw from 'xwind'
import { css } from '@emotion/react'

/**
 * contact form component
 * @param formData stored form data
 * @param handleChange update data
 * @param clearData clear form data stored
 * @returns {JSX.Element}
 * @constructor
 */
const Form = ({ formData, handleChange, clearData }) => {
  const { fullname, email, phone, message } = formData
  const { register, errors, handleSubmit, reset } = useForm()
  const [formLoading, setFormLoading] = useState(false)
  const [sent, setSent] = useState(undefined)

  /**
   * submit form
   * @param data to send
   */
  const onSubmit = data => {
    setFormLoading(true)
    axios.post('/api/submit', data)
      .then(response => {
        if (response) setSent(true)
        setFormLoading(false)
        resetForm()
      })
      .catch(_ => {
        setSent(false)
        setFormLoading(false)
      })
  }

  const resetForm = () => {
    setTimeout(() => {
      setSent(undefined)
      clearData()
      reset()
    }, 3000)
  }

  return (
    <div css={xw`w-1/2 lg:w-2/3 h-full`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        css={xw`w-full h-full flex flex-col justify-between pl-4 pr-4 lg:pr-2 text-base`}
      >
        <div>
          <Label mandatory htmlFor='fullname'>Nom complet</Label>
          <FormInput
            name='fullname' type='text'
            value={fullname}
            placeholder='Buzz Aldrin'
            ref={register({ required: true, minLength: 2, maxLength: 100 })}
            error={errors.fullname}
            onChange={(evt) => handleChange({ name: 'fullname', value: evt.target.value })}
          />
          {errors.fullname && <Error>Veuillez renseigner votre nom complet (maximum 100 caractères)</Error>}
        </div>
        <div>
          <Label mandatory htmlFor='email'>Email</Label>
          <FormInput
            name='email' type='text'
            value={email}
            placeholder='timcook@pomme.com'
            aria-describedby='email'
            ref={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            })}
            error={errors.email}
            onChange={(evt) => handleChange({ name: 'email', value: evt.target.value })}
          />
          {errors.email && <Error>Veuillez renseigner votre email (exemple: &apos;johndoe@foobar.foo&apos;)</Error>}
        </div>
        <div>
          <Label htmlFor='phone'>Téléphone</Label>
          <FormInput
            name='phone' type='tel'
            value={phone}
            placeholder='XX XX XX XX XX'
            aria-describedby='phone'
            ref={register({ required: false, pattern: /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/ })}
            error={errors.phone}
            onChange={(evt) => handleChange({ name: 'phone', value: evt.target.value })}
          />
          {errors.phone && <Error>Veuillez saisir un numéro valide</Error>}
        </div>
        <div css={xw`mb-4`}>
          <Label mandatory htmlFor='message'>Message</Label>
          <FormInput
            as='textarea'
            name='message'
            value={message}
            css={xw`overflow-auto resize-none h-60 md:h-44`}
            ref={register({ required: true, minLength: 5, maxLength: 10000 })}
            error={errors.message}
            onChange={(evt) => handleChange({ name: 'message', value: evt.target.value })}
          />
          {errors.message && <Error>Veuillez saisir un message compris entre 5 et 10000 caractères</Error>}
        </div>
        <div css={xw`flex justify-end -mt-5`}>
          <p css={xw`font-thin tracking-tight italic text-xs transform scale-75`}>* Obligatoire</p>
        </div>
        <SubmitButton type='submit' disabled={formLoading}>
          Envoyer
          <div css={xw`ml-2`}>
            {formLoading && <FontAwesomeIcon icon='spinner' spin />}
            <SentIcon sent={sent} />
          </div>
        </SubmitButton>
      </form>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const SentIcon = ({ sent }) => {
  switch (sent) {
    case true:
      return <FontAwesomeIcon icon='check-circle' css={xw`text-status-available`} />
    case false:
      return <FontAwesomeIcon icon='times-circle' css={xw`text-status-red`} />
    default:
      return null
  }
}

const Error = styled.p(xw`text-status-red text-xs italic`)

const SubmitButton = styled.button([xw`
  mx-auto flex flex-row items-center
  bg-darkblue-500 hover:bg-darkblue-700 
  text-white font-bold 
  py-2 px-4 rounded focus[outline-none ring]
`, props => props.disabled && xw`bg-gray-500 cursor-not-allowed pointer-events-none`])

const Label = styled.label([xw`
  font-bold text-xs ml-0.5 leading-3
`, props => props.mandatory && css`
  &::after{
    content: '*';
    font-variant-position: super;
    ${xw`font-thin ml-0.5`}
  }
`])

const FormInput = styled.input([xw`
  shadow appearance-none
  border rounded
  w-full
  py-2 px-3
  text-gray-700 leading-tight 
  focus[outline-none ring]
`, props => props.error && xw`border-2 border-status-red`])

Form.propTypes = {
  clearData: PropTypes.func,
  formData: PropTypes.object,
  handleChange: PropTypes.func
}

const mapStateToProps = (state) => ({
  formData: state.contact.formData
})

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: bindActionCreators(updateFormData, dispatch),
    clearData: bindActionCreators(clearFormData, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
