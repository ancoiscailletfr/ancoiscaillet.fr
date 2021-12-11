/* eslint-disable no-param-reassign */
import { apiActionTypes } from '@/store/api/action'
import { camelizeKeys } from '@/lib/camelCase'

const apiInitialState = {
  us: {},
  experiences: {},
  projects: {},
  diplomas: {},
  skills: {},
  references: {},
  services: {},
  poweredBy: {},
}

// TODO: Refactor this reducer
export default function reducer(state = apiInitialState, action, name = null) {
  switch (action.type) {
    case apiActionTypes.FETCH_FULFILLED:
      // eslint-disable-next-line prefer-destructuring
      name = action.payload.request.path.split('/')[1]
      if (name === 'me') name = 'us'
      if (name === 'powered-bies') name = 'poweredBy'
      return { ...state, [name]: camelizeKeys(action.payload.data) }
    case apiActionTypes.FETCH_REJECTED:
      return {
        error: action.payload,
      }
    default: return state
  }
}
