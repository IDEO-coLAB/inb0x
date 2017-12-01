import _ from 'lodash'
import axios from 'axios'
import web3 from 'web3'
import { MUTATION_TYPES } from '../../constants/mutations'
import { getTxUrlForAddress } from '../../constants/urls'
import { isEIP, EIP } from '../../eip'

export default (store) => {

  store.subscribe((mutation, state) => {
    switch (mutation.type) {

      // Fetch transactions when a new address is added into the store
      case MUTATION_TYPES.ADD_ADDR:
        let address = mutation.payload
        let addressTxFetchUrl = getTxUrlForAddress(address)

        // TODO: Add caching layer at some point

        // Fetch recent transactions
        axios.get(addressTxFetchUrl)
          .then((response) => {
            const transactions = response.data.result || []

            let eip = null
            let messages = []

            // Find the most recent protocol definition
            _.forEach(transactions, (tx) => {
              const inputData = web3.utils.hexToAscii(tx.input)
              if (isEIP(inputData)) {
                eip = new EIP(inputData)
                // Kill the loop to only take the latest eip protocol definition
                return false
              }
            })

            // If an eip exists extract all messages
            // meeting the terms of communication
            if (eip) {
              _.forEach(transactions, (tx) => {
                const ethValue = Number(web3.utils.fromWei(tx.value))
                if (ethValue >= eip.threshold) {
                  messages.push(tx)
                }
              })
            }

            // store.commit(MUTATION_TYPES.UPDATE_CURRENT_ADDRS, address)
            store.commit(MUTATION_TYPES.SET_MESSAGES_FOR_ADDR, { address, messages, })
            store.commit(MUTATION_TYPES.SET_EIP_FOR_ADDR, { address, eip, })
          })
          .catch((error) => {
            // GLOBAL ERROR
            console.error('TODO: HANDLE CLIENT ERRORS GRACEFULLY:', error)
            // TODO: ADD CLEANUP HANDLER WHEN AN ADDRESS IS REMOVED!
            store.commit(MUTATION_TYPES.REMOVE_ADDR, address)
          })


    }
  })

}
