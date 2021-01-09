export const mainActionType = {
  HIDE_MODALS: 'HIDE_MODALS'
}

export const hideModals = () => (dispatch) => {
  return dispatch({ type: mainActionType.HIDE_MODALS })
}
