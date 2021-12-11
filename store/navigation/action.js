/**
 * all navigation actions
 * @type {{TOGGLE_SIDEBAR: string}}
 */
export const navigationActionTypes = {
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  ACTIVE: 'ACTIVE',
}

/**
 * dispatch hide/show sidebar
 * @returns {function(*): *}
 */
export const toggleSidebar = () => (dispatch) => {
  return dispatch({ type: navigationActionTypes.TOGGLE_SIDEBAR })
}

export const setActive = (slug) => (dispatch) => {
  return dispatch({ type: navigationActionTypes.ACTIVE, payload: slug })
}
