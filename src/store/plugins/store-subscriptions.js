import _ from 'lodash'
import axios from 'axios'
import web3 from 'web3'
import { MUTATION_TYPES } from '../../constants/mutations'
import { getTxUrlForAddress } from '../../constants/urls'
import { isEAM, EAM } from '../../eam'

export default (store) => {

  store.subscribe((mutation, state) => {
    switch (mutation.type) {

      // Fetch transactions when a new address is added into the store
      case MUTATION_TYPES.SET_ADDR:
        let address = mutation.payload
        let addressTxFetchUrl = getTxUrlForAddress(address)

        // TODO: Add caching layer at some point

        // Fetch recent transactions
        axios.get(addressTxFetchUrl)
          .then((response) => {
            const transactions = response.data.result || []

            let eam = null
            let messages = []

            // Find the most recent protocol definition
            // TODO: ensure to and from same address!!!
            // TODO: ensure to and from same address!!!
            // TODO: ensure to and from same address!!!
            _.forEach(transactions, (tx) => {
              const inputData = web3.utils.hexToAscii(tx.input)
              if (isEAM(inputData)) {
                eam = new EAM(inputData)
                // Kill the loop to only take the latest eam protocol definition
                return false
              }
            })

            // If an eam exists extract all messages
            // meeting the terms of communication
            if (eam) {
              _.forEach(transactions, (tx) => {
                const ethValue = Number(web3.utils.fromWei(tx.value))
                if (ethValue >= eam.threshold) {
                  messages.push(tx)
                }
              })
            }

            // store.commit(MUTATION_TYPES.UPDATE_CURRENT_ADDRS, address)
            store.commit(MUTATION_TYPES.SET_MESSAGES, messages)
            store.commit(MUTATION_TYPES.SET_EAM, eam)
          })
          .catch((error) => {
            // GLOBAL ERROR
            console.error('TODO: HANDLE CLIENT ERRORS GRACEFULLY:', error)
            // // TODO: ADD CLEANUP HANDLER WHEN AN ADDRESS IS REMOVED!
            // store.commit(MUTATION_TYPES.UNSET_ADDR)
            // store.commit(MUTATION_TYPES.UNSET_CURRENT_MESSAGE_ID)
            // store.commit(MUTATION_TYPES.UNSET_MESSAGES)
            // store.commit(MUTATION_TYPES.UNSET_EAM)
          })


    }
  })

}
