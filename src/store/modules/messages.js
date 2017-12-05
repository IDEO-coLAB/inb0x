import _ from 'lodash'
import Vue from 'vue'
import {
  SET_MESSAGES,
  UNSET_MESSAGES,
  SET_CURRENT_MESSAGE_ID,
  UNSET_CURRENT_MESSAGE_ID,
} from '../../constants/mutations'

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
  [SET_CURRENT_MESSAGE_ID] (state, id) {
    state.currentMessageId = id
    console.log(SET_CURRENT_MESSAGE_ID, state.currentMessageId)
  },

  [UNSET_CURRENT_MESSAGE_ID] (state) {
    state.currentMessageId = null
    console.log(UNSET_CURRENT_MESSAGE_ID)
  },

  [SET_MESSAGES] (state, messages) {
    // Vue.set(state.messages, messages)
    state.messages = messages
    console.log(SET_MESSAGES, state.messages)
  },

  [UNSET_MESSAGES] (state) {
    state.messages = []
    console.log(UNSET_MESSAGES)
  },
}

export default {
  state,
  getters,
  mutations,
}
