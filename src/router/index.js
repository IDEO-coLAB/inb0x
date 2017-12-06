import Vue from 'vue'
import VueRouter from 'vue-router'

import Inbox from '../components/Inbox'
import InboxHome from '../components/InboxHome'

import InboxAddress from '../components/InboxAddress'
import InboxAddressHome from '../components/InboxAddressHome'
import InboxAddressMessage from '../components/InboxAddressMessage'

import NewAddress from '../components/NewAddress'
import NewAddressHome from '../components/NewAddressHome'
import NewAddressSetup from '../components/NewAddressSetup'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inbox',
    component: Inbox,
    children: [
      {
        path: '',
        component: InboxHome,
      },
      {
        path: ':address',
        component: InboxAddress,
        children: [
          {
            path: '',
            component: InboxAddressHome
          },
          {
            path: ':message',
            component: InboxAddressMessage
          }
        ]
      },
    ]
  },

  {
    path: '/new/:address',
    component: NewAddress,
    children: [
      {
        path: '',
        component: NewAddressHome
      },
      {
        path: 'setup',
        component: NewAddressSetup
      }
    ]
  },
]

export default new VueRouter({
  routes,
})
