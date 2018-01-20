import * as TYPES from './mutations-types'

export default {
  [TYPES.setToken] (state, value) {
    state.token = value
  },
  [TYPES.setUser] (state, value) {
    const { username, email, fullname } = { ...value }
    state.user = { username, email, fullname }
  }
}
