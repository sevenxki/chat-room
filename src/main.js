import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store'
import './mock'
import animated from 'animate.css' 
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import lodash from 'lodash'

// 动画
Vue.use(animated)
// 防抖
Vue.use(lodash)
Vue.use(Element)
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
