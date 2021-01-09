import { apiActionTypes } from '@/store/api/action'

const apiInitialState = {
  us: {},
  experiences: {},
  projects: {},
  diplomas: {},
  skills: {},
  references: {},
  services: {},
  poweredBy: {}
}

export default function reducer (state = apiInitialState, action) {
  switch (action.type) {
    case apiActionTypes.FETCH_US_FULFILLED:
      return Object.assign({}, state, {
        us: action.payload.data
      })
    case apiActionTypes.FETCH_EXPERIENCES_FULFILLED:
      return Object.assign({}, state, {
        experiences: action.payload.data
      })
    case apiActionTypes.FETCH_PROJECTS_FULFILLED:
      return Object.assign({}, state, {
        projects: action.payload.data
      })
    case apiActionTypes.FETCH_DIPLOMAS_FULFILLED:
      return Object.assign({}, state, {
        diplomas: action.payload.data
      })
    case apiActionTypes.FETCH_REFERENCES_FULFILLED:
      return Object.assign({}, state, {
        references: action.payload.data
      })
    case apiActionTypes.FETCH_SKILLS_FULFILLED:
      return Object.assign({}, state, {
        skills: action.payload.data
      })
    case apiActionTypes.FETCH_SERVICES_FULFILLED:
      return Object.assign({}, state, {
        services: action.payload.data
      })
    case apiActionTypes.FETCH_POWEREDBY_FULFILLED:
      return Object.assign({}, state, {
        poweredBy: action.payload.data
      })
    case apiActionTypes.FETCH_US_REJECTED:
      return {
        error: action.payload
      }
    default: return state
  }
}
