import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexPersist = new VuexPersistence({
  key:'active',
  storage: window.sessionStorage,
   //storage: window.localStorage,
  reducer: (state) => ({ activePath: state.activePath,list:state.list,token:state.token,user:state.user }), //only save navigation module
})

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [vuexPersist.plugin]
})
export default store
