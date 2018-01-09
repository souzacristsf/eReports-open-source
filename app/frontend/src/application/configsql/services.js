import { HTTP } from '@/http'

export const doListConnection = (data) => {
  return HTTP.get('api/v1/connect', data)
}

export const doSaveQuery = (data) => {
  return HTTP.post('api/v1/query/new', data)
}

export const doRunQuery = (data) => {
  return HTTP.post('api/v1/query/run', data)
}
