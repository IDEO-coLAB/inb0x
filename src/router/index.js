import web3 from 'web3'
import Vue from 'vue'
import VueRouter from 'vue-router'

import About from '../components/About'
import Inbox from '../components/Inbox'
import InboxHome from '../components/InboxHome'
import InboxAddress from '../components/InboxAddress'

// Components for the styleguide
import Guide from '../components/Guide/Guide'
import GuideHome from '../components/Guide/GuideHome'
import GuideColors from '../components/Guide/GuideColors'
import GuideGrid from '../components/Guide/Grid'
import GuideButton from '../components/Guide/Button'
import GuideType from '../components/Guide/Typography'
import GuideAtomic from '../components/Guide/Atomic'
import GuideForms from '../components/Guide/Forms'
import GuideTags from '../components/Guide/Tags'
import GuideUtilities from '../components/Guide/Utilities'
import GuideNav from '../components/Guide/Nav'
import GuidePlaceholder from '../components/Guide/Placeholder'
import GuideCards from '../components/Guide/Cards'

// TODO: These now all get wrapped into components,
// there is no longer a route for these.
import InboxAddressMessage from '../components/InboxAddressMessage'
import Compose from '../components/Compose'

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
  {
    path: '/guide',
    component: Guide,
    children: [
      {
        path: '',
        name: 'GuideHome',
        component: GuideHome,
      },
      {
        path: 'colors',
        name: 'colors',
        component: GuideColors,
      },
      {
        path: 'grid',
        name: 'grid',
        component: GuideGrid,
      },
      {
        path: 'button',
        name: 'button',
        component: GuideButton,
      },
      {
        path: 'typography',
        name: 'type',
        component: GuideType,
      },
      {
        path: 'atomic',
        name: 'atomic',
        component: GuideAtomic,
      },
      {
        path: 'tags',
        name: 'tags',
        component: GuideTags,
      },
      {
        path: 'nav',
        name: 'nav',
        component: GuideNav,
      },
      {
        path: 'utilities',
        name: 'utilities',
        component: GuideUtilities,
      },
      {
        path: 'placeholder',
        name: 'placeholder',
        component: GuidePlaceholder,
      },
      {
        path: 'cards',
        name: 'cards',
        component: GuideCards,
      },
      {
        path: 'forms',
        name: 'forms',
        component: GuideForms,
      },
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  routes,
})

export default router
