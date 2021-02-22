import { DELETE, GET, POST } from './axios'
export function login(params) {
    return POST('/api/login',params)
}