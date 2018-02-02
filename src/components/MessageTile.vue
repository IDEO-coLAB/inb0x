<template>
  <div>
    <div @click="toggleMessage(message, $event)">
      <span>Message {{index}}</span> - <span>Click to {{isExpanded ? 'close' : 'open'}}</span>
    </div>
    <div v-show="isExpanded">
      <br>
      <span>{{message[1]}}</span>
      <br>
      <br>
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
      index: {
        type: Number,
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
