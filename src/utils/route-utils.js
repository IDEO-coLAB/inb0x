import web3 from 'web3'
import { MUTATION_TYPES } from '../constants/mutations'
import { ACTION_TYPES } from '../constants/actions'
import { EAMError, MessageError } from '../constants/errors'

const resetAppState = (store) => {
  store.commit(MUTATION_TYPES.RESET_CURRENT_ADDR_ID)
  store.commit(MUTATION_TYPES.RESET_CURRENT_MSG_ID)
}

const resetStoreForAddress = (store, address) => {
  const payload = { address }
  store.commit(MUTATION_TYPES.RESET_TRANSACTIONS_STATE, payload)
  store.commit(MUTATION_TYPES.RESET_TRANSACTIONS, payload)
  store.commit(MUTATION_TYPES.RESET_MESSAGES, payload)
  store.commit(MUTATION_TYPES.RESET_BALANCE, payload)
  store.commit(MUTATION_TYPES.RESET_EAMS, payload)
}

const testRouteForAddress = (router, store) => {
  const route = router.currentRoute
  const curAddr = store.getters.currentAddressId
  const urlAddr = route.params.address

  const isNewAddrInUrl = urlAddr !== curAddr
  const urlAddrIsValid = web3.utils.isAddress(urlAddr)

  // console.log('urlAddr', urlAddr)
  // console.log('curAddr', curAddr)
  // console.log('isNewAddrInUrl', isNewAddrInUrl)
  // console.log('urlAddrIsValid', urlAddrIsValid)

  if (!urlAddr) return

  if (!urlAddrIsValid) {
    resetAppState(store)
    console.log('HEYOOOOOOOO------------')
    // resetStoreForAddress(store, urlAddr)
    return router.push({ path: `/inbox` })
  }

  if (isNewAddrInUrl && urlAddrIsValid) {
    // resetStoreForAddress(store)
    console.log('BMMMMMMMMMMMMMM------------')
    store.commit(MUTATION_TYPES.UPDATE_CURRENT_ADDR_ID, urlAddr)
    return store.dispatch(ACTION_TYPES.FETCH_TXS, urlAddr)
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
    store.commit(MUTATION_TYPES.RESET_CURRENT_MSG_ID)
    router.push({ path: `/inbox/${urlAddress}` })
    return
  }

  if (isNewMsgIdInUrl && msgIdInUrlIsValid) {
    return store.commit(MUTATION_TYPES.UPDATE_CURRENT_MSG_ID, urlMsgId)
  }
}

export const testRouteForAddressAndMessage = (router, store) => {
  testRouteForAddress(router, store)
  testRouteForMessage(router, store)
}
