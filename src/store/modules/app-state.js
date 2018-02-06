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
    tokenAddr: null,
    messageAddr: null,
  },

  // the ethereum address for the (if connected) metamask wallet
  web3Addr: null,
}

// Getters
const getters = {
  notifications: state => state.notifications,

  inboxContractAddr: state => state.inboxContractAddr,
  inboxContractObj: state => state.inboxContractObj,

  search: state => state.search,

  web3Addr: state => state.web3Addr,
}

// Mutations
const mutations = {
  // NOTIFICATIONS

  [MUTATION_TYPES.UPDATE_NOTIFICATIONS] (state, notification) {
    state.notifications.push(notification)
    console.log(MUTATION_TYPES.UPDATE_NOTIFICATIONS, state.notifications)
  },

  [MUTATION_TYPES.REMOVE_NOTIFICATION] (state, notification) {
    const noteIdx = _.indexOf(state.notifications, notification)
    state.notifications = _.slice(state.notifications, noteIdx, noteIdx+1)
    console.log(MUTATION_TYPES.REMOVE_NOTIFICATION, state.notifications)
  },

  // INB0X CONTRACT

  [MUTATION_TYPES.UPDATE_INBOX_CONTRACT_ADDR] (state, address) {
    // DO CHECKS HERE
    state.inboxContractAddr = address
    console.log(MUTATION_TYPES.UPDATE_INBOX_CONTRACT_ADDR, state.inboxContractAddr)
  },
  [MUTATION_TYPES.RESET_INBOX_CONTRACT_ADDR] (state) {
    // DO CHECKS HERE
    state.inboxContractAddr = null
    console.log(MUTATION_TYPES.RESET_INBOX_CONTRACT_ADDR, state.inboxContractAddr)
  },

  [MUTATION_TYPES.UPDATE_INBOX_CONTRACT_OBJ] (state, contract) {
    // DO CHECKS HERE
    state.inboxContractObj = Object.freeze(contract)
    console.log(MUTATION_TYPES.UPDATE_INBOX_CONTRACT_OBJ, state.inboxContractObj)
  },
  [MUTATION_TYPES.RESET_INBOX_CONTRACT_OBJ] (state) {
    // DO CHECKS HERE
    state.inboxContractObj = null
    console.log(MUTATION_TYPES.RESET_INBOX_CONTRACT_OBJ, state.inboxContractObj)
  },


  // search

  [MUTATION_TYPES.UPDATE_SEARCH_TOKEN_ADDR] (state, address) {
    // DO CHECKS HERE
    state.search.tokenAddr = address
    console.log(MUTATION_TYPES.UPDATE_SEARCH_TOKEN_ADDR, address)
  },
  [MUTATION_TYPES.RESET_SEARCH_TOKEN_ADDR] (state) {
    state.search.tokenAddr = null
    console.log(MUTATION_TYPES.RESET_SEARCH_TOKEN_ADDR, state.search.tokenAddr)
  },

  [MUTATION_TYPES.UPDATE_SEARCH_MSG_ADDR] (state, address) {
    // DO CHECKS HERE
    state.search.messageAddr = address
    console.log(MUTATION_TYPES.UPDATE_SEARCH_MSG_ADDR, address)
  },
  [MUTATION_TYPES.RESET_SEARCH_MSG_ADDR] (state) {
    state.search.messageAddr = null
    console.log(MUTATION_TYPES.RESET_SEARCH_MSG_ADDR, state.search.messageAddr)
  },

  // METAMASK / WEB3

  [MUTATION_TYPES.UPDATE_WEB3_ADDR] (state, id) {
    // DO CHECKS HERE
    state.web3Addr = id
    console.log(MUTATION_TYPES.UPDATE_WEB3_ADDR, state.web3Addr)
  },
  [MUTATION_TYPES.RESET_WEB3_ADDR] (state) {
    // DO CHECKS HERE
    state.web3Addr = null
    console.log(MUTATION_TYPES.RESET_WEB3_ADDR, state.web3Addr)
  },

}

export default {
  state,
  getters,
  mutations,
}
