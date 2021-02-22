import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index'
import Login from '@/views/login'
const home = () => import(/* webpackChunkName: "about" */ '@/views/home');
const user = () => import(/* webpackChunkName: "about" */ '@/views/user/uesr');
const user_info = () => import(/* webpackChunkName: "about" */ '@/views/user/user_info');
const hotel = () => import(/* webpackChunkName: "about" */ '@/views/hotel/hotel');
const hotel_user = () => import(/* webpackChunkName: "about" */ '@/views/hotel/hotel_user');
const scenic = () => import(/* webpackChunkName: "about" */ '@/views/scenic/scenic');
const scenic_Strategy = () => import(/* webpackChunkName: "about" */ '@/views/scenic/scenic_Strategy');
const city = () => import(/* webpackChunkName: "about" */ '@/views/position/city');
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: home,
        meta: { title: '系统首页' },
      }, {
        path: '/user/user',
        name: 'user',
        component: user,
        meta: { title: '用户管理' },
      }, {
        path: '/user/user_info',
        name: 'user_info',
        component: user_info,
        meta: { title: '用户信息' },
      }, {
        path: '/hotel/hotel',
        name: 'hotel',
        component: hotel,
        meta: { title: '酒店列表' },
      }, {
        path: '/hotel/hotel_user',
        name: 'hotel_user',
        component: hotel_user,
        meta: { title: '酒店入住' },
      }, {
        path: '/scenic/scenic',
        name: 'scenic',
        component: scenic,
        meta: { title: '景点列表' },
      }, {
        path: '/scenic/scenic_Strategy',
        name: 'scenic_Strategy',
        component: scenic_Strategy,
        meta: { title: '景点攻略' },
      },
      , {
        path: '/position/city_position',
        name: 'city',
        component: city,
        meta: { title: '城市地图' },
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/404/404.vue'),
        meta: { title: '404' },
      },
    ]
  },
  {
    path: "*",
    redirect: "/404"
  },
]

const router = new VueRouter({
  routes
})
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 挂载路由导航守卫


export default router
