<template>
  <div>
    all messages:
    <br><br>
    <div v-for="message in messages" @click="setCurrentMessage(message, $event)">
      Tx hash: {{message.hash}}
      <hr>
    </div>
  </div>
</template>

<script>
  import { SET_CURRENT_MESSAGE_ID } from '../constants/mutations'

  export default {
    computed: {
      messages () {
        const result = _.flatten(
          _.map(this.$store.getters.messages, (messages, addr) => {
            return messages
          })
        )
        return _.sortBy(result, 'timeStamp')
      }
    },
    methods: {
      setCurrentMessage (message, event) {
        this.$store.commit(SET_CURRENT_MESSAGE_ID, message.hash)
        this.$router.push({ query: {
          // addresses: this.$store.getters.currentAddresses.join(','),
          message: message.hash,
        }})
      },
    }
  }
</script>
