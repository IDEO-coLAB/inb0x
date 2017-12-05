<template>
  <div>
    eth inbox protocol (EAM) message:<br><br>
    {{message || `No EAM message found.`}}
  </div>
</template>

<script>
  import web3 from 'web3'

  export default {
    computed: {
      message () {
        const curMessageId = this.$store.getters.currentMessageId
        const messages = this.$store.getters.messages
        const curMessage = _.find(messages, (msg) => msg.hash === curMessageId)
        return curMessage && web3.utils.hexToAscii(curMessage.input)
      }
    },
  }
</script>
