import * as TYPES from './mutations-types'
import localforage from 'localforage'
import { doLogin } from '../services'
import Auth from '@/auth'

export const attemptLogin = ({ dispatch }, payload) => {
  return doLogin(payload).then(
    (response) => {
      dispatch('setUser', response.data.user)
      dispatch('setToken', response.data.token)
      Auth.setUser(response.data)
    })
}

export const logout = ({ dispatch }) => {
  // call actions
  return Promise.all([
    dispatch('setToken', null),
    dispatch('setUser', {}),
    Auth.logout()
  ])
  // commit(TYPES.SETLOGIN, login)
}

export const setToken = ({ commit }, payload) => {
  // prevent if payload is a object
  const token = (!payload) ? null : payload.token || payload

  // Commit the mutations
  commit(TYPES.setToken, token)

  return Promise.resolve(token) // keep promise chain
}

export const setUser = ({ commit }, user) => {
  // Commit the mutations
  commit(TYPES.setUser, user)

  Promise.resolve(user) // keep promise chain
}

export const checkUserToken = ({ dispatch, state }) => {
  // If the token exists then all validation has already been done
  if (state.token) {
    return Promise.resolve(state.token)
  }

  /**
   * Token does not exist yet
   * - Recover it from localstorage
   * - Recover also the user, validating the token also
   */
  return localforage.getItem('token')
    .then((token) => {
      if (!token) {
        // Token is not saved in localstorage
        return Promise.reject(new Error('NO_TOKEN')) // Reject promise
      }
      // Put the token in the vuex store
      return dispatch('setToken', token) // keep promise chain
    })
  // With the token in hand, retrieves the user's data, validating the token
    .then(() => dispatch('loadUser'))
}
