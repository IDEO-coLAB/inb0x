import web3 from 'web3'
import { MUTATION_TYPES } from '../constants/mutations'
import { ACTION_TYPES } from '../constants/actions'
import { EAMError, MessageError } from '../constants/errors'

const testRouteForAddress = (router, store) => {
  const route = router.currentRoute
  const curAddress = store.getters.address.address
  const urlAddress = route.params.address
  const validEthAddress = web3.utils.isAddress(urlAddress)

  // Bail if no address is found in the URL
  if (!urlAddress) return

  // Bail if the address matches the current address in the app,
  if (curAddress === urlAddress) return

  // if a new address or invalid address is in the url, reset the app
  store.commit(MUTATION_TYPES.RESET_ADDR)
  store.commit(MUTATION_TYPES.RESET_EAM)
  store.commit(MUTATION_TYPES.RESET_MESSAGES)
  store.commit(MUTATION_TYPES.RESET_TRANSACTIONS)
  store.commit(MUTATION_TYPES.RESET_CURRENT_MESSAGE_ID)

  // if a valid eth address is in the url
  if (validEthAddress) {
    store.dispatch(ACTION_TYPES.FETCH_ADDR_TX, urlAddress)
      // .then(() => router.push({ path: `/inbox/${urlAddress}` }))
      .catch((error) => {
        if (error instanceof EAMError) {
          store.commit(MUTATION_TYPES.UPDATE_APP_ERROR, error)
          // router.push({ path: `/new/${urlAddress}` })
        }
        else if (error instanceof MessageError) {
          store.commit(MUTATION_TYPES.UPDATE_APP_ERROR, error)
          // router.push({ path: `/inbox/${urlAddress}` })
        }
      })
    return
  }

  // // redirect back to the inbox home
  // router.push({ path: `/inbox` })
}

const testRouteForMessage = (router, store) => {
  const route = router.currentRoute
  const urlMsgId = route.params.message

  // Do nothing if no message is in the url
  if (!urlMsgId) return

  // Do nothing if the message in the url matches the current message in the app
  if (store.getters.currentMessageId === urlMsgId) return

  // If the message is a valid transaction hash, set the app's message id
  // to the message in the url
  if (web3.utils.isHex(urlMsgId)) {
    store.commit(MUTATION_TYPES.UPDATE_CURRENT_MESSAGE_ID, urlMsgId)
    return
  }

  // if an invalid tx hash is the message id, reset the current message info
  store.commit(MUTATION_TYPES.RESET_CURRENT_MESSAGE_ID)

  // // redirect back to the inbox home
  // router.push({
  //   path: `/inbox/${store.getters.address.address}`
  // })
}

export const testRoute = (router, store) => {
  testRouteForAddress(router, store)
  testRouteForMessage(router, store)
}
