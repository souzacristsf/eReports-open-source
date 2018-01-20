import { http } from '@/plugins/http'

export const doSaveEmail = (data) => {
  return http.post('api/v1/email/new', data)
}

export const doSendEmailTest = (data) => {
  return http.post('api/v1/email/test', data)
}
