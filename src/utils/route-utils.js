import web3Utils from 'web3-utils'
import web3 from 'web3'
import { MUTATION_TYPES } from '../constants/mutations'
import { ACTION_TYPES } from '../constants/actions'

const resetAppState = (store) => {
  store.commit(MUTATION_TYPES.RESET_INBOX_ACCT_ID)
  store.commit(MUTATION_TYPES.RESET_MSG_ID)
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
  const curAddr = store.getters.inboxAccountId
  const urlAddr = route.params.address

  const isNewAddrInUrl = urlAddr !== curAddr
  const urlAddrIsValid = web3Utils.isAddress(urlAddr)

  // (Crappy) Debugging:
  // =============================================
  // console.log('urlAddr', urlAddr)
  // console.log('curAddr', curAddr)
  // console.log('isNewAddrInUrl', isNewAddrInUrl)
  // console.log('urlAddrIsValid', urlAddrIsValid)

  if (!urlAddr) return

  if (!urlAddrIsValid) {
    resetAppState(store)
    return router.push({ path: `/inbox` })
  }

  // HACK
  // HACK
  if (store.getters.inboxContractObj) return console.warn('NO CONTRACT YET')
  // HACK
  // HACK

  if (isNewAddrInUrl && urlAddrIsValid) {
    store.commit(MUTATION_TYPES.UPDATE_INBOX_ACCT_ID, urlAddr)
    return store.dispatch(ACTION_TYPES.FETCH_MSGS, urlAddr)
  }
}

const testRouteForMessage = (router, store) => {
  const route = router.currentRoute
  const urlMsgId = route.params.message
  const urlAddress = route.params.address
  const msgIdInUrlIsValid = web3Utils.isHex(urlMsgId)
  const isNewMsgIdInUrl = store.getters.currentMessageHash !== urlMsgId

  if (!urlMsgId || !urlAddress) return

  if (!msgIdInUrlIsValid) {
    store.commit(MUTATION_TYPES.RESET_MSG_ID)
    console.error('FAILED URL FOR SINGLE MESSAGE')
    // router.push({ path: `/inbox/${urlAddress}` })
    return
  }

  if (isNewMsgIdInUrl && msgIdInUrlIsValid) {
    return store.commit(MUTATION_TYPES.UPDATE_MSG_ID, urlMsgId)
  }
}

export const testRouteForAddressAndMessage = (router, store) => {
  testRouteForAddress(router, store)
  testRouteForMessage(router, store)
}
