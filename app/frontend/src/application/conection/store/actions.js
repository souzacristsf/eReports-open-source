// import { doSaveConnection } from '../services'
import * as TYPES from './mutations-types'
// import _ from 'lodash'

// export const connection = ({ dispatch }, payload) => doConnection(payload)

export const showModal = ({ dispatch }, payload) => dispatch('showOrHideModal', payload)

export const showOrHideModal = ({ commit }, data) => {
  // Commit the mutations
  commit(TYPES.showOrHideModal, data)
  // Promise.resolve(data) // keep promise chain
}

export const doEditConnection = ({ commit }, payload) => commit(TYPES.editConnection, payload)

// export const newConnection = ({ dispatch }, payload) =>
//   doSaveConnection(payload).then(
//     ({data}) => {
//       dispatch('loadListConnection', true)
//       return data
//       // dispatch('loadListConnection', true)
//     })
// 192.168.0.115:49161/XE
// export const loadListConnection = ({ commit }, data) => {
//   // Commit the mutations
//   commit(TYPES.loadListConnection, data)
//   Promise.resolve(data) // keep promise chain
// }
// export const addConnection = ({ commit }, data) => {
//   // Commit the mutations
//   commit(TYPES.addConnection, data)

//   Promise.resolve(data) // keep promise chain
// }

// export const listConnection = ({ dispatch }) => {
//   return doListConnection().then(
//     ({ data }) => {
//       if (!_.isEmpty(data.docs)) {
//         // dispatch('addConnection', data.docs)
//       }
//     })
// }
