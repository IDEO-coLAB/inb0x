import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  errors: [],
  notifications: [],
  inboxAccountId: null,
  web3AccountId: null,
  messageId: null,
}

// Getters
const getters = {
  errors: state => state.errors,
  notifications: state => state.notifications,
  inboxAccountId: state => state.inboxAccountId,
  web3AccountId: state => state.web3AccountId,
  messageId: state => state.messageId,
  app: state => state,
}

// Mutations
const mutations = {

  [MUTATION_TYPES.UPDATE_ERRORS] (state, error) {
    state.errors.push(error)
    console.log(MUTATION_TYPES.UPDATE_ERRORS, state.errors)
  },

  [MUTATION_TYPES.REMOVE_ERROR] (state, error) {
    const errIdx = _.indexOf(state.errors, error)
    state.errors = _.slice(state.errors, errIdx, errIdx+1)
    console.log(MUTATION_TYPES.REMOVE_ERROR, state.errors)
  },


  [MUTATION_TYPES.UPDATE_NOTIFICATIONS] (state, info) {
    state.info.push(info)
    console.log(MUTATION_TYPES.UPDATE_NOTIFICATIONS, state.info)
  },

  [MUTATION_TYPES.REMOVE_NOTIFICATION] (state, info) {
    const infoIdx = _.indexOf(state.info, info)
    state.info = _.slice(state.info, infoIdx, infoIdx+1)
    console.log(MUTATION_TYPES.REMOVE_NOTIFICATION, state.info)
  },




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
