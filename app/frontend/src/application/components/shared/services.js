import { HTTP } from '@/http'

export const doListConnection = (data) => {
  return HTTP.get('api/v1/connect', data)
}
