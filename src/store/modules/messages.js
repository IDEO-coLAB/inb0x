import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'

// Initial state
const state = {
  // currentMessageId: null,
  messages: {},
}

// Getters
const getters = {
  // currentMessageId: state => state.currentMessageId,
  messages: state => state.messages,
}

// Mutations
const mutations = {

  [MUTATION_TYPES.UPDATE_MESSAGES] (state, { address, messages }) {
    let newAddrMsgsObj = state.messages[address] || []

    Vue.set(state.messages, address, _.uniqBy(newAddrMsgsObj.concat(messages), 'hash'))
    console.log(MUTATION_TYPES.UPDATE_MESSAGES, state.messages[address])
  },

  [MUTATION_TYPES.RESET_MESSAGES] (state, { address }) {
    Vue.set(state.messages, address, [])
    console.log(MUTATION_TYPES.RESET_MESSAGES, state.messages[address])
  },

}

export default {
  state,
  getters,
  mutations,
}
