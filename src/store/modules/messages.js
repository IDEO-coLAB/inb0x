import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  currentMessageHash: null,
  messages: [],
}

// Getters
const getters = {
  currentMessageHash: state => state.currentMessageHash,
  messages: state => state.messages,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_CURRENT_MESSAGE] (state, hash) {
    state.currentMessageHash = hash
    console.log(MUTATION_TYPES.UPDATE_CURRENT_MESSAGE, state.currentMessageHash)
  },

  [MUTATION_TYPES.RESET_CURRENT_MESSAGE] (state) {
    state.currentMessageHash = null
    console.log(MUTATION_TYPES.RESET_CURRENT_MESSAGE)
  },

  [MUTATION_TYPES.UPDATE_MESSAGES] (state, messages) {
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
