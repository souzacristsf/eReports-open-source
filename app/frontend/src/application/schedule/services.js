import { HTTP } from '@/http'

export const doListEmail = (data) => {
  return HTTP.get('api/v1/email', data)
}

export const doListQuery = (data) => {
  return HTTP.get('api/v1/query', data)
}

export const doCreateSchedule = (data) => {
  return HTTP.post('api/v1/schedule/new', data)
}
