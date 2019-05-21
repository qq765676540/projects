import Vue from 'vue'
import Router from 'vue-router'
import refresh from '@/components/refresh';

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/',
      redirect: '/home',
      name: 'default'
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['../components/home'], resolve)
    }, {
      path: '/income',
      name: 'income',
      component: resolve => require(['../components/income'], resolve)
    }, {
      path: '/gross',
      name: 'gross',
      component: resolve => require(['../components/gross'], resolve)
    }, {
      path: '/cost',
      name: 'cost',
      component: resolve => require(['../components/cost'], resolve)
    }, {
      path: '/order',
      name: 'order',
      component: resolve => require(['../components/order'], resolve)
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: resolve => require(['../components/refresh'], resolve)
    }
  ]
})
