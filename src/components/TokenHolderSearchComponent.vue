<template>
  <div class="body-search">

    <form class="pure-form">
      <fieldset class="pure-g">
        <input
          class="pure-input-3-4"
          type="text"
          v-model="input"
          placeholder="Enter an Ethereum address" />

        <button type="submit" class="pure-button pure-button-primary pure-input-1-4" @click="submit">Search</button>
      </fieldset>
    </form>

  </div>
</template>

<script>
  import Web3 from 'web3'
  import _ from 'lodash'
  import { MUTATION_TYPES } from '../constants/mutations'
  import { ACTION_TYPES } from '../constants/actions'
  import { NOTIFICATION_TYPES } from '../models/notification'

  export default {
    data () {
      return {
        input: this.$store.getters.search.tokensAddr,
      }
    },
    methods: {
      submit (event) {
        event.preventDefault()

        const inputAddress = this.input
        const validEthAddress = Web3.utils.isAddress(inputAddress)
        const curAddress = this.$store.getters.search.tokensAddr

        if (!validEthAddress) {
          // TODO/FIXME: inline errors
          const notification = {
            text: `FIXME (inline error): You can only use a valid ethereum address`,
            type: NOTIFICATION_TYPES.ERROR,
          }
          this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
          return
        }

        return this.$store.dispatch(ACTION_TYPES.FETCH_TOKEN_HOLDERS, inputAddress)
          .then(() => {
            return this.$router.push({
              path: `/tokens`,
              query: { address: inputAddress },
            })
          })
          .catch((error) => {
            const notification = {
              text: `There was an error fetching token holder results: ${error.message}`,
              type: NOTIFICATION_TYPES.ERROR,
            }
            this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
          })
      },
    },
  }
</script>
