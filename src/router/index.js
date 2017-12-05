import Vue from 'vue'
import VueRouter from 'vue-router'
import Inbox from '../components/Inbox'
import InboxHome from '../components/InboxHome'
import InboxAddress from '../components/InboxAddress'
import InboxAddressHome from '../components/InboxAddressHome'
import InboxAddressMessage from '../components/InboxAddressMessage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inbox',
    name: 'inbox',
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

  // // route: /add/:address
  // {
  //   path: '/add/:address',
  //   name: 'addAddress',
  //   component: AddressSetup,
  // }
]

export default new VueRouter({
  routes,
})
