import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  // stores global info and error objects for the user
  notifications: [],

  // the hash for the inbox smart contract
  // https://ropsten.etherscan.io/address/0x22abb8354bb201d32e77777b1a8304befec737cd
  inboxContractAddr: '0x22ABB8354bB201d32E77777B1A8304BEfec737CD',
  // the object interface for the inbox smart contract
  inboxContractObj: null,

  // search bar values depending on the query
  search: {
    tokensAddr: null,
    messagesAddr: null,
  },

  isLocked: false,
}

// Getters
const getters = {
  notifications: state => state.notifications,

  inboxContractAddr: state => state.inboxContractAddr,
  inboxContractObj: state => state.inboxContractObj,

  search: state => state.search,
}

// Mutations
const mutations = {
  // NOTIFICATIONS

  [MUTATION_TYPES.ADD_NOTIFICATION] (state, notification) {
    state.notifications.push(notification)
    console.log(MUTATION_TYPES.ADD_NOTIFICATION, state.notifications)
  },

  [MUTATION_TYPES.REMOVE_NOTIFICATION] (state, notification) {
    const noteIdx = _.indexOf(state.notifications, notification)
    state.notifications = _.slice(state.notifications, noteIdx, noteIdx+1)
    console.log(MUTATION_TYPES.REMOVE_NOTIFICATION, state.notifications)
  },

  // INB0X CONTRACT

  [MUTATION_TYPES.SET_INBOX_CONTRACT_ADDR] (state, address) {
    // DO CHECKS HERE
    if (_.isUndefined(address)) {
      state.inboxContractAddr = null
    } else {
      state.inboxContractAddr = address
    }
    console.log(MUTATION_TYPES.SET_INBOX_CONTRACT_ADDR, address)
  },

  [MUTATION_TYPES.SET_INBOX_CONTRACT_OBJ] (state, contract) {
    // DO CHECKS HERE
    if (_.isUndefined(contract)) {
      state.inboxContractObj = null
    } else {
      state.inboxContractObj = Object.freeze(contract)
    }
    console.log(MUTATION_TYPES.SET_INBOX_CONTRACT_OBJ, contract)
  },

  [MUTATION_TYPES.SET_LOCK_STATE] (state, isLocked) {
    // DO CHECKS HERE
    state.isLocked = isLocked
    console.log(MUTATION_TYPES.SET_LOCK_STATE, isLocked)
  },


  // search

  [MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR] (state, address) {
    // DO CHECKS HERE
    if (_.isUndefined(address)) {
      state.search.tokensAddr = null
    } else {
      state.search.tokensAddr = address
    }
    console.log(MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR, address)
  },



  [MUTATION_TYPES.SET_SEARCH_MSGS_ADDR] (state, address) {
    // DO CHECKS HERE
    if (_.isUndefined(address)) {
      state.search.messagesAddr = null
    } else {
      state.search.messagesAddr = address
    }
    console.log(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR, address)
  },
}

export default {
  state,
  getters,
  mutations,
}
