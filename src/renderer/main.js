import Vue from 'vue'
import VueFilters from 'vue2-filters'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import axios from 'axios'

import App from './App'
import router from './router'

import 'bulma'

Pusher.logToConsole = true

if (!process.env.IS_WEB)
  Vue.use(require('vue-electron'))

let echo = new Echo({
  broadcaster: 'pusher',
  key: '0789f01586542f78b61f',
  cluster: 'ap1'
})

Vue.use(VueFilters)

Vue.config.productionTip = false

Vue.http = Vue.prototype.$http = axios

Vue.prototype.$echo = echo

Vue.prototype.$kiosk = echo.channel('kiosk')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
