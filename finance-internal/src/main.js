import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import 'lib-flexible/flexible.js'
import "./assets/js/jquery.extends.js"

import Vuetree from 'vue-simple-tree'
Vue.use(Vuetree)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    store,
    router,
    // i18n,
    // $,
    render: h => h(App)
  })
  