import { HTTP } from '@/http'

export const doSaveEmail = (data) => {
  return HTTP.post('api/v1/email/new', data)
}

export const doSendEmailTest = (data) => {
  return HTTP.post('api/v1/email/test', data)
}
