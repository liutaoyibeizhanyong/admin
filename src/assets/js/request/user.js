
import {POST,DELETE} from './axios'
import user from '@/assets/entity/user'
export async function getUesr(params) {
  const data = await POST('/api/list',params)
  const arr = []
  if(data.data.length > 0) {
    data.data.map((val) => {
      arr.push(new user(val))
    })
  }
  return { list: arr,code:data.code,count:data.count }
}

export function add_user_list(params) {
  return POST('/api/add_list',params)
}
export function edit_user_list(params) {
  return POST('/api/eit_user',params)
}
export function delUser(params) {
  return DELETE('/api/delUser',params)
}


// export async function getAppointmentList (params) {
//   const data = await GET('/v1/appointment', params)
//   const arr = []
//   if(data.data.length > 0) {
//     data.data.map((val) => {
//       arr.push(new Appointment(val))
//     })
//   }
//   return { list: arr }
// }