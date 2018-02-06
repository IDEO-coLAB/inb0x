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
  messageHeaders: state => state.messages.headers,
  messageList: (state) => {
    return _.filter(state.messages.list, (msg) => {
      return !_.isUndefined(msg)
    })
  }
}

// Mutations
const mutations = {
  [MUTATION_TYPES.UPDATE_MSGS] (state, { message, index }) {
    // Vue does not track deeply nested objects
    Vue.set(state.messages.list, index, message)
    console.log(MUTATION_TYPES.UPDATE_MSGS, index, message)
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
  [ACTION_TYPES.FETCH_MSG_HEADERS] ({ dispatch, commit, state }, address) {
    const contract = this.getters.inboxContractObj

    if (!contract) {
      console.error('MISSING A CONTRACT—CANNOT FETCH MESSAGES YET')
      return
     // throw new Error('Missing inb0x contract')
    }

    commit(MUTATION_TYPES.RESET_MSGS)
    commit(MUTATION_TYPES.UPDATE_SEARCH_MSG_ADDR, address)

    return contract.methods
      .getInbox(address)
      .call()
      .then((headers) => {
        commit(MUTATION_TYPES.UPDATE_MSG_HEADERS, headers)
        const msgCount = parseInt(headers[1], 10)
        let msgFetches = []

        _.times(msgCount, (index) => {
          if (_.isUndefined(state.messages.list[index])) {
            let msgAsyncFetch = new Promise((resolve, reject) => {
              return dispatch(ACTION_TYPES.FETCH_MSG, { address, index })
                .then(resolve)
                .catch(reject)
            })
            msgFetches.push(msgAsyncFetch)
          }
        })

        if (msgFetches.length) return Promise.all(msgFetches)
        return Promise.resolve()
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






