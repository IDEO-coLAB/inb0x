<template>
  <div>
    <div @click="toggleMessage(message, $event)">
      <span>{{message[0]}}</span> - <span>toggle me (is open: {{isExpanded}})</span>
    </div>
    <div v-show="isExpanded">
      The message: <br>
      <span>{{message[1]}}</span>
    </div>
    <hr>
  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'

  export default {
    data () {
      return {
        isExpanded: false,
      }
    },
    props: {
      message: {
        type: Object,
        required: true
      },
    },
    computed: {
      messageSize () {
        // return web3.utils.hexToAscii(this.message.input)
        return web3.utils.hexToBytes(this.message.input).length
      }
    },
    methods: {
      toggleMessage (message, event) {
        this.isExpanded = !this.isExpanded
        // this.$store.commit(MUTATION_TYPES.UPDATE_MSG_ID, message.hash)
        // this.$router.push({
        //   path: `/inbox/${this.$store.getters.inboxAccountId}/${message.hash}`
        // })
      },
    }
  }
</script>
