import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

var state = {
  isPopShow:false,
  currentLevel:[],
  organization:[],
  summaryCircle:[],
  summaryEasyKPI:[],
  summaryLineA:[],
  summaryLineB:[],
  summaryOrgListA: [],
  summaryOrgListB: [],
  summaryOrgListC: [],
  planExecutionLine:[],
  planExecutionCollapseA: [],
  planExecutionCollapseB: [],
  visitWarningKPI:[],
  visitWarningCollapseA1: [],
  visitWarningCollapseA2: [],
  visitWarningCollapseB1: [],
  visitWarningCollapseB2: [],
  visitCustomerA: [],
  visitCustomerB: [],
  customerDistribution: []
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
