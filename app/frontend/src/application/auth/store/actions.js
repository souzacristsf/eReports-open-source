import * as TYPES from './mutations-types'
import { doLogin } from '../services'
import { setInitToken } from '@/plugins/http'
import { setUser as setuser, getToken, logout as logoff, getUser } from '@/auth'

export const attemptLogin = ({ dispatch }, payload) => {
  return doLogin(payload).then(response => {
    dispatch('setUser', response.user)
    dispatch('setToken', response.token)
    setInitToken(response.token)
    setuser(response)
  })
}

export const logout = ({ dispatch }) => {
  // call actions
  return Promise.all([
    dispatch('setToken', null),
    dispatch('setUser', {}),
    logoff()
  ])
  // commit(TYPES.SETLOGIN, login)
}

export const setToken = ({ commit }, payload) => {
  // prevent if payload is a object
  const token = !payload ? null : payload.token || payload

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
  return (
    getToken()
      .then(token => {
        if (!token) {
          // Token is not saved in localstorage
          return Promise.reject(new Error('NO_TOKEN')) // Reject promise
        }
        // Put the token in the vuex store
        return dispatch('setToken', token) // keep promise chain
      })
      // With the token in hand, retrieves the user's data, validating the token
      .then(() => dispatch('loadUser'))
  )
}

export const loadUser = async ({ dispatch }) => {
  try {
    const { email, fullname, username } = await getUser()
    dispatch('setUser', { email, fullname, username })
  } catch (error) {
    // Process failure, delete the token
    dispatch('setToken', '')
    return Promise.reject(new Error('FAIL_IN_LOAD_USER')) // keep promise chain
  }
  // // loadUserData(userId)
  //   .then(user => dispatch('setUser', user.data))
  //   .catch(() => {
  //   })
}
