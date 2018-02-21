<template>
  <div class="pure-g">
    <form class="form pure-u-1 u-no-pad">

      <div class="input-has-buttons-right">
        <input
          class="input-1 input-lg"
          type="text"
          v-model="input"
          placeholder="Enter an Ethereum address" />

        <!-- TODO: Spend time thinking through clean up CSS class .btn -->
        <button
          class="btn btn-lg btn-icon btn-primary"
          v-show="!isLocked"
          type="submit"
          @click="submit" >
          <span class="icon-mail" ></span>
        </button>

        <button
          class="btn btn-lg btn-icon btn-primary btn-disabled"
          v-show="isLocked" >
          <span class="icon-mail" ></span>
        </button>
      </div>

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
        input: this.$store.getters.search.messagesAddr,
      }
    },
    computed: {
      isLocked () {
        return this.$store.getters.isLocked
      }
    },
    methods: {
      submit (event) {
        event.preventDefault()

        const inputAddress = this.input
        const validEthAddress = Web3.utils.isAddress(inputAddress)
        const curAddress = this.$store.getters.search.messagesAddr

        // Bail if not a valid address
        if (!validEthAddress) {
          // TODO/FIXME: inline errors
          const notification = {
            text: `FIXME (inline error): You can only use a valid ethereum address`,
            type: NOTIFICATION_TYPES.ERROR,
          }
          this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
          return
        }

        return this.$store.dispatch(ACTION_TYPES.FETCH_MSGS_HEADERS, inputAddress)
          .then(() => {
            return this.$router.push({
              path: `/messages`,
              query: { address: inputAddress },
            })
          })
          .catch((error) => {
            const notification = {
              text: `There was an error fetching messages: ${error.message}`,
              type: NOTIFICATION_TYPES.ERROR,
            }
            this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
          })

      },
    },
  }
</script>
