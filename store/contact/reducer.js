import { contactActionTypes } from '@/store/contact/action'
import { mainActionType } from '@/store/actions'

const defaultFormData = {
  fullname: '',
  email: '',
  phone: '',
  message: '',
}
const contactInitialState = {
  showContactModal: false,
  formData: defaultFormData,
}

/**
 * contact reducer
 * @param state
 * @param action
 * @returns {{showContactModal: boolean}}
 */
export default function reducer(state = contactInitialState, action) {
  switch (action.type) {
    case contactActionTypes.TOGGLE_CONTACT_MODAL:
      return { ...state, showContactModal: !state.showContactModal }
    case mainActionType.HIDE_MODALS:
      return { ...state, showContactModal: false }
    case contactActionTypes.CLEAR_FORM_DATA:
      return { ...state, formData: defaultFormData }
    case contactActionTypes.UPDATE_FORM_DATA:
      return {
        ...state,
        formData: { ...state.formData, [action.payload.name]: action.payload.value },
      }
    default:
      return state
  }
}
