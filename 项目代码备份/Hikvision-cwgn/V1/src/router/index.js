import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'overallIndex',
            component: resolve => require(['../components/overall-index.vue'], resolve)
        }, {
            path: '/overallIndex',
            name: 'overallIndex',
            component: resolve => require(['../components/overall-index.vue'], resolve)
        },
        {
            path: '/income',
            name: 'income',
            component: resolve => require(['../components/income.vue'], resolve)
        },
        {
            path: '/grossMargin',
            name: 'grossMargin',
            component: resolve => require(['../components/gross-margin.vue'], resolve)
        },
        {
            path: '/cost',
            name: 'cost',
            component: resolve => require(['../components/cost.vue'], resolve)
        },
        {
            path: '/deductionMargin',
            name: 'deductionMargin',
            component: resolve => require(['../components/deduction-margin.vue'], resolve)
        }
    ]
})