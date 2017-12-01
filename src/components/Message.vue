<template>
  <div>
    eth inbox protocol (eip) message:<br><br>
    {{message || `No eip message found.`}}
  </div>
</template>

<script>
  import web3 from 'web3'

  export default {
    computed: {
      message () {
        const curMessageId = this.$store.getters.currentMessageId
        const messages = _.flatten(
          _.map(this.$store.getters.messages, (messages, addr) => {
            return messages
          })
        )
        const curMessage = _.find(messages, (msg) => msg.hash === curMessageId)
        return curMessage && web3.utils.hexToAscii(curMessage.input)
      }
    },
  }
</script>
