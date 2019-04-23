import Vue from 'vue'
import Router from 'vue-router'
import refresh from '@/components/refresh';

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/',
      redirect: '/summary',
      name: 'default'
    },
    {
      path: '/summary',
      name: 'summary',
      component: resolve => require(['../components/summary'], resolve)
    }, {
      path: '/plan-execution',
      name: 'plan-execution',
      component: resolve => require(['../components/plan-execution'], resolve)
    }, {
      path: '/visit-warning',
      name: 'visit-warning',
      component: resolve => require(['../components/visit-warning'], resolve)
    }, {
      path: '/visit-customer',
      name: 'visit-customer',
      component: resolve => require(['../components/visit-customer'], resolve)
    }, {
      path: '/customer-distribution',
      name: 'customer-distribution',
      component: resolve => require(['../components/customer-distribution'], resolve)
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: resolve => require(['../components/refresh'], resolve)
    }
  ]
})
