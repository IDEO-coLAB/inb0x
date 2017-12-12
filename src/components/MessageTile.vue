<template>
  <div class="tile" @click="setCurrentMessage(message, $event)">
    <div class="tile-content">
      <span v-wei-to-eth="message.value"></span> Eth
    </div>
    <div class="tile-content">
      <strong>{{messageSize}} bytes</strong> from {{message.from}}
    </div>
    <div class="tile-content">
      {{message.time.format('MMM D Y')}}
    </div>
  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import weiToEth from '../directives/wei-to-eth'

  export default {
    directives: {
      weiToEth,
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
      setCurrentMessage (message, event) {
        this.$store.commit(MUTATION_TYPES.UPDATE_CURRENT_MESSAGE, message.hash)
        this.$router.push({
          path: `/inbox/${this.$store.getters.address.address}/${message.hash}`
        })
      },
    }
  }
</script>
