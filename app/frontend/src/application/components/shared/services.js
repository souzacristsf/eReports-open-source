import { http } from '@/plugins/http'

export const doListConnection = (data) => {
  return http.get('api/v1/connect', data)
}
