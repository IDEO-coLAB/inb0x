import web3 from 'web3'
import Vue from 'vue'
import VueRouter from 'vue-router'

// import About from '../components/About'
import Inbox from '../components/Inbox'
import InboxHome from '../components/InboxHome'
import InboxAddress from '../components/InboxAddress'

// TODO: These now all get wrapped into components,
// there is no longer a route for these.
import InboxAddressMessage from '../components/InboxAddressMessage'
import Compose from '../components/Compose'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About,
  // },

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

  // TODO: Move these into universal components
  {
    path: '/inbox/:address/:message',
    name: 'InboxAddressMessage',
    component: InboxAddressMessage,
  },
  {
    path: '/compose',
    name: 'Compose',
    component: Compose,
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes,
})

export default router


























