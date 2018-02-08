import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'
import { Notification } from '../../models/notification'

// FIXME: type checking on setters

// Initial state
const state = {
  // stores global info and error objects for the user
  notifications: [],
  // the ethereum address for the (if connected) metamask wallet
  web3Addr: null,
  // the hash for the inbox smart contract
  // https://ropsten.etherscan.io/address/0x22abb8354bb201d32e77777b1a8304befec737cd
  inboxContractAddr: '0x22ABB8354bB201d32E77777B1A8304BEfec737CD',
  // the object interface for the inbox smart contract
  inboxContractObj: null,
  // bool to lock ui when fetching async data
  isLocked: false,
  // search bar values depending on the query
  search: {
    tokensAddr: null,
    messagesAddr: null,
  },
}

// Getters
const getters = {
  notifications: state => state.notifications,
  inboxContractAddr: state => state.inboxContractAddr,
  inboxContractObj: state => state.inboxContractObj,
  web3Addr: state => state.web3Addr,
  isLocked: state => state.isLocked,
  search: state => state.search,
}

// Mutations
const mutations = {

  // notifications

  [MUTATION_TYPES.ADD_NOTIFICATION] (state, { text, type }) {
    const instance = new Notification({ text, type, })
    state.notifications.push(instance)
    console.log(MUTATION_TYPES.ADD_NOTIFICATION, instance)
  },

  [MUTATION_TYPES.REMOVE_NOTIFICATION] (state, notification) {
    const noteIdx = _.indexOf(state.notifications, notification)
    // remove the notification
    state.notifications.splice(noteIdx, 1)
    console.log(MUTATION_TYPES.REMOVE_NOTIFICATION, notification)
  },

  // web3 / metamask

  [MUTATION_TYPES.SET_WEB3_ADDR] (state, address) {
    // DO CHECKS HERE
    if (_.isUndefined(address)) {
      state.web3Addr = null
    } else {
      state.web3Addr = address
    }
    console.log(MUTATION_TYPES.SET_WEB3_ADDR, address)
  },

  // inbox smart contract

  [MUTATION_TYPES.SET_INBOX_CONTRACT_ADDR] (state, address) {
    if (_.isUndefined(address)) {
      state.inboxContractAddr = null
    } else {
      state.inboxContractAddr = address
    }
    console.log(MUTATION_TYPES.SET_INBOX_CONTRACT_ADDR, address)
  },

  [MUTATION_TYPES.SET_INBOX_CONTRACT_OBJ] (state, contract) {
    if (_.isUndefined(contract)) {
      state.inboxContractObj = null
    } else {
      state.inboxContractObj = Object.freeze(contract)
    }
    console.log(MUTATION_TYPES.SET_INBOX_CONTRACT_OBJ, contract)
  },

  // lock state

  [MUTATION_TYPES.SET_LOCK_STATE] (state, isLocked) {
    state.isLocked = isLocked
    console.log(MUTATION_TYPES.SET_LOCK_STATE, isLocked)
  },

  // search

  [MUTATION_TYPES.SET_SEARCH_TOKENS_ADDR] (state, address) {
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
