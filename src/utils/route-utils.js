import web3Utils from 'web3-utils'
import web3 from 'web3'

import { MUTATION_TYPES } from '../constants/mutations'
import { ACTION_TYPES } from '../constants/actions'
import ROUTE_NAMES from '../constants/routes'

const handleMessagesRoute = (router, store) => {
  const curAddr = store.getters.search.messagesAddr
  const routeAddr = router.currentRoute.query.address
  const routeHasNewAddr = curAddr && (routeAddr !== curAddr)
  const routeAddrIsValid = web3Utils.isAddress(routeAddr)

  // reset the messages state in the app
  if (!routeAddrIsValid) {
    store.commit(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR)
    store.commit(MUTATION_TYPES.SET_MSGS_HEADERS)
    store.commit(MUTATION_TYPES.SET_MSGS)
    router.push({ path: `/messages` })
    return
  }

  // fetch messages and update the search addr
  if (routeHasNewAddr && routeAddrIsValid) {
    console.log('FETCHING MESSAGES FROM THE ROUTE_UTILS')
    store.commit(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR, routeAddr)
    store.dispatch(ACTION_TYPES.FETCH_MSGS_HEADERS, routeAddr)
    return
  }
}

const handleSearchRoute = (router, store) => {
  const curAddr = store.getters.search.tokensAddr
  const routeAddr = router.currentRoute.query.address
  const routeHasNewAddr = curAddr && (routeAddr !== curAddr)
  const routeAddrIsValid = web3Utils.isAddress(routeAddr)

  if (!routeHasNewAddr) return

  // reset the token holders state in the app
  if (!routeAddrIsValid) {
    store.commit(MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR)
    store.commit(MUTATION_TYPES.SET_TOKEN_HOLDERS)
    router.push({ path: `/search` })
    return
  }

  // fetch token holders and update the search addr
  if (routeHasNewAddr && routeAddrIsValid) {
    console.log('FETCHING TOKEN HOLDERS FROM THE ROUTE_UTILS')
    store.commit(MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR, routeAddr)
    store.dispatch(ACTION_TYPES.FETCH_TOKEN_HOLDERS, routeAddr)
    return
  }
}

export default (router, store) => {
  switch (router.currentRoute.name) {
    case ROUTE_NAMES.MESSAGES_PAGE:
      handleMessagesRoute(router, store)
      break
    case ROUTE_NAMES.SEARCH_PAGE:
      handleSearchRoute(router, store)
      break
  }
}
