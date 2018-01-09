import { HTTP } from '@/http'

export const doConnection = (data) => {
  return HTTP.post('api/v1/connect/test', data)
}

export const doSaveConnection = (data) => {
  return HTTP.post('api/v1/connect/new', data)
}

export const doUpdateConnectionId = (data) => {
  return HTTP.put(`api/v1/connect/${parseInt(data.connect_id)}`, data)
}

export const doDisableConnectionId = (data) => {
  return HTTP.delete(`api/v1/connect/${parseInt(data.connect_id)}`)
}
