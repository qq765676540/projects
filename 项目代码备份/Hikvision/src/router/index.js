import Vue from 'vue'
import Router from 'vue-router'
import summary from '@/components/summary';
import planExecution from '@/components/plan-execution';
import visitWarning from '@/components/visit-warning';
import visitCustomer from '@/components/visit-customer';
import refresh from '@/components/refresh';
import customerDistribution from '@/components/customer-distribution';

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
      component: summary
    }, {
      path: '/plan-execution',
      name: 'plan-execution',
      component: planExecution,
    }, {
      path: '/visit-warning',
      name: 'visit-warning',
      component: visitWarning
    }, {
      path: '/visit-customer',
      name: 'visit-customer',
      component: visitCustomer
    }, {
      path: '/customer-distribution',
      name: 'customer-distribution',
      component: customerDistribution
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: refresh
    }
  ]
})
