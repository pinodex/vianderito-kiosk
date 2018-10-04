import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: require('@/components/Cart').default
    },

    {
      path: '/purchase_complete',
      name: 'purchase_complete',
      component: require('@/components/PurchaseComplete').default,
      props: true
    },

    {
      path: '/clearance',
      name: 'clearance',
      component: require('@/components/Clearance').default
    }
  ]
})
