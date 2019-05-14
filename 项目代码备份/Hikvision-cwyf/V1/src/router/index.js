import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'summary',
      component: resolve => require(['../components/summary.vue'], resolve)
    },
    {
      path: '/summary',
      name: 'summary',
      component: resolve => require(['../components/summary.vue'], resolve)
    },
    {
      path: '/warning',
      name: 'warning',
      component: resolve => require(['../components/warning.vue'], resolve)
    },
    {
      path: '/constitute',
      name: 'constitute',
      component: resolve => require(['../components/constitute.vue'], resolve)
    },
    {
      path: '/distribution',
      name: 'distribution',
      component: resolve => require(['../components/distribution.vue'], resolve)
    }
  ]
})
