import { HTTP } from '@/http'

export const doLogin = (data) => {
  return HTTP.post('/auth/login', data)
    .then(response => response.data)
}
