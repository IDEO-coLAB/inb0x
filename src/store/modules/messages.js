import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  currentMessageId: null,
  messages: [],
}

// Getters
const getters = {
  currentMessageId: state => state.currentMessageId,
  messages: state => state.messages,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_CURRENT_MESSAGE_ID] (state, id) {
    state.currentMessageId = id
    console.log(MUTATION_TYPES.UPDATE_CURRENT_MESSAGE_ID, state.currentMessageId)
  },

  [MUTATION_TYPES.RESET_CURRENT_MESSAGE_ID] (state) {
    state.currentMessageId = null
    console.log(MUTATION_TYPES.RESET_CURRENT_MESSAGE_ID)
  },

  [MUTATION_TYPES.UPDATE_MESSAGES] (state, messages) {
    // Vue.set(state.messages, messages)
    state.messages = state.messages.concat(messages)
    console.log(MUTATION_TYPES.UPDATE_MESSAGES, state.messages)
  },

  [MUTATION_TYPES.RESET_MESSAGES] (state) {
    state.messages = []
    console.log(MUTATION_TYPES.RESET_MESSAGES)
  },
}

export default {
  state,
  getters,
  mutations,
}
