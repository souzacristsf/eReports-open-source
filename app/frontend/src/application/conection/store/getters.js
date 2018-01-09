import _ from 'lodash'
export const updateConnection = (state) => !_.isEmpty(state.connection.connectString) ? state.connection : ''
export const buttonUpdate = (state) => !state.buttonUpdate
