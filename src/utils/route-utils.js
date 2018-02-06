import web3Utils from 'web3-utils'
import web3 from 'web3'

import { MUTATION_TYPES } from '../constants/mutations'
import { ACTION_TYPES } from '../constants/actions'
import ROUTE_NAMES from '../constants/routes'

export default (router, store) => {
  const curAddr = store.getters.search.messagesAddr
  const routeAddr = router.currentRoute.query.address
  const routeHasNewAddr = routeAddr && (routeAddr !== curAddr)
  const routeAddrIsValid = web3Utils.isAddress(routeAddr)

  switch (router.currentRoute.name) {

    // Handler for /messages
    case ROUTE_NAMES.MESSAGES_PAGE:
      // if route params are invalid,
      // reset the messages and associated search state in the app
      if (!routeAddr || !routeAddrIsValid) {
        console.log('clearing out messages in route utils')
        store.commit(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR)
        store.commit(MUTATION_TYPES.SET_MSGS_HEADERS)
        store.commit(MUTATION_TYPES.SET_MSGS)
        router.push({ path: `/messages` })
        return
      }

      // if there is nothing new in the url, exit
      if (!routeHasNewAddr) return console.log('no new address for messages in route utils')

      // if a new address is in the url,
      // fetch messages and update the search state
      if (routeHasNewAddr && routeAddrIsValid) {
        console.log('fetching messages from route utils')
        store.commit(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR, routeAddr)
        store.dispatch(ACTION_TYPES.FETCH_MSGS_HEADERS, routeAddr)
        return
      }
      break

    // Handler for /search
    case ROUTE_NAMES.SEARCH_PAGE:
      // if route params are invalid,
      // reset the token holders and associated search state in the app
      if (!routeAddr || !routeAddrIsValid) {
        console.log('clearing out token holders in route utils')
        store.commit(MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR)
        store.commit(MUTATION_TYPES.SET_TOKEN_HOLDERS)
        router.push({ path: `/search` })
        return
      }

      // if there is nothing new in the url, exit
      if (!routeHasNewAddr) return console.log('no new address for token holders in route utils')

      // if a new address is in the url,
      // fetch token holders and update the search state
      if (routeHasNewAddr && routeAddrIsValid) {
        console.log('fetching token holders from route utils')
        store.commit(MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR, routeAddr)
        store.dispatch(ACTION_TYPES.FETCH_TOKEN_HOLDERS, routeAddr)
        return
      }
      break
  }
}
