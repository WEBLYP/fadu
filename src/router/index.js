import Vue from 'vue'
import Router from 'vue-router'
import login from '@/tpl/login'
import register from '@/tpl/register'
import index from '@/tpl/index'
import result from '@/tpl/result'
import detail from '@/tpl/detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      meta: {
        title: '首页',
        needLogin: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录',
        needLogin: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: {
        title: '注册',
        needLogin: false
      }
    },
    {
      path: '/result',
      name: 'result',
      component: result,
      meta: {
        title: '列表页',
        needLogin: false
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        title: '详情',
        needLogin: false
      }
    }
  ]
})
