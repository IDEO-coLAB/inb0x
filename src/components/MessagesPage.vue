<template>
  <div class="columns col-gapless height-full">

    <!-- Main Section -->
    <div class="column col-12 page-container">

      <div class="page-content">

        <!-- Search header -->
<!--         <search-bar-component></search-bar-component> -->

        <!-- Body Content -->
        <div class="body body-with-header-and-footer">
          <div class="columns">
            <div class="column col-12">

              <!-- Has Messages -->
              <message-tile-component v-show="messages" v-for="(message, index) in messages" :message-object="message" :index="index" :key="index"></message-tile-component>

            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-section">
            <span>
              we have {{messages.length}} messages :)
              <!-- {{messages && messages.length}} messages since {{lastMessage && lastMessage.time.format('MMM D Y')}} -->
            </span>
          </div>
        </div>


      </div>

    </div>

  </div>
</template>

<script>
  import web3 from 'web3'
  import _ from 'lodash'
  import { UPDATE_CURRENT_MESSAGE } from '../constants/mutations'
  import { ACTION_TYPES } from '../constants/actions'
  import SearchBarComponent from './SearchBarComponent'
  import MessageTileComponent from './MessageTileComponent'

  export default {
    components: {
      SearchBarComponent,
      MessageTileComponent,
    },
    // mounted () {
    //   console.error('CALLING IN INBOX COMPONENT')
    //   const inboxAddress = this.$store.getters.inboxAccountId
    //   this.$store.dispatch(ACTION_TYPES.FETCH_MSG_HEADERS, inboxAddress)
    // },
    computed: {
      inboxAccountId () {
        console.warn('inbox account is loaded')
        return this.$store.getters.inboxAccountId
      },
      // transactions () {
      //   return this.$store.getters.transactions[this.inboxAccountId]
      // },
      // lastTransaction () {
      //   return _.last(this.transactions)
      // },
      messages () {
        return this.$store.getters.messageList
      },
      // lastMessage () {
      //   return _.last(this.messages)
      // },
      // orderedMessages () {
      //   console.log(this.messages)
      //   return this.messages
      // },
      // eam () {
      //   return this.$store.getters.eams[this.inboxAccountId]
      // },

      error () { return this.$store.getters.error },
      address () { return this.$store.getters.inboxAccountId },
      route () { return this.$route },
    },
    methods: {
      setCurrentMessage (message, event) {
        this.$store.commit(UPDATE_CURRENT_MSG_ID, message.hash)
        this.$router.push({
          path: `/inbox/${this.$store.getters.address.address}/${message.hash}`
        })
      },
      fetchTransactions () {
        this.$store.dispatch(ACTION_TYPES.FETCH_MSGS, this.inboxAccountId)
          .catch(console.warn)
      }
    }
  }
</script>
