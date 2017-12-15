import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  currentMessageId: null,
  messages: {},
}

// Getters
const getters = {
  currentMessageId: state => state.currentMessageId,
  messages: state => state.messages,
}

// Mutations
const mutations = {

  [MUTATION_TYPES.UPDATE_CURRENT_MSG_ID] (state, id) {
    // DO CHECKS HERE
    state.currentMessageId = id
    console.log(MUTATION_TYPES.UPDATE_CURRENT_MSG_ID, state.currentMessageId)
  },
  [MUTATION_TYPES.RESET_CURRENT_MSG_ID] (state) {
    // DO CHECKS HERE
    state.currentMessageId = null
    console.log(MUTATION_TYPES.RESET_CURRENT_MSG_ID, state.currentMessageId)
  },







  [MUTATION_TYPES.UPDATE_MESSAGES] (state, { address, messages }) {
    let newAddrMsgsObj = state.messages[address] || []

    Vue.set(state.messages, address, _.uniq(newAddrMsgsObj.concat(messages)))
    console.log(MUTATION_TYPES.UPDATE_MESSAGES, state.messages[address])
  },

  [MUTATION_TYPES.RESET_MESSAGES] (state, { address }) {
    Vue.set(state.messages, address, [])
    console.log(MUTATION_TYPES.RESET_MESSAGES, state.messages[address])
  },







  // [MUTATION_TYPES.UPDATE_CURRENT_MESSAGE] (state, hash) {
  //   state.currentMessageHash = hash
  //   console.log(MUTATION_TYPES.UPDATE_CURRENT_MESSAGE, state.currentMessageHash)
  // },

  // [MUTATION_TYPES.RESET_CURRENT_MESSAGE] (state) {
  //   state.currentMessageHash = null
  //   console.log(MUTATION_TYPES.RESET_CURRENT_MESSAGE)
  // },

  // [MUTATION_TYPES.UPDATE_MESSAGES] (state, messages) {

  //   // Do stats in here

  //   state.messages = state.messages.concat(messages)
  //   console.log(MUTATION_TYPES.UPDATE_MESSAGES, state.messages)
  // },

  // [MUTATION_TYPES.RESET_MESSAGES] (state) {
  //   state.messages = []
  //   console.log(MUTATION_TYPES.RESET_MESSAGES)
  // },
}

export default {
  state,
  getters,
  mutations,
}
