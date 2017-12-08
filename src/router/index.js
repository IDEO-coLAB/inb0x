import web3 from 'web3'
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/About'

import Inbox from '../components/Inbox'
import InboxHome from '../components/InboxHome'

import InboxAddress from '../components/InboxAddress'
// import InboxAddressHome from '../components/InboxAddressHome'
import InboxAddressMessage from '../components/InboxAddressMessage'

// import Update from '../components/Update'
// import UpdateHome from '../components/UpdateHome'
import Settings from '../components/Settings'
// import UpdateAddressHome from '../components/UpdateAddressHome'
// import UpdateAddressControlled from '../components/UpdateAddressControlled'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: About,
  },

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

  {
    path: '/inbox/:address/:message',
    name: 'InboxAddressMessage',
    component: InboxAddressMessage,
  },

  {
    path: '/settings/:address',
    name: 'Settings',
    component: Settings,
  },



]

const router = new VueRouter({
  routes,
})

export default router


























