import web3Utils from 'web3-utils'
import web3 from 'web3'

import { MUTATION_TYPES } from '../constants/mutations'
import { ACTION_TYPES } from '../constants/actions'

const resetAppState = (store) => {
  store.commit(MUTATION_TYPES.RESET_SEARCH_MSG_ADDR)
}

const resetStoreForAddress = (store, address) => {
  store.commit(MUTATION_TYPES.RESET_TOKEN_HOLDERS)
  store.commit(MUTATION_TYPES.RESET_MSG_HEADERS)
  store.commit(MUTATION_TYPES.RESET_MSGS)
}

export const testRouteForAddress = (router, store) => {
  const route = router.currentRoute

  const curAddr = store.getters.search.messagesAddr
  const urlAddr = route.params.address

  const isNewAddrInUrl = urlAddr !== curAddr
  const urlAddrIsValid = web3Utils.isAddress(urlAddr)

  // (Crappy) Debugging:
  // =============================================
  // console.log('urlAddr', urlAddr)
  // console.log('curAddr', curAddr)
  // console.log('isNewAddrInUrl', isNewAddrInUrl)
  // console.log('urlAddrIsValid', urlAddrIsValid)



  // DETERMINE CHECKS BASED ON URL




  if (!urlAddr) return

  if (!urlAddrIsValid) {
    resetAppState(store)
    return router.push({ path: `/inbox` })
  }

  if (isNewAddrInUrl && urlAddrIsValid) {
    store.commit(MUTATION_TYPES.UPDATE_SEARCH_MSG_ADDR, urlAddr)

    // HACK
    // HACK
    if (!store.getters.inboxContractObj) return console.warn('ROUTE UTILS => NO CONTRACT YET')
    // HACK
    // HACK

    return store.dispatch(ACTION_TYPES.FETCH_MSG_HEADERS, urlAddr)
  }
}
