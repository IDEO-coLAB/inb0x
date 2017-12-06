import _ from 'lodash'
import axios from 'axios'
import web3 from 'web3'
import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'
import { EAMError, MessageError } from '../../constants/errors'
import { getTxUrlForAddress } from '../../constants/urls'
import { isEAM, EAM } from '../../eam'

const PAGE_START_INDEX = 1
const TX_BLOCK_OFFSET = 20

const ADDR_RESET_OBJ = {
  address: null,
  isFetching: false,
  pageIdx: PAGE_START_INDEX,
}

// Initial state
const state = {
  address: ADDR_RESET_OBJ,
}

// Getters
const getters = {
  address: state => state.address,
}

// Actions
const actions = {
  [ACTION_TYPES.FETCH_ADDR_TX] ({ commit, state }, address) {

    if (!web3.utils.isAddress(address)) {
      return Promise.reject('No Address')
    }

    const pageToFetch = state.address.pageIdx
    const addressTxFetchUrl = getTxUrlForAddress(address, pageToFetch, TX_BLOCK_OFFSET)

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
        if (_.isNull(addrEAM)) {
          return Promise.reject(new EAMError('EAM criteria not found'))
        }

        // Update with the latest messages
        _.forEach(transactions, (tx) => {
          const ethValue = Number(web3.utils.fromWei(tx.value))
          if (ethValue >= addrEAM.threshold) {
            newMessages.push(tx)
          }
        })

        // If no messages are found, return failed promise to let the user decide
        // if they want to fetch more transactions to look for messages
        if (newMessages.length === 0) {
          return Promise.reject(new MessageError('No messages match EAM criteria'))
        }
        commit(MUTATION_TYPES.UPDATE_MESSAGES, newMessages)
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
    state.address = ADDR_RESET_OBJ
    console.log(MUTATION_TYPES.RESET_ADDR)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
