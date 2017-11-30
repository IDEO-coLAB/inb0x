import _ from 'lodash'
import axios from 'axios'
import web3 from 'web3'
import { MUTATION_TYPES } from '../../constants/mutations'
import { getTxUrlForAddress } from '../../constants/urls'
import { isMEI, MEI } from '../../mei-protocol'

export default (store) => {

  store.subscribe((mutation, state) => {
    switch (mutation.type) {

      // Fetch transactions when a new address is added into the store
      case MUTATION_TYPES.ADD_ADDRESS:
        let address = mutation.payload
        let addressTxFetchUrl = getTxUrlForAddress(address)

        // TODO: Add caching layer at some point
        store.commit(MUTATION_TYPES.UPDATE_ADDRESS, { address, isUpdating: true })

        // Fetch recent transactions
        axios.get(addressTxFetchUrl)
          .then((response) => {
            const transactions = response.data.result

            let mei = null
            let updatedAddressInfo = {
              isUpdating: false,
              messages: [],
              transactions,
              address,
            }

            // Find the most recent protocol definition
            _.forEach(transactions, (tx) => {
              const inputData = web3.utils.hexToAscii(tx.input)
              if (isMEI(inputData)) {
                mei = new MEI(inputData)
                updatedAddressInfo.protocol = mei
                // Kill the loop to only take the latest mei protocol definition
                return false
              }
            })

            // If an mei definition exists extract all messages
            // meeting the terms of communication
            if (mei) {
              _.forEach(transactions, (tx) => {
                const ethValue = Number(web3.utils.fromWei(tx.value))
                if (ethValue >= mei.threshold) {
                  updatedAddressInfo.messages.push(tx)
                }
              })
            }

            store.commit(MUTATION_TYPES.UPDATE_ADDRESS, updatedAddressInfo)
          })
          .catch((error) => {
            // GLOBAL ERROR
            console.log('HANDLE CLIENT ERRORS GRACEFULLY:', error)
            store.commit(MUTATION_TYPES.UPDATE_ADDRESS, { address, isUpdating: false })
          })


    }
  })

}
