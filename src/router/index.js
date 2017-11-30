import Vue from 'vue'
import VueRouter from 'vue-router'
import Inbox from '../components/Inbox'

Vue.use(VueRouter)

const routes = [
  {
    path: '/inbox',
    name: 'inbox',
    component: Inbox,
  },
]

export default new VueRouter({
  routes,
})
