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
  [MUTATION_TYPES.SET_MSGS] (state, message) {
    // Vue does not track deeply nested objects
    if (_.isUndefined(message)) {
      state.messages.list = []
    } else {
      Vue.set(state.messages.list, message.index, message.message)
    }
    console.log(MUTATION_TYPES.SET_MSGS, message)
  },

  [MUTATION_TYPES.SET_MSGS_HEADERS] (state, headers) {
    if (_.isUndefined(headers)) {
      state.messages.headers = null
    } else {
      state.messages.headers = headers
    }
    console.log(MUTATION_TYPES.SET_MSGS_HEADERS, headers)
  },
}

// Actions
const actions = {
  [ACTION_TYPES.FETCH_MSGS_HEADERS] ({ dispatch, commit, state }, address) {
    const contract = this.getters.inboxContractObj

    if (!contract) {
      console.error('MISSING A CONTRACT—CANNOT FETCH MESSAGES YET')
      return
     // throw new Error('Missing inb0x contract')
    }

    commit(MUTATION_TYPES.SET_MSGS)
    commit(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR, address)

    return contract.methods
      .getInbox(address)
      .call()
      .then((headers) => {
        commit(MUTATION_TYPES.SET_MSGS_HEADERS, headers)
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
        commit(MUTATION_TYPES.SET_MSGS, { message, index })
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






