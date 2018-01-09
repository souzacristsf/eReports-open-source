import * as TYPES from './mutations-types'

export default {
  [TYPES.setToken] (state, value) {
    state.token = value
  },
  [TYPES.setUser] (state, value) {
    state.user = value
  }
}
