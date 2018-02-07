<template>
  <div class="body-search">

    <form class="pure-form">
      <fieldset class="pure-g">
        <input
          class="pure-input-3-4"
          type="text"
          v-model="input"
          placeholder="Enter an Ethereum address"
          v-on:keyup.enter="submit" />

        <button type="submit" class="pure-button pure-button-primary pure-input-1-4" @click="submit">Search</button>
      </fieldset>
    </form>

  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import { ACTION_TYPES } from '../constants/actions'
  import ROUTE_NAMES from '../constants/routes'

  export default {
    data () {
      return {
        input: this.$store.getters.search.messagesAddr,
      }
    },
    methods: {
      submit (event) {
        event.preventDefault()

        const inputAddress = this.input
        const validEthAddress = web3.utils.isAddress(inputAddress)
        const curAddress = this.$store.getters.search.messagesAddr

        // Bail if not a valid address
        if (!validEthAddress) return // SHOW SOME ERROR
        if (inputAddress === curAddress) return

        console.log('FETCHING MESSAGES IN THE SEARCH BAR!')

        return this.$store.dispatch(ACTION_TYPES.FETCH_MSGS_HEADERS, inputAddress)
          .then(() => {
            return this.$router.push({
              path: `/messages`,
              query: { address: inputAddress },
            })
          })
          .catch((error) => {
            // SHOW SOME ERROR
            console.error('NEW MESSAGES FETCH ERROR', error)
          })

      },
    },
  }
</script>
