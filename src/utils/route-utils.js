import Web3 from 'web3'

import { MUTATION_TYPES } from '../constants/mutations'
import { ACTION_TYPES } from '../constants/actions'
import ROUTE_NAMES from '../constants/routes'

export default (router, store) => {
  const routeAddr = router.currentRoute.query.address
  const routeAddrIsValid = Web3.utils.isAddress(routeAddr)

  const curMessagesAddr = store.getters.search.messagesAddr
  const curTokensAddr = store.getters.search.tokensAddr

  const routeHasNewMessagesAddr = routeAddr && (routeAddr !== curMessagesAddr)
  const routeHasNewTokensAddr = routeAddr && (routeAddr !== curTokensAddr)

  switch (router.currentRoute.name) {

    // Handler for /messages
    case ROUTE_NAMES.MESSAGES_PAGE:

      // if there is nothing new in the url, exit
      if (!routeHasNewMessagesAddr) return console.log('no new address for messages in route utils')

      // if route params are invalid,
      // reset the messages and associated search state in the app
      if (!routeAddrIsValid) {
        console.log('clearing out messages in route utils')
        store.commit(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR)
        store.commit(MUTATION_TYPES.SET_MSGS_HEADERS)
        store.commit(MUTATION_TYPES.SET_MSGS)
        router.push({ path: `/messages` })
        return
      }

      // if a new address is in the url,
      // fetch messages and update the search state
      if (routeHasNewMessagesAddr && routeAddrIsValid) {
        console.log('fetching messages from route utils')
        store.commit(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR, routeAddr)
        store.dispatch(ACTION_TYPES.FETCH_MSGS_HEADERS, routeAddr)
        return
      }
      break

    // Handler for /tokens
    case ROUTE_NAMES.TOKENS_PAGE:
      // if there is nothing new in the url, exit
      if (!routeHasNewTokensAddr) return console.log('no new address for token holders in route utils')

      // if route params are invalid,
      // reset the token holders and associated search state in the app
      if (!routeAddrIsValid) {
        console.log('clearing out token holders in route utils')
        store.commit(MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR)
        store.commit(MUTATION_TYPES.SET_TOKEN_HOLDERS)
        router.push({ path: `/tokens` })
        return
      }

      // if a new address is in the url,
      // fetch token holders and update the search state
      if (routeHasNewTokensAddr && routeAddrIsValid) {
        console.log('fetching token holders from route utils')
        store.commit(MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR, routeAddr)
        store.dispatch(ACTION_TYPES.FETCH_TOKEN_HOLDERS, routeAddr)
        return
      }
      break
  }
}
