// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto'
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import vant from 'vant'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import 'vant/lib/index.css'
import axios from 'axios'
Vue.use(vant)
Vue.use(ElementUI)
Vue.config.productionTip = false

Vue.prototype.axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
