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
    'over-all-top': [],
    'over-all-btm': [],
    'over-all-progress': [],
    'over-all-ranking': [],
    'income-all': [],
    'income-year': [],
    'income-hz': [],
    'income-hzy': [],
    'income-cz': [],
    'income-czy': [],
    'income-cityz': [],
    'income-cityzy': [],
    'margin-all': [],
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
    'de-margin-all': [],
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