import {menu} from '@/assets/js/request/main'
const actions = {
  async getMenus({commit}){
    let {data,code} = await menu();
    if(code===200){
      commit('getActionsMenu',data);
    }
  },
}
export default actions
