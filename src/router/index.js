import web3 from 'web3'
import Vue from 'vue'
import VueRouter from 'vue-router'

// import About from '../components/About'
import Inbox from '../components/Inbox'
import InboxHome from '../components/InboxHome'
import InboxAddress from '../components/InboxAddress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inbox',
    component: Inbox,
    children: [
      {
        path: '',
        name: 'InboxHome',
        component: InboxHome,
      },
      {
        path: ':address',
        name: 'InboxAddress',
        component: InboxAddress,
      },
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes,
})

export default router
