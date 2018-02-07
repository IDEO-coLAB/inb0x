<template>
  <div class="main-body">

    <message-search-component />

    <div class="body-content">
      <message-search-result-tile-component
        v-show="messages"
        v-for="(message, index) in messages"
        :message-object="message"
        :index="index"
        :key="index" />
    </div>

    <div class="body-footer">
      Some messages footer :)
    </div>

  </div>
</template>

<script>
  import web3 from 'web3'
  import _ from 'lodash'
  import { UPDATE_CURRENT_MESSAGE } from '../constants/mutations'
  import { ACTION_TYPES } from '../constants/actions'
  import MessageSearchComponent from './MessageSearchComponent'
  import MessageSearchResultTileComponent from './MessageSearchResultTileComponent'

  export default {
    components: {
      MessageSearchComponent,
      MessageSearchResultTileComponent,
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
