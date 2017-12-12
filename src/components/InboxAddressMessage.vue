<template>
  <div class="message">

    <div class="message-nav">
      <button class="btn btn-action" @click="exitMessage">
        <i class="icon icon-cross"></i>
      </button>
      <button class="btn btn-action border-no-bottom" @click="prev">
        <i class="icon icon-arrow-up"></i>
      </button>
      <button class="btn btn-action" @click="next">
        <i class="icon icon-arrow-down"></i>
      </button>
    </div>

    <div class="message-body">
      <div class="message-header">
        <h1><span v-wei-to-eth="currentMessage && currentMessage.value"></span> eth</h1>
      </div>
    </div>






    <!-- <div class="column col-9">
      <h2>Message</h2>
      <h4>{{currentMessage && new Date(currentMessage.timeStamp * 1000).toLocaleString()}}</h4>
        {{currentMessageHash}}
        <br>
        {{currentMessage}}
        <br>
        {{message}}
    </div> -->
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
    data () {
      return {
        prevIdx: null,
        curIdx: null,
        nextIdx: null,
      }
    },
    methods: {
      exitMessage () {
        this.$router.push({ path: `/inbox/${this.$store.getters.address.address}` })
      },
      prev () {
        if (!_.isNull(this.prevIdx)) {
          const newMessage = this.$store.getters.messages[this.prevIdx]
          const newMessageId = newMessage.hash
          this.$store.commit(MUTATION_TYPES.UPDATE_CURRENT_MESSAGE, newMessageId)
        }
      },
      next () {
        if (!_.isNull(this.nextIdx)) {
          const newMessage = this.$store.getters.messages[this.nextIdx]
          const newMessageId = newMessage.hash
          this.$store.commit(MUTATION_TYPES.UPDATE_CURRENT_MESSAGE, newMessageId)
        }
      },
    },
    computed: {
      currentMessageHash () {
        return this.$store.getters.currentMessageHash
      },
      currentMessage () {
        return _.find(this.$store.getters.messages, (msg, idx) => {
          if (msg.hash === this.currentMessageHash) {
            this.curIdx = idx

            if (idx === 0) {
              this.prevIdx = null
            } else {
              this.prevIdx = idx - 1
            }

            if (idx === this.$store.getters.messages.length-1) {
              this.nextIdx = null
            } else {
              this.nextIdx = idx + 1
            }

            console.log('FOUND MESSAGE', msg)

            return true
          }
          return false
        })
      },
      message () {
        return this.currentMessage && web3.utils.hexToAscii(this.currentMessage.input)
      }
    },
  }
</script>
