import _ from 'lodash'
import Vue from 'vue'
import axios from 'axios'
import web3 from 'web3'
import moment from 'moment'
import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'
import { EAMError, MessageError, AddressError } from '../../constants/errors'
import { getTxUrlForAddress } from '../../constants/urls'
import { isEAM, EAM } from '../../eam'


// Initial state
const state = {
  currentAddressId: null,
  // addresses: [],
}




// Getters
const getters = {
  currentAddressId: state => state.currentAddressId,
  // addresses: state => state.addresses,
  // haveIndexedAddressId: (state, id) => _.indexOf(state.addresses, id) > -1,
}






// // Actions
// const actions = {
//   [ACTION_TYPES.FETCH_TXS] ({ commit, state }, address) {
//     const pageToFetch = state.state.pageIdx
//     const curAddress = state.currentAddressId

//     if (address && !web3.utils.isAddress(address)) {
//       return Promise.reject(new AddressError())
//     }
//     if (_.isUndefined(address) && curAddress) {
//       address = curAddress
//     }

//     const addressTxFetchUrl = getTxUrlForAddress(address, pageToFetch, RESULTS_PER_PAGE)
//     commit(MUTATION_TYPES.UPDATE_ADDR_STATE, { isFetching: true, })

//     return axios.get(addressTxFetchUrl)
//       .then((response) => {

//         // Set the address and fetch state for the app
//         commit(MUTATION_TYPES.UPDATE_CURRENT_ADDR_ID, address)
//         commit(MUTATION_TYPES.UPDATE_ADDR_STATE, {
//           isFetching: false,
//           pageIdx: state.address.pageIdx + 1,
//         })

//         const transactions = response.data.result
//         let newMessages = []
//         let eam = null



//         // add a formatted time object to each message
//         _.forEach(transactions, (tx) => {
//           tx.time = new moment.unix(tx.timeStamp)
//         })
//         // Update with the latest fetched transactions
//         commit(MUTATION_TYPES.UPDATE_TRANSACTIONS, { address, transactions })



//         // Pluck the latest EAM definition from transactions
//         _.forEach(transactions, (tx) => {
//           // Only ever use the latest EAM definition; hence the kill switch
//           if (eam) return false

//           const sentToSelf = tx.from === tx.to
//           const inputJsonStr = web3.utils.hexToAscii(tx.input)

//           if (sentToSelf && isEAM(inputJsonStr)) {
//             eam = new EAM(inputJsonStr)
//             commit(MUTATION_TYPES.UPDATE_EAM, { address, eam })
//           }
//         })


//         // Update with the latest messages
//         _.forEach(transactions, (tx) => {
//           const ethValue = Number(web3.utils.fromWei(tx.value))
//           if (ethValue >= eam.threshold) {
//             // // add a formatted time object to each message
//             // tx.time = new moment.unix(tx.timeStamp)
//             newMessages.push(tx)
//           }
//         })
//         commit(MUTATION_TYPES.UPDATE_EAM, newMessages)
//         return Promise.resolve()
//       })
//       .catch((error) => {
//         // update the fetching state to false
//         commit(MUTATION_TYPES.UPDATE_ADDR, { isFetching: false, })
//         return Promise.reject(error)
//       })


//   }
// }











// Mutations
const mutations = {


  // [MUTATION_TYPES.ADD_ADDRESS_ID] (state, id) {
  //   // DO CHECKS HERE
  //   state.addresses = _.uniq(state.addresses.push(id))
  //   console.log(MUTATION_TYPES.ADD_ADDRESS_ID, state.addresses)
  // },
  // [MUTATION_TYPES.REMOVE_ADDRESS_ID] (state, id) {
  //   // DO CHECKS HERE
  //   state.addresses = _.pull(state.addresses, id)
  //   console.log(MUTATION_TYPES.REMOVE_ADDRESS_ID, state.addresses)
  // },



  [MUTATION_TYPES.UPDATE_CURRENT_ADDR_ID] (state, id) {
    // DO CHECKS HERE
    state.currentAddressId = id
    console.log(MUTATION_TYPES.UPDATE_CURRENT_ADDR_ID, state.currentAddressId)
  },

  [MUTATION_TYPES.RESET_CURRENT_ADDR_ID] (state) {
    // DO CHECKS HERE
    state.currentAddressId = null
    console.log(MUTATION_TYPES.RESET_CURRENT_ADDR_ID, state.currentAddressId)
  },



  // [MUTATION_TYPES.UPDATE_CURRENT_MSG_ID] (state, id) {
  //   // DO CHECKS HERE
  //   state.currentMessageId = id
  //   console.log(MUTATION_TYPES.UPDATE_CURRENT_MSG_ID, state.currentMessageId)
  // },
  // [MUTATION_TYPES.RESET_CURRENT_MSG_ID] (state) {
  //   // DO CHECKS HERE
  //   state.currentMessageId = null
  //   console.log(MUTATION_TYPES.RESET_CURRENT_MSG_ID, state.currentMessageId)
  // },





  // [MUTATION_TYPES.UPDATE_TRANSACTIONS] (state, { address, transactions }) {
  //   let newAddrObj = state.all[address] || {}
  //   const curTxs = newAddrObj.transactions || []
  //   const newTxs = _.uniq(curTxs.concat(transactions))

  //   newAddrObj.transactions = newTxs

  //   Vue.set(state.all[address], newAddrObj)
  //   console.log(MUTATION_TYPES.UPDATE_ADDR, state.all)
  // },




  // [MUTATION_TYPES.UPDATE_MESSAGES] (state, { address, messages }) {
  //   let newAddrObj = state.all[address] || {}
  //   const curMsgs = newAddrObj.messages || []
  //   const newMsgs = _.uniq(curMsgs.concat(messages))

  //   newAddrObj.messages = newTxs

  //   Vue.set(state.all[address], newAddrObj)
  //   console.log(MUTATION_TYPES.UPDATE_ADDR, state.all)
  // },




  // [MUTATION_TYPES.UPDATE_EAM] (state, { address, eam }) {
  //   let newAddrObj = state.all[address] || {}
  //   newAddrObj.eam = eam

  //   Vue.set(state.all[address], newAddrObj)
  //   console.log(MUTATION_TYPES.UPDATE_ADDR, state.all)
  // },




  // [MUTATION_TYPES.UPDATE_BALANCE] (state, { address, balance }) {
  //   // DO CHECKS HERE
  //   let newAddrObj = state.all[address] || {}
  //   newAddrObj.balance = balance

  //   Vue.set(state.all[address], newAddrObj)
  //   console.log(MUTATION_TYPES.UPDATE_BALANCE, state.all)
  // },
  // [MUTATION_TYPES.RESET_BALANCE] (state,  { address, balance }) {
  //   // DO CHECKS HERE
  //   let newAddrObj = state.all[address] || {}
  //   newAddrObj.balance = null

  //   Vue.set(state.all[address], newAddrObj)
  //   console.log(MUTATION_TYPES.RESET_BALANCE, state.all)
  // },

}

export default {
  state,
  getters,
  // actions,
  mutations,
}
