<template>
  <div>


    <app-header></app-header>


    <div v-show="!eam">
      <div class="empty">
        <div class="empty-icon">
          <i class="icon icon-2x icon-search"></i>
        </div>
        <p class="empty-title h5">Missing <samp>inb0x</samp></p>
        <p class="empty-subtitle">An <samp>inb0x</samp> may not be set up for this address.</p>
        <div class="empty-action">
          <button class="btn btn-primary">Set it up now</button>
        </div>
        <div class="empty-action">
          <button class="btn btn-link" @click="fetchTransactions">Load more transactions</button>
        </div>
      </div>
    </div>

    <div v-show="eam && !messages">
      <div class="empty">
        <div class="empty-icon">
          <i class="icon icon-2x icon-search"></i>
        </div>
        <p class="empty-title h5">No Messages Found</p>
        <p class="empty-subtitle">No messages were seen in the last {{transactions.length}} transactions</p>
        <div class="empty-action">
          <button class="btn btn-primary" @click="fetchTransactions">Load more transactions</button>
        </div>
      </div>
    </div>

    <div v-show="eam && messages">
      <div class="columns">
        <div class="column col-12">

          <table class="table table-striped table-hover">
            <tbody>
              <tr v-for="message in orderedMessages" @click="setCurrentMessage(message, $event)">
                <td>
                  <h4>{{message && new Date(message.timeStamp * 1000).toLocaleString()}}</h4>
                  {{message.hash}}
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import web3 from 'web3'
  import AppHeader from './AppHeader'
  import { UPDATE_CURRENT_MESSAGE } from '../constants/mutations'
  import { ACTION_TYPES } from '../constants/actions'

  export default {
    components: {
      AppHeader,
    },
    computed: {
      transactions () {
        return this.$store.getters.transactions
      },
      messages () {
        return this.$store.getters.messages
      },
      orderedMessages () {
        // return _.sortBy(this.messages, 'timeStamp')
        return this.messages
      },
      eam () {
        return this.$store.getters.eam
      },
    },
    methods: {
      setCurrentMessage (message, event) {
        this.$store.commit(UPDATE_CURRENT_MESSAGE, message.hash)
        this.$router.push({
          path: `/inbox/${this.$store.getters.address.address}/${message.hash}`
        })
      },
      fetchTransactions () {
        this.$store.dispatch(ACTION_TYPES.FETCH_ADDR_TX)
          .catch(console.warn)
      }
    }
  }
</script>
