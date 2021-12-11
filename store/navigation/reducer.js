import { navigationActionTypes } from '@/store/navigation/action'
import { mainActionType } from '@/store/actions'

const navigationInitialState = {
  showSidebar: false,
  active: null,
}

export default function reducer(state = navigationInitialState, action) {
  switch (action.type) {
    case navigationActionTypes.TOGGLE_SIDEBAR:
      return { ...state, showSidebar: !state.showSidebar }
    case navigationActionTypes.ACTIVE:
      return { ...state, active: action.payload }
    case mainActionType.HIDE_MODALS:
      return { ...state, showSidebar: false }
    default:
      return state
  }
}
