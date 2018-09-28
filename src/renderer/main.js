import Vue from 'vue'
import Filters from 'vue2-filters'
import Buefy from 'buefy'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import axios from 'axios'

window.Pusher = Pusher

if (process.env.NODE_ENV === 'development')
  Pusher.logToConsole = true

import App from './App'
import router from './router'

import 'bulma/css/bulma.css'
import 'buefy/dist/buefy.css'

if (!process.env.IS_WEB)
  Vue.use(require('vue-electron'))

let echo = new Echo({
  broadcaster: 'pusher',
  key: '0789f01586542f78b61f',
  cluster: 'ap1'
})

Vue.use(Filters)

Vue.use(Buefy)

Vue.config.productionTip = false

let baseURL = 'https://beta.vianderito.xyz/api/kiosk/',
    headers = {
      'Authorization': `Bearer ${process.env.TOKEN}`
    }

if (process.env.NODE_ENV == 'development') {
  baseURL = 'http://localhost:8000/api/kiosk/'
}

Vue.http = Vue.prototype.$http = axios.create({ baseURL, headers })

Vue.prototype.$echo = echo

Vue.prototype.$kiosk = echo.channel('kiosk')

Vue.prototype.$general = echo.channel('general')

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
