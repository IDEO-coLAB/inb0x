<template>
  <div class="columns col-gapless height-full">

    <!-- Main Section -->
    <div class="column col-8 page-container">

      <div class="page-content">

        <!-- Search header -->
        <app-header></app-header>

        <!-- Body Content -->
        <div class="body body-with-header-and-footer">
          <div class="columns">
            <div class="column col-12">

              <!-- No Inbox Set up -->
              <div v-show="!eam" class="empty">
                <div class="empty-icon">
                  <i class="icon icon-2x icon-search"></i>
                </div>
                <p class="empty-title h5"><samp>inb0x</samp> Not Found</p>
                <p class="empty-subtitle">An <samp>inb0x</samp> set up was not found in the last {{transactions && transactions.length}} transactions.</p>
                <div class="empty-action">
                  <button class="btn">Set it up now</button> <button class="btn" @click="fetchTransactions">Look through 20 more</button>
                </div>
                <div class="empty-action">
                  <div class="popover popover-top">
                    <a>Why look through previous transactions?</a>
                    <div class="popover-container">
                      <div class="card">
                        <div class="card-body">
                          The <samp>inb0x</samp> for this address may have been set up before {{lastTransaction && lastTransaction.time.format('MMM D Y')}}. By looking through previous transactions, you might find its blah blah blah.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- No Messages Yet -->
              <div v-show="eam && !messages" class="empty">
                <div class="empty-icon">
                  <i class="icon icon-2x icon-search"></i>
                </div>
                <p class="empty-title h5">No Messages Found</p>
                <p class="empty-subtitle">No messages were seen in the last {{transactions && transactions.length}} transactions</p>
                <div class="empty-action">
                  <button class="btn" @click="fetchTransactions">Load the next 20</button>
                </div>
              </div>

              <!-- Has Messages -->
              <message-tile v-show="orderedMessages" v-for="message in orderedMessages" v-bind:message="message" :key="message.hash"></message-tile>

            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <div class="footer-section">
            <span v-show="lastMessage">
              {{messages && messages.length}} messages since {{lastMessage && lastMessage.time.format('MMM D Y')}}
            </span>
          </div>
          <div class="footer-section">
            <button v-show="lastMessage" class="btn btn-link" @click="fetchTransactions">Find previous messages</button>
          </div>
        </div>


      </div>

    </div>

    <!-- Sidebar Section -->
    <div class="column col-4 page-container">

      <div class="page-content">


        <div class="header">
          <div class="header-section">
            <div class="header-content">
              {{messages && messages.length}} Messages
            </div>
          </div>
        </div>


        <div class="section">
          <!-- <p>{{transactions.length}} Transactions </p> -->
          <p>XXX Ether Balance</p>
          <p>Other stats here about this address</p>
          <p>This address has not been set up yet</p>
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
  import weiToEth from '../directives/wei-to-eth'
  import addressTruncate from '../directives/address-truncate'

  export default {
    components: {
      AppHeader,
      MessageTile,
    },
    directives: {
      weiToEth,
      addressTruncate,
    },
    computed: {
      currentAddressId () {
        return this.$store.getters.currentAddressId
      },
      transactions () {
        return this.$store.getters.transactions[this.currentAddressId]
      },
      lastTransaction () {
        return _.last(this.transactions)
      },
      messages () {
        return this.$store.getters.messages[this.currentAddressId]
      },
      lastMessage () {
        return _.last(this.messages)
      },
      orderedMessages () {
        console.log(this.messages)
        return this.messages
      },
      eam () {
        return this.$store.getters.eams[this.currentAddressId]
      },

      error () { return this.$store.getters.error },
      address () { return this.$store.getters.currentAddressId },
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
        this.$store.dispatch(ACTION_TYPES.FETCH_TXS, this.currentAddressId)
          .catch(console.warn)
      }
    }
  }
</script>
