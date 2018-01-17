import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'
import web3 from 'web3'
import moment from 'moment'
import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'

import { getTxUrlForAddress } from '../../constants/urls'
import { isEAM, EAM } from '../../eam'



const PAGE_START_INDEX = 1
const RESULTS_PER_PAGE = 20


// isFetching: false,
// pageIdx: PAGE_START_INDEX,



// Initial state
const state = {
  transactions: {},
  state: {},
  settings: {
    resultsPerPage: RESULTS_PER_PAGE
  }
}

// Getters
const getters = {
  transactions: state => state.transactions,
}





// Actions
const actions = {
  [ACTION_TYPES.FETCH_TXS] ({ commit, state }, address) {
    const pageToFetch = state.state.pageIdx || PAGE_START_INDEX

    // TODO: CACHING!!!!

    if (address && !web3.utils.isAddress(address)) {
      return Promise.reject(new AddressError())
    }

    const addressTxFetchUrl = getTxUrlForAddress(address, pageToFetch, RESULTS_PER_PAGE)
    commit(MUTATION_TYPES.UPDATE_TRANSACTIONS_STATE, {
      address,
      isFetching: true,
      pageIdx: pageToFetch
    })

    return axios.get(addressTxFetchUrl)
      .then((response) => {

        // Set the address and fetch state for the app
        // commit(MUTATION_TYPES.UPDATE_CURRENT_ADDR_ID, address)
        commit(MUTATION_TYPES.UPDATE_TRANSACTIONS_STATE, {
          address,
          isFetching: false,
          pageIdx: state.state[address].pageIdx + 1,
        })

        const transactions = response.data.result
        let messages = []
        let eam = null


        // Handle transactions
        // ----------------------------------------------
        // add a formatted time object to each message
        _.forEach(transactions, (tx) => {
          tx.time = new moment.unix(tx.timeStamp)
        })
        commit(MUTATION_TYPES.UPDATE_TRANSACTIONS, { address, transactions })

        // Handle eam
        // ----------------------------------------------
        _.forEach(transactions, (tx) => {
          // Only ever use the latest EAM definition; hence the kill switch
          if (eam) return false

          const sentToSelf = tx.from === tx.to
          const inputJsonStr = web3.utils.hexToAscii(tx.input)

          if (sentToSelf && isEAM(inputJsonStr)) {
            eam = new EAM(inputJsonStr)
            commit(MUTATION_TYPES.UPDATE_EAMS, { address, eam })
          }
        })

        // Handle messages
        // ----------------------------------------------
        _.forEach(transactions, (tx) => {
          const ethValue = Number(web3.utils.fromWei(tx.value))
          if (ethValue >= eam.threshold) {
            messages.push(tx)
          }
        })
        commit(MUTATION_TYPES.UPDATE_MESSAGES, { address, messages })
        return Promise.resolve()
      })
      .catch((error) => {
        // update the fetching state to false
        commit(MUTATION_TYPES.UPDATE_TRANSACTIONS_STATE, { address, isFetching: false, })
        return Promise.reject(error)
      })


  }
}















// Mutations
const mutations = {

  [MUTATION_TYPES.UPDATE_TRANSACTIONS_STATE] (state, { address, isFetching, pageIdx }) {
    let newTxStateObj = state.state[address] || {}

    if (!_.isUndefined(isFetching)) {
      newTxStateObj.isFetching = isFetching
    }
    if (!_.isUndefined(pageIdx)) {
      newTxStateObj.pageIdx = pageIdx
    }

    Vue.set(state.state, address, newTxStateObj)
    console.log(MUTATION_TYPES.UPDATE_TRANSACTIONS_STATE, state.state)
  },

  [MUTATION_TYPES.RESET_TRANSACTIONS_STATE] (state, { address }) {
    let newTxStateObj = state.state[address] || {}
    newTxStateObj.isFetching = false
    newTxStateObj.pageIdx = PAGE_START_INDEX

    Vue.set(state.state, address, newTxStateObj)
    console.log(MUTATION_TYPES.RESET_TRANSACTIONS_STATE, state.state)
  },





  [MUTATION_TYPES.UPDATE_TRANSACTIONS] (state, { address, transactions }) {
    let newAddrObj = state.transactions[address] || []

    Vue.set(state.transactions, address, _.uniqBy(newAddrObj.concat(transactions), 'hash'))
    console.log(MUTATION_TYPES.UPDATE_TRANSACTIONS, state.transactions[address])
  },

  [MUTATION_TYPES.RESET_TRANSACTIONS] (state, { address }) {
    Vue.set(state.transactions, address, [])
    console.log(MUTATION_TYPES.RESET_TRANSACTIONS, state.transactions[address])
  },

}

export default {
  state,
  getters,
  actions,
  mutations,
}
