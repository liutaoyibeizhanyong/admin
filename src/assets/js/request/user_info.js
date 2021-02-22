import { POST,DELETE} from './axios'
import user_info from '@/assets/entity/user_info'
export async function post_user_info(params) {
    const data = await POST('/api/user_info',params)
    const arr = []
    if(data.data.length > 0) {
      data.data.map((val) => {
        arr.push(new user_info(val))
      })
    }
    return { list: arr,code:data.code,count:data.count }
}
export function post_set_user_info_status(params) {
  return POST('api/switch_user_info',params)
}
export function del_user_info(params) {
  return DELETE('/api/del_user_info',params)
}
export function post_add_user_info(params) {
  return POST('api/add_user_info',params)
}
export function post_eit_user_info(params) {
  console.log(params);
  return POST('api/eit_user_info',params)
}
