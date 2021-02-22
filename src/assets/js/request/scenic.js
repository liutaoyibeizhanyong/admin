import {POST,DELETE} from './axios'
import scenic from '@/assets/entity/scenic'
export async function post_scenic(params) {
  const data = await POST('/api/scenic',params)
  const arr = []
  if(data.data.length > 0) {
    data.data.map((val) => {
      arr.push(new scenic(val))
    })
  }
  return { list: arr,code:data.code,count:data.count }
}
