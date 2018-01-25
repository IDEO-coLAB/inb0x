import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  // stores global info and error objects for the user
  notifications: [],

  // the current ethereum address in the search bar
  inboxAccountId: null,
  // the hash for the inbox smart contract
  inboxContractId: '0x4c15691c11eacbc25b58ce43ed9f9295732cf08b',
  // the object interface for the inbox smart contract
  inboxContractObj: null,

  // the ethereum address for the (if connected) metamask wallet
  web3AccountId: null,
  // the hash of the current message being viewed
  // DO WE NEED THIS NOW?
  messageId: null,
}

// Getters
const getters = {
  notifications: state => state.notifications,

  inboxAccountId: state => state.inboxAccountId,
  inboxContractId: state => state.inboxContractId,
  inboxContractObj: state => state.inboxContractObj,

  web3AccountId: state => state.web3AccountId,
  messageId: state => state.messageId,
  app: state => state,
}

// Mutations
const mutations = {
  // Notifications

  [MUTATION_TYPES.UPDATE_NOTIFICATIONS] (state, notification) {
    state.notifications.push(notification)
    console.log(MUTATION_TYPES.UPDATE_NOTIFICATIONS, state.notifications)
  },

  [MUTATION_TYPES.REMOVE_NOTIFICATION] (state, notification) {
    const noteIdx = _.indexOf(state.notifications, notification)
    state.notifications = _.slice(state.notifications, noteIdx, noteIdx+1)
    console.log(MUTATION_TYPES.REMOVE_NOTIFICATION, state.notifications)
  },

  // Inbox-specific

  [MUTATION_TYPES.UPDATE_INBOX_ACCT_ID] (state, id) {
    // DO CHECKS HERE
    state.inboxAccountId = id
    console.log(MUTATION_TYPES.UPDATE_INBOX_ACCT_ID, state.inboxAccountId)
  },
  [MUTATION_TYPES.RESET_INBOX_ACCT_ID] (state) {
    // DO CHECKS HERE
    state.inboxAccountId = null
    console.log(MUTATION_TYPES.RESET_INBOX_ACCT_ID, state.inboxAccountId)
  },

  [MUTATION_TYPES.UPDATE_INBOX_CONTRACT_ID] (state, id) {
    // DO CHECKS HERE
    state.inboxContractId = id
    console.log(MUTATION_TYPES.UPDATE_INBOX_CONTRACT_ID, state.inboxContractId)
  },
  [MUTATION_TYPES.RESET_INBOX_CONTRACT_ID] (state) {
    // DO CHECKS HERE
    state.inboxContractId = null
    console.log(MUTATION_TYPES.RESET_INBOX_CONTRACT_ID, state.inboxContractId)
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





  [MUTATION_TYPES.UPDATE_MSG_ID] (state, id) {
    // DO CHECKS HERE
    state.messageId = id
    console.log(MUTATION_TYPES.UPDATE_MSG_ID, state.messageId)
  },
  [MUTATION_TYPES.RESET_MSG_ID] (state) {
    // DO CHECKS HERE
    state.messageId = null
    console.log(MUTATION_TYPES.RESET_MSG_ID, state.messageId)
  },




  [MUTATION_TYPES.UPDATE_WEB3_ACCT_ID] (state, id) {
    // DO CHECKS HERE
    state.web3AccountId = id
    console.log(MUTATION_TYPES.UPDATE_WEB3_ACCT_ID, state.web3AccountId)
  },
  [MUTATION_TYPES.RESET_WEB3_ACCT_ID] (state) {
    // DO CHECKS HERE
    state.web3AccountId = null
    console.log(MUTATION_TYPES.RESET_WEB3_ACCT_ID, state.web3AccountId)
  },

}

export default {
  state,
  getters,
  mutations,
}
