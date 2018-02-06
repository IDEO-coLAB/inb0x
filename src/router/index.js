import web3 from 'web3'
import Vue from 'vue'
import VueRouter from 'vue-router'

import InboxPage from '../components/InboxPage'
import InboxHomePage from '../components/InboxHomePage'
import InboxAddressPage from '../components/InboxAddressPage'
import SearchPage from '../components/SearchPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inbox',
    component: InboxPage,
    children: [
      {
        path: '',
        name: 'InboxHomePage',
        component: InboxHomePage,
      },
      {
        path: ':address',
        name: 'InboxAddressPage',
        component: InboxAddressPage,
      },
    ]
  },
  {
    path: '/search',
    name: 'SearchPage',
    component: SearchPage,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
