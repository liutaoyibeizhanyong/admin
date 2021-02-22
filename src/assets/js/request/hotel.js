import {POST,DELETE} from './axios'
import hotel from '@/assets/entity/hotel'
export async function post_hotel_info(params) {
  const data = await POST('/api/hotel',params)
  const arr = []
  if(data.data.length > 0) {
    data.data.map((val) => {
      arr.push(new hotel(val))
    })
  }
  return { list: arr,code:data.code,count:data.count }
}
export function add_hotel_info(params) {
  return POST('/api/add_hotel',params)
}
export function edit_hotel_info(params) {
  return POST('/api/edit_hotel',params)
}
export function del_hotel_info(params) {
  return DELETE('/api/del_hotel',params)
}

