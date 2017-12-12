import _ from 'lodash'
import axios from 'axios'
import web3 from 'web3'
import moment from 'moment'
import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'
import { EAMError, MessageError, AddressError } from '../../constants/errors'
import { getTxUrlForAddress } from '../../constants/urls'
import { isEAM, EAM } from '../../eam'

const PAGE_START_INDEX = 1
const TX_BLOCK_OFFSET = 20

// Initial state
const state = {
  address: {
    address: null,
    isFetching: false,
    pageIdx: PAGE_START_INDEX,
  }
}

// Getters
const getters = {
  address: state => state.address,
}

// Actions
const actions = {
  [ACTION_TYPES.FETCH_ADDR_TX] ({ commit, state }, address) {
    const pageToFetch = state.address.pageIdx
    const curAddress = state.address.address

    if (address && !web3.utils.isAddress(address)) {
      return Promise.reject(new AddressError())
    }
    if (_.isUndefined(address) && curAddress) {
      address = curAddress
    }

    const addressTxFetchUrl = getTxUrlForAddress(address, pageToFetch, TX_BLOCK_OFFSET)
    commit(MUTATION_TYPES.UPDATE_ADDR, { isFetching: true, })

    return axios.get(addressTxFetchUrl)
      .then((response) => {

        // Set the address and fetch state for the app
        commit(MUTATION_TYPES.UPDATE_ADDR, {
          address,
          isFetching: false,
          pageIdx: state.address.pageIdx + 1,
        })

        const transactions = response.data.result
        let newMessages = []
        let addrEAM = null



        // TODO: Improve robustness of the models for transactions, messages, addresses, etc.



        // add a formatted time object to each message
        _.forEach(transactions, (tx) => {
          tx.time = new moment.unix(tx.timeStamp)
        })
        // Update with the latest fetched transactions
        commit(MUTATION_TYPES.UPDATE_TRANSACTIONS, transactions)

        // Pluck the latest EAM definition from transactions
        _.forEach(transactions, (tx) => {
          // Only ever use the latest EAM definition; hence the kill switch
          if (addrEAM) return false

          const sentToSelf = tx.from === tx.to
          const inputJsonStr = web3.utils.hexToAscii(tx.input)

          if (sentToSelf && isEAM(inputJsonStr)) {
            addrEAM = new EAM(inputJsonStr)
            commit(MUTATION_TYPES.UPDATE_EAM, addrEAM)
          }
        })

        // If no EAM is found, return failed promise to let the user decide
        // if they want to fetch more transactions to look for an EAM definition
        if (_.isNull(addrEAM)) return Promise.resolve()

        // Update with the latest messages
        _.forEach(transactions, (tx) => {
          const ethValue = Number(web3.utils.fromWei(tx.value))
          if (ethValue >= addrEAM.threshold) {
            // // add a formatted time object to each message
            // tx.time = new moment.unix(tx.timeStamp)
            newMessages.push(tx)
          }
        })
        commit(MUTATION_TYPES.UPDATE_MESSAGES, newMessages)
        return Promise.resolve()
      })
      .catch((error) => {
        // update the fetching state to false
        commit(MUTATION_TYPES.UPDATE_ADDR, { isFetching: false, })
        return Promise.reject(error)
      })


  }
}






// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_ADDR] (state, data) {
    if (_.has(data, 'address')) {
      state.address.address = data.address
    }
    if (_.has(data, 'isFetching')) {
      state.address.isFetching = data.isFetching
    }
    if (_.has(data, 'pageIdx')) {
      state.address.pageIdx = data.pageIdx
    }
    console.log(MUTATION_TYPES.UPDATE_ADDR, data)
  },

  [MUTATION_TYPES.RESET_ADDR] (state) {
    state.address.address = null
    state.address.isFetching = false
    state.address.pageIdx = PAGE_START_INDEX

    console.log(MUTATION_TYPES.RESET_ADDR, state.address.pageIdx, state.address.address)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
