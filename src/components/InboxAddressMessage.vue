<template>
  <div class="columns col-gapless height-full">

    <!-- Body -->
    <div class="column col-8 page-container">

      <!-- Side nav -->
      <div class="page-side-nav">
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

      <!-- Main content -->
      <div class="page-content">

        <!-- Header -->
        <div class="header">

          <div class="header-section">
            <div class="header-content">
              <span class="text-ellipsis">{{currentMessage && currentMessage.from}}</span>
            </div>
          </div>

          <div class="header-section header-action">
            <div class="header-content">
              <button class="btn btn-action" @click="linkTo('/compose')">
                <i class="icon icon-edit"></i>
              </button>
            </div>
          </div>

        </div>

        <!-- Body -->
        <div class="body body-with-header">

          <div class="section">
            <div class="columns">
              <div class="column col-6">
                <span v-wei-to-eth="currentMessage && currentMessage.value"></span> Eth received
              </div>
              <div class="column col-6 text-right">
                <span class="text-uppercase-light">
                  {{currentMessage && currentMessage.time.format('MMM D Y')}}
                </span>
              </div>
            </div>
          </div>

          <div class="section">
            {{currentMessage}}
          </div>

          <div class="section">
            {{message}}
          </div>
        </div>

        <!-- Footer -->
        <!-- <div class="footer">
          <div class="footer-section">
            <button class="btn" @click="linkTo('/compose')">
              Message to {{currentMessage && currentMessage.from}}</button>
              Message this address</button>
          </div>
        </div> -->

      </div>

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
    data () {
      return {
        prevIdx: null,
        curIdx: null,
        nextIdx: null,
      }
    },
    methods: {
      linkTo (path) {
        this.$router.push({ path })
      },
      exitMessage () {
        this.$router.push({ path: `/inbox/${this.$store.getters.inboxAccountId}` })
      },
      prev () {
        if (!_.isNull(this.prevIdx)) {
          const newMessage = this.$store.getters.messages[this.inboxAccountId][this.prevIdx]
          const newMessageId = newMessage.hash
          this.$store.commit(MUTATION_TYPES.UPDATE_MSG_ID, newMessageId)
        }
      },
      next () {
        if (!_.isNull(this.nextIdx)) {
          const newMessage = this.$store.getters.messages[this.inboxAccountId][this.nextIdx]
          const newMessageId = newMessage.hash
          this.$store.commit(MUTATION_TYPES.UPDATE_MSG_ID, newMessageId)
        }
      },
    },
    computed: {
      inboxAccountId () {
        return this.$store.getters.inboxAccountId
      },
      messageId () {
        return this.$store.getters.messageId
      },
      currentMessage () {
        const currentMessages = this.$store.getters.messages[this.inboxAccountId]
        return _.find(currentMessages, (msg, idx) => {
          if (msg.hash === this.messageId) {
            this.curIdx = idx

            if (idx === 0) {
              this.prevIdx = null
            } else {
              this.prevIdx = idx - 1
            }

            if (idx === currentMessages.length-1) {
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
