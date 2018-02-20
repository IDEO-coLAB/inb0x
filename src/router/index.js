import web3 from 'web3'
import Vue from 'vue'
import VueRouter from 'vue-router'

import ROUTE_NAMES from '../constants/routes'
import MessagesPage from '../components/MessagesPage'
import TokensPage from '../components/TokensPage'
import ComposePage from '../components/ComposePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/messages',
    component: MessagesPage,
    name: ROUTE_NAMES.MESSAGES_PAGE,
  },
  {
    path: '/tokens',
    component: TokensPage,
    name: ROUTE_NAMES.TOKENS_PAGE,
  },
  {
    path: '/compose',
    component: ComposePage,
    name: ROUTE_NAMES.COMPOSE_PAGE,
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

export default router
