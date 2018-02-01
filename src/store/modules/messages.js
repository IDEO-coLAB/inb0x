import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'

// Initial state
const state = {
  messages: {
    headers: null,
    list: [],
  }
}

// Getters
const getters = {
  messages: state => state.messages,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_MSGS] (state, { message, index }) {
    state.messages.list[index] = message
    console.log(MUTATION_TYPES.UPDATE_MSGS, state.messages.list)
  },

  [MUTATION_TYPES.RESET_MSGS] (state) {
    state.messages.list = []
    console.log(MUTATION_TYPES.RESET_MSGS, state.messages.list)
  },

  [MUTATION_TYPES.UPDATE_MSG_HEADERS] (state, headers) {
    state.messages.headers = headers
    console.log(MUTATION_TYPES.UPDATE_MSG_HEADERS, state.messages.headers)
  },

  [MUTATION_TYPES.RESET_MSG_HEADERS] (state) {
    state.messages.headers = null
    console.log(MUTATION_TYPES.RESET_MSG_HEADERS, state.messages.headers)
  },
}



// Actions
const actions = {
  [ACTION_TYPES.FETCH_MSG_HEADERS] ({ commit }, address) {
    const contract = this.getters.inboxContractObj
    if (!contract) throw new Error('Missing inb0x contract')

    return contract.methods
      .getInbox(address)
      .call()
      .then((headers) => {
        commit(MUTATION_TYPES.UPDATE_MSG_HEADERS, headers)
        return headers
      })
  },

  [ACTION_TYPES.FETCH_MSG] ({ commit }, { address, index }) {
    const contract = this.getters.inboxContractObj
    if (!contract) throw new Error('Missing inb0x contract')

    return contract.methods.getMessage(address, index).call()
      .then((message) => {
        commit(MUTATION_TYPES.UPDATE_MSGS, { message, index })
        return message
      })
  }

}

// Exports
export default {
  state,
  getters,
  actions,
  mutations,
}






