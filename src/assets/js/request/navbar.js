import {GET} from './axios'
export function menu(params) {
  return GET('/api/menu',params)
}
