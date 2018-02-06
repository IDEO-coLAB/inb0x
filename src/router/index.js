import web3 from 'web3'
import Vue from 'vue'
import VueRouter from 'vue-router'

import ROUTE_NAMES from '../constants/routes'
import MessagesPage from '../components/MessagesPage'
import SearchPage from '../components/SearchPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/messages',
    component: MessagesPage,
    name: ROUTE_NAMES.MESSAGES_PAGE,
  },
  {
    path: '/search',
    component: SearchPage,
    name: ROUTE_NAMES.SEARCH_PAGE,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
