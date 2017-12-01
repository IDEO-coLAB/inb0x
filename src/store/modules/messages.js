import _ from 'lodash'
import Vue from 'vue'
import {
  SET_CURRENT_MESSAGE_ID,
  SET_MESSAGES_FOR_ADDR,
} from '../../constants/mutations'

// Initial state
const state = {
  currentMessageId: null,
  messages: {}
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

  [SET_MESSAGES_FOR_ADDR] (state, data) {
    if (!data.address) return
    if (!_.has(state.messages, data.address)) {
      Vue.set(state.messages, data.address, data.messages)
    } else {
      state.messages[data.address] = data.messages
    }

    console.log(SET_MESSAGES_FOR_ADDR, state.messages)
  },
}

export default {
  state,
  getters,
  mutations,
}
