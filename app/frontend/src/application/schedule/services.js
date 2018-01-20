import { http } from '@/plugins/http'

export const doListEmail = (data) => {
  return http.get('api/v1/email', data)
}

export const doListQuery = (data) => {
  return http.get('api/v1/query', data)
}

export const doCreateSchedule = (data) => {
  return http.post('api/v1/schedule/new', data)
}
