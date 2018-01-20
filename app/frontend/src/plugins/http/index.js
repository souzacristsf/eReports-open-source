import axios from 'axios'
import { getToken } from '@/auth'

getToken().then(token => setInitToken(token))

export const http = axios.create({
  baseURL: 'http://localhost:9000/'
  // timeout: 1000
})

export function setInitToken (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}
