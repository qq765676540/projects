import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

var state = {
  pageActive: 0,
  isPopShow: false,
  dataScope: 'T',
  currency: 'R',
  level: [],
  org: [],
  'home-overview': [],
  'income-bp': [],
  'income-structure-bar': [],
  'income-branch': [],
  'income-trend': [],
  'gross-bp': [],
  'gross-deduction': [],
  'cost-rate': [],
  'cost-rateTotal': [],
  'cost-structure': [],
  'cost-trend': [],
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
