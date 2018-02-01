import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'

// Initial state
const state = {
  messages: [],
}

// Getters
const getters = {
  messages: state => state.messages,
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_MESSAGES] (state, { message, index }) {
    state.messages[index] = message
    console.log(MUTATION_TYPES.UPDATE_MESSAGES, state.messages)
  },

  [MUTATION_TYPES.RESET_MESSAGES] (state) {
    state.messages = []
    console.log(MUTATION_TYPES.RESET_MESSAGES, state.messages)
  },
}

// Actions
const actions = {
  [ACTION_TYPES.FETCH_MSGS] ({ commit, state }, address) {
    const contract = this.getters.inboxContractObj

    if (!contract) {
      throw new Error('Missing inb0x contract')
    }

    contract.getInbox(address, (error, result) => {
      if (error) throw new Error(error.message)

      const msgCount = result[1].toString(10)
      for (let index=0; index < msgCount; index++) {

        contract.getMessage(address, index, (error, message) => {
          if (error) return console.error(error)
          commit(MUTATION_TYPES.UPDATE_MESSAGES, { message, index })
        })

      }

    })
  },

}

// Exports
export default {
  state,
  getters,
  actions,
  mutations,
}
