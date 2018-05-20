import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import stock from '@/components/stock'
import input from '@/components/input'
import output from '@/components/output'
import registry from '@/components/registry'
import record from '@/components/record'
import user from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        { path: '/stock', component: stock},
        { path: '/input', component: input},
        { path: '/output', component: output},
        { path: '/registry', component: registry},
        { path: '/record', component: record},
        { path: '/user', component: user}
      ]
    }
  ]
})
