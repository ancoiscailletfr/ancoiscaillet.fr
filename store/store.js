import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import contact from '@/store/contact/reducer'
import navigation from '@/store/navigation/reducer'
import api from '@/store/api/reducer'

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
  contact, navigation, api
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    }
    if (state.contact.showContactModal) nextState.contact.showContactModal = state.contact.showContactModal
    if (state.navigation.showSidebar) nextState.navigation.showSidebar = state.navigation.showSidebar
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}

const initStore = () => {
  return createStore(reducer, bindMiddleware([thunkMiddleware, promiseMiddleware]))
}

/**
 * create and manage ssr ssg redux store
 */
export const wrapper = createWrapper(initStore)
