import Vue from 'vue'
import VueRouter from 'vue-router'

import Landing from '../components/Landing'

import Inbox from '../components/Inbox'
import InboxHome from '../components/InboxHome'

import InboxAddress from '../components/InboxAddress'
import InboxAddressHome from '../components/InboxAddressHome'
import InboxAddressMessage from '../components/InboxAddressMessage'

import UpdateAddress from '../components/UpdateAddress'
import UpdateAddressHome from '../components/UpdateAddressHome'
import UpdateAddressSetup from '../components/UpdateAddressSetup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Landing,
    name: 'Landing',
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
        component: InboxAddress,
        children: [
          {
            path: '',
            name: 'InboxAddressHome',
            component: InboxAddressHome
          },
          {
            path: ':message',
            name: 'InboxAddressMessage',
            component: InboxAddressMessage
          }
        ]
      },
    ]
  },

  {
    path: '/update/:address',
    component: UpdateAddress,
    children: [
      {
        path: '',
        name: 'UpdateAddressHome',
        component: UpdateAddressHome
      },
      {
        path: 'setup',
        name: 'UpdateAddressSetup',
        component: UpdateAddressSetup
      }
    ]
  },
]

export default new VueRouter({
  routes,
})
