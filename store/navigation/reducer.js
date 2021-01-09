import { navigationActionTypes } from '@/store/navigation/action'
import { mainActionType } from '@/store/actions'

const navigationInitialState = {
  showSidebar: false,
  active: '#intro'
}

export default function reducer (state = navigationInitialState, action) {
  switch (action.type) {
    case navigationActionTypes.TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        showSidebar: !state.showSidebar
      })
    case navigationActionTypes.ACTIVE:
      return Object.assign({}, state, {
        active: action.payload
      })
    case mainActionType.HIDE_MODALS:
      return Object.assign({}, state, {
        showSidebar: false
      })
    default:
      return state
  }
}
