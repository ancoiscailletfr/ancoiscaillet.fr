import axios from 'axios'
import { ActionType } from 'redux-promise-middleware'

const FETCH_TYPE = 'FETCH'

export const apiActionTypes = {
  FETCH_FULFILLED: FETCH_TYPE.concat('_', ActionType.Fulfilled),
  FETCH_REJECTED: FETCH_TYPE.concat('_', ActionType.Rejected),
}

const fetch = (path) => (
  {
    type: FETCH_TYPE,
    payload: axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/${path}`),
  }
)

export const fetchData = () => async ({ store }) => {
  await store.dispatch(fetch('me'))
  await store.dispatch(fetch('diplomas'))
  await store.dispatch(fetch('projects'))
  await store.dispatch(fetch('experiences'))
  await store.dispatch(fetch('skills'))
  await store.dispatch(fetch('references'))
  await store.dispatch(fetch('services'))
  await store.dispatch(fetch('powered-bies'))
}
