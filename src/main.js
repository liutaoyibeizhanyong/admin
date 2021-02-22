import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './config';
import store from './store';
import '@/assets/js/china';
import '@/assets/scss/index.scss';
// import './mock'
import '@/assets/font/DS-DIGIT.TTF';
//移动适配
  // import '@/assets/js/flexible'
import VueLazyload from 'vue-lazyload';
//pc适配  设计图需要1920的  80px = 1rem 需要更换 .postcssrc 的比例
import ElementUI from 'element-ui';
import '@/assets/element/index.css';
import dataV from '@jiaminghi/data-view';
Vue.use(dataV);
Vue.use(ElementUI);
Vue.use(VueLazyload, {
  error: 'public/dou.png',
  loading: 'public/dou.png',
  attempt: 1
});
//图片懒加载
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
