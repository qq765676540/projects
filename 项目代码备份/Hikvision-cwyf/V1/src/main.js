import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'lib-flexible/flexible.js'

Vue.config.productionTip = false

var config = {
  host: 'localhost',
  prefix: '/',
  port: 443,
  isSecure: true
};

var interval = setInterval(() => {

    if(window.requireJS) {
      clearInterval(interval);

      window.requireJS.config({
        baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
      });
  
      window.requireJS(["js/qlik"], function (qlik) {
        window.qApp = qlik.openApp('a791d827-1d54-40a4-8825-222c69360fc5', config);

        new Vue({
          router,
          store,
          render: h => h(App),
        }).$mount('#app')

      });
    }

}, 100);





