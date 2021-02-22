import Vue from 'vue'
import moment from 'moment'
import tableHead from "@/assets/entity/tableEntity";
Vue.prototype.$page = 1;//全局页码
Vue.prototype.$limit = 20;//全局页码条数
Vue.prototype.$moment = moment; //表格头部
Vue.prototype.$tableHead = tableHead; //表格头部

