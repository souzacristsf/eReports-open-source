import { http } from '@/plugins/http'

export const doConnection = (data) => {
  return http.post('api/v1/connect/test', data)
}

export const doSaveConnection = (data) => {
  return http.post('api/v1/connect/new', data)
}

export const doUpdateConnectionId = (data) => {
  return http.put(`api/v1/connect/${parseInt(data.connect_id)}`, data)
}

export const doDisableConnectionId = (data) => {
  return http.delete(`api/v1/connect/${parseInt(data.connect_id)}`)
}
