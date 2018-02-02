<template>
  <div class="columns col-gapless height-full">

    <!-- Main Section -->
    <div class="column col-12 page-container">

      <div class="page-content">

        <!-- Search header -->
        <app-header></app-header>

        <!-- Body Content -->
        <div class="body body-with-header-and-footer">
          <div class="columns">
            <div class="column col-12">

              <!-- Has Messages -->
              <message-tile v-show="messages" v-for="(message, index) in messages" v-bind:message="message" :key="index"></message-tile>

            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-section">
            <span>
              {{messages.length}} messages :)
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
  import AppHeader from './AppHeader'
  import MessageTile from './MessageTile'

  export default {
    components: {
      AppHeader,
      MessageTile,
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
        // return this.$store.getters.messages[this.inboxAccountId]
        console.warn('CALLING IN INBOX COMPONENT')
        return this.$store.getters.messages.list
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
