import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

var state = {
  summaryCircle:[],
  summaryEasyKPI:[],
  summaryLineA:[],
  summaryLineB:[],
  planExecutionLine:[],
  planExecutionCollapseA: [],
  planExecutionCollapseB: [],
  visitWarningKPI:[],
  visitWarningTableA: [],
  visitWarningTableB: []
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
