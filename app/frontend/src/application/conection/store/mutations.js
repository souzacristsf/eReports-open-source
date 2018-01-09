import * as TYPES from './mutations-types'

export default {

  [TYPES.showOrHideModal] (state, value) {
    state.openModal = value
  },

  [TYPES.editConnection] (state, value) {
    if (value) {
      state.buttonUpdate = true
      Object.assign(state.connection, value)
    } else {
      state.buttonUpdate = false
      Object.keys(state.connection).forEach(
        function (key) {
          state.connection[key] = ''
        }
      )
    }
  }
}
