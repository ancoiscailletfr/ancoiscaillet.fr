import axios from 'axios'
import { ActionType } from 'redux-promise-middleware'

const FETCH_US_TYPE = 'FETCH_US'
const FETCH_DIPLOMAS_TYPE = 'FETCH_DIPLOMAS'
const FETCH_EXPERIENCES_TYPE = 'FETCH_EXPERIENCES'
const FETCH_PROJECTS_TYPE = 'FETCH_PROJECTS'
const FETCH_SKILLS_TYPE = 'FETCH_SKILLS'
const FETCH_REFERENCES_TYPE = 'FETCH_REFERENCES'
const FETCH_SERVICES_TYPE = 'FETCH_SERVICES'
const FETCH_POWEREDBY_TYPE = 'FETCH_POWEREDBY_TYPE'

export const apiActionTypes = {
  FETCH_US_FULFILLED: FETCH_US_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_US_REJECTED: FETCH_US_TYPE.concat('_', ActionType.Rejected),
  FETCH_DIPLOMAS_FULFILLED: FETCH_DIPLOMAS_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_DIPLOMAS_REJECTED: FETCH_DIPLOMAS_TYPE.concat('_', ActionType.Rejected),
  FETCH_EXPERIENCES_FULFILLED: FETCH_EXPERIENCES_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_EXPERIENCES_REJECTED: FETCH_EXPERIENCES_TYPE.concat('_', ActionType.Rejected),
  FETCH_PROJECTS_FULFILLED: FETCH_PROJECTS_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_PROJECTS_REJECTED: FETCH_PROJECTS_TYPE.concat('_', ActionType.Rejected),
  FETCH_SKILLS_FULFILLED: FETCH_SKILLS_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_SKILLS_REJECTED: FETCH_SKILLS_TYPE.concat('_', ActionType.Rejected),
  FETCH_REFERENCES_FULFILLED: FETCH_REFERENCES_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_REFERENCES_REJECTED: FETCH_REFERENCES_TYPE.concat('_', ActionType.Rejected),
  FETCH_SERVICES_FULFILLED: FETCH_SERVICES_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_SERVICES_REJECTED: FETCH_SERVICES_TYPE.concat('_', ActionType.Rejected),
  FETCH_POWEREDBY_FULFILLED: FETCH_POWEREDBY_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_POWEREDBY_REJECTED: FETCH_POWEREDBY_TYPE.concat('_', ActionType.Rejected)
}

export const fetchUs = () => (
  {
    type: FETCH_US_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/me`)
  }
)

export const fetchDiplomas = () => (
  {
    type: FETCH_DIPLOMAS_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/diplomas`)
  }
)

export const fetchExperiences = () => (
  {
    type: FETCH_EXPERIENCES_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/experiences`)
  }
)

export const fetchProjects = () => (
  {
    type: FETCH_PROJECTS_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/projects`)
  }
)

export const fetchSkills = () => (
  {
    type: FETCH_SKILLS_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/skills`)
  }
)

export const fetchReferences = () => (
  {
    type: FETCH_REFERENCES_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/references`)
  }
)

export const fetchServices = () => (
  {
    type: FETCH_SERVICES_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/services`)
  }
)

export const fetchPoweredBy = () => (
  {
    type: FETCH_POWEREDBY_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/powered-bies`)
  }
)
