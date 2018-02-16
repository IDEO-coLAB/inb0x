import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'
import { NOTIFICATION_TYPES } from '../../models/notification'

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
    if (_.isUndefined(message)) {
      state.messages.list = []
    } else {
      // Vue does not track deeply nested objects
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

    // WEB3 ISSUE! read more at https://github.com/ethereum/web3.js/issues/1089
    // WEB3 ISSUE!
    // WEB3 ISSUE!
    commit(MUTATION_TYPES.SET_MSGS, { index: 0, message: ['0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A','Hi, I’m with EOBase, we just launched our app that takes pencils and converts them to digital currency, powered by XMR, since you’ve got some, why not give our app a spin?'] })
    return Promise.resolve()
    // WEB3 ISSUE!
    // WEB3 ISSUE!
    // WEB3 ISSUE!

    if (_.isNil(contract)) {
      const notification = {
        text: `The inb0x contract has not been set up yet. What do now (web3)?`,
        type: NOTIFICATION_TYPES.ERROR,
      }
      commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
      return
    }

    commit(MUTATION_TYPES.SET_MSGS)
    commit(MUTATION_TYPES.SET_SEARCH_MSGS_ADDR, address)
    commit(MUTATION_TYPES.SET_LOCK_STATE, true)

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
      .then(() => {
        commit(MUTATION_TYPES.SET_LOCK_STATE, false)
        return Promise.resolve(true)
      })
      .catch((error) => {
        commit(MUTATION_TYPES.SET_LOCK_STATE, false)
        return Promise.reject(error)
      })
  },

  [ACTION_TYPES.FETCH_MSG] ({ commit }, { address, index }) {
    const contract = this.getters.inboxContractObj

    if (_.isNil(contract)) {
      const notification = {
        text: `The inb0x contract has not been set up yet. What do now (web3)?`,
        type: NOTIFICATION_TYPES.ERROR,
      }
      commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
      return
    }

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
