import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

var state = {
    distributionState: false,
    'main-persion': [],
    'main-business-center': [],
    'over-all-kpi': [],
    'over-all-progress': [],
    'over-all-ranking': [],
    'income-view': [],
    'income-year': [],
    'income-industry': [],
    'income-industryTotal': [],
    'income-product': [],
    'income-productTotal': [],
    'income-cityz': [],
    'income-cityzy': [],
    'margin-city': [],
    'cost-main': [],
    'cost-pie': [],
    'cost-rlcb': [],
    'cost-gxfy': [],
    'cost-wlcb': [],
    'cost-yxcb': [],
    'cost-clfy': [],
    'cost-clfy-chart': [],
    'cost-ywzd': [],
    'cost-ywzd-chart': [],
    'cost-rckz': [],
    'cost-rckz-chart': [],
    'de-margin-per': []
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})

if (module.hot) {
    module.hot.accept([
        './getters',
        './actions',
        './mutations'
    ], () => {
        store.hotUpdate({
            getters: require('./getters'),
            actions: require('./actions'),
            mutations: require('./mutations')
        })
    })
}

export default store