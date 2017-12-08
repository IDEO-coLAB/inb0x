import web3 from 'web3'
import { MUTATION_TYPES } from '../constants/mutations'
import { ACTION_TYPES } from '../constants/actions'
import { EAMError, MessageError } from '../constants/errors'

const resetStore = (store) => {
  store.commit(MUTATION_TYPES.RESET_ADDR)
  store.commit(MUTATION_TYPES.RESET_TRANSACTIONS)
  store.commit(MUTATION_TYPES.RESET_EAM)
  store.commit(MUTATION_TYPES.RESET_MESSAGES)
  store.commit(MUTATION_TYPES.RESET_CURRENT_MESSAGE)
}

const testRouteForAddress = (router, store) => {
  const route = router.currentRoute
  const curAddr = store.getters.address.address
  const urlAddr = route.params.address

  const isNewAddrInUrl = urlAddr !== curAddr
  const urlAddrIsValid = web3.utils.isAddress(urlAddr)

console.log('urlAddr', urlAddr)
console.log('curAddr', curAddr)
console.log('isNewAddrInUrl', isNewAddrInUrl)
console.log('urlAddrIsValid', urlAddrIsValid)

  if (!urlAddr) return

  if (!urlAddrIsValid) {
    resetStore(store)
    return router.push({ path: `/inbox` })
  }

  if (isNewAddrInUrl && urlAddrIsValid) {
    resetStore(store)
    return store.dispatch(ACTION_TYPES.FETCH_ADDR_TX, urlAddr)
  }
}

const testRouteForMessage = (router, store) => {
  const route = router.currentRoute
  const urlMsgId = route.params.message
  const urlAddress = route.params.address
  const msgIdInUrlIsValid = web3.utils.isHex(urlMsgId)
  const isNewMsgIdInUrl = store.getters.currentMessageHash !== urlMsgId

  if (!urlMsgId || !urlAddress) return

  if (!msgIdInUrlIsValid) {
    store.commit(MUTATION_TYPES.RESET_CURRENT_MESSAGE)
    router.push({ path: `/inbox/${urlAddress}` })
    return
  }

  if (isNewMsgIdInUrl && msgIdInUrlIsValid) {
    return store.commit(MUTATION_TYPES.UPDATE_CURRENT_MESSAGE, urlMsgId)
  }
}

export const testRouteForAddressAndMessage = (router, store) => {
  testRouteForAddress(router, store)
  testRouteForMessage(router, store)
}
