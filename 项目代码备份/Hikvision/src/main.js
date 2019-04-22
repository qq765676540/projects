import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

import 'lib-flexible/flexible.js'
import "./assets/js/jquery.extends.js"

import VueI18n from 'vue-i18n'
import messages from './assets/lang/index';
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zhCHS', 
  messages
})

import {Locals} from './assets/lang/local'
Vue.prototype.$Local = Locals

import Vuetree from 'vue-simple-tree'
Vue.use(Vuetree)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  i18n,
  $,
  render: h => h(App)
})
