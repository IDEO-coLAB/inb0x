<template>
  <div class="app-container pure-g">
    <div class="main pure-u-1">

      <!-- turn into header component -->
      <div class="main-header">some header logo</div>
      <!-- turn into header component -->

      <router-view></router-view>
    </div>

    <div class="sidebar pure-u-1">
      CUR ROUTE: <br> {{$router.currentRoute.name}}
      <br>
      <br>
      <router-link
        :to="{ path: 'tokens', query: { address: $store.getters.search.tokensAddr }}">TOKENS</router-link>
      <br>
      <br>
      <router-link
        :to="{ path: 'messages', query: { address: $store.getters.search.messagesAddr }}">MESSAGES</router-link>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Web3 from 'web3'

  import inboxABI from './ethereum/inbox-abi'
  import { MUTATION_TYPES } from './constants/mutations'
  import { ACTION_TYPES } from './constants/actions'
  import { Notification, NOTIFICATION_TYPES } from './models/notification'
  import testRouteForAddress from './utils/route-utils'

  export default {
    components: {},
    beforeCreate () {
      console.log('\n\n\n=================================')
      console.log('MESSAGES ADDR:')
      console.log('0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      console.log('CONTRACT ADDR:')
      console.log('0xf230b790e05390fc8295f4d3f60332c93bed42e2')
      console.log('=================================\n\n\n')

      // this.$router.push('/messages?address=0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A')
      // this.$router.push('/messages?address=somethingBogus')
      // this.$router.push('/search?address=somethingnotGood')
      // this.$router.push('/search?address=0xf230b790e05390fc8295f4d3f60332c93bed42e2')
    },
    mounted () {
      // TODO: abstract this section into cleaner code when better understood
      // TODO: abstract this section into cleaner code when better understood
      // TODO: abstract this section into cleaner code when better understood

      const provider = new Web3(window.web3.currentProvider)
      this.$store.commit(MUTATION_TYPES.SET_WEB3_PROVIDER, provider)

      // Store the contract interface so we can interact with it directly
      const inboxContract = new provider.eth.Contract(inboxABI, this.$store.getters.inboxContractAddr)
      this.$store.commit(MUTATION_TYPES.SET_INBOX_CONTRACT_OBJ, inboxContract)

      console.log('JUST SET THE INBOX CONTRACT OBJECT')

      testRouteForAddress(this.$router, this.$store)


      // If web3 is defined metamask is installed, set up the app's web3 provider
      if (!_.isUndefined(window.web3)) {

        // This is why we poll
        // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
        const interval = setInterval(() => {
          provider.eth.getAccounts()
            .then((accounts) => {
              const curWeb3Addr = this.$store.getters.web3Addr
              const newWeb3Addr = _.first(accounts)

              if (!newWeb3Addr) return

              if (!curWeb3Addr) {
                this.$store.commit(MUTATION_TYPES.SET_WEB3_ADDR, newWeb3Addr)
                console.log('JUST SET THE WEB3 ID')
              }

              if (curWeb3Addr !== newWeb3Addr) {
                this.$store.commit(MUTATION_TYPES.SET_WEB3_ADDR, newWeb3Addr)
                console.log('JUST SET THE WEB3 ID')
              }
            })
            .catch((error) => {
              console.error('WEB 3 ERROR!', error)
              console.error('DECIDE HOW TO HANDLE THESE')
              // something outside will need to kick this thing off again if there is an error
              clearInterval(interval)
            })


        }, 2000)
      }

      // TODO: handle global info state and errors
      else {
        const note = new Notification({
          description: 'This is some descriptive text for the notification.',
          type: NOTIFICATION_TYPES.INFO,
          actions: [{
            name: 'action name',
            fn: () => console.log('clicked an action in the notification'),
          }],
          onClose: () => console.log('clicked close')
        })
        console.log(note)
        this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, note)
      }
    },
    watch: {
      '$route' (to, from) {
        testRouteForAddress(this.$router, this.$store)
      },
    },
  }
</script>

<style lang="css">
  @import "styles/inbox/inbox.css"
</style>
