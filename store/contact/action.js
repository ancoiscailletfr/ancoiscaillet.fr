/**
 * all contact actions
 * @type {{TOGGLE_CONTACT_MODAL: string}}
 */
export const contactActionTypes = {
  TOGGLE_CONTACT_MODAL: 'TOGGLE_CONTACT_MODAL',
  UPDATE_FORM_DATA: 'UPDATE_FORM_DATA',
  CLEAR_FORM_DATA: 'CLEAR_FORM_DATA',
}

/**
 * dispatch hide/show contact modal
 * @returns {function(*): *}
 */
export const toggleContactModal = () => (dispatch) => {
  return dispatch({ type: contactActionTypes.TOGGLE_CONTACT_MODAL })
}

/**
 * update form data on value change
 * @param data value and value name
 * @returns {function(*): *}
 */
export const updateFormData = (data) => (dispatch) => {
  return dispatch({ type: contactActionTypes.UPDATE_FORM_DATA, payload: data })
}

export const clearFormData = () => (dispatch) => {
  return dispatch({ type: contactActionTypes.CLEAR_FORM_DATA })
}
