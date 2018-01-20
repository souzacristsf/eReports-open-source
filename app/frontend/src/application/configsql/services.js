import { http } from '@/plugins/http'

export const doListConnection = (data) => {
  return http.get('api/v1/connect', data)
}

export const doSaveQuery = (data) => {
  return http.post('api/v1/query/new', data)
}

export const doRunQuery = (data) => {
  return http.post('api/v1/query/run', data)
}
