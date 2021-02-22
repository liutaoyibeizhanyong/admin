import {POST,DELETE} from './axios'
import hotel_check_in from '@/assets/entity/hotel_check_in'
export async function post_hotel_check_in(params) {
  const data = await POST('/api/hotel_check_in',params)
  const arr = []
  if(data.data.length > 0) {
    data.data.map((val) => {
      arr.push(new hotel_check_in(val))
    })
  }
  return { list: arr,code:data.code,count:data.count }
}
