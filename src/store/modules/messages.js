import _ from 'lodash'
import Vue from 'vue'
import { MUTATION_TYPES } from '../../constants/mutations'
import { ACTION_TYPES } from '../../constants/actions'

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




const actions = {
  [ACTION_TYPES.FETCH_MSGS] ({ commit, state }, address) {



    //sweep this for errors
    const contract = this.getters.inboxContractObj
    console.log(contract)

    if (!contract) return

    contract.getInbox('0x0F03FAb4E407165a7eb7e67E3017370038dc43F9', (error, result) => {
      if (error) return console.error(error)

      console.log(result)
      console.log(result.length)
      console.log(result[0].toString(10))
      console.log(result[1].toString(10))
      console.log(result[2].toString(10))
      // const messages = result[1].s
      const messages = result[1].toString(10)

      for (let int=0; int < messages; int++) {
        contract.getMessage('0x0F03FAb4E407165a7eb7e67E3017370038dc43F9', int, (error, msg) => {
          console.log(msg)
        })
      }

    })
      // .call({ from: address })
      // .then((result) => {
      //   console.log('messages for the inbox:')
      //   console.log(result)
      // })





      // .then(function(result){
      //   var recs = result[1]
      //   console.log(recs)
      //   for (var i = 0 i < recs i++) {
      //     inbox.methods.getMessage(address,i).call({from: '0xb09cc94e279a95b924578f57cae68686c175245f'})
      //     .then(function(result,error){
      //       if(!error){
      //         console.log(result)
      //         var id = state.addrmessages.length
      //         var payload = {"from": result[0], "input":result[1], "value": result[4], "key": id}
      //         state.addrmessages.push(payload)
      //       }
      //       else{ console.log(error) }
      //     })
      //   }
      // })



  },
}




export default {
  state,
  getters,
  actions,
  mutations,
}
