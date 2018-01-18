<template>
  <!-- <div class="tile" @click="setCurrentMessage(message, $event)">
    <div class="tile-content">
      <span v-wei-to-eth="message.value"></span> Eth
    </div>
    <div class="tile-content">
      <strong>{{messageSize}} bytes</strong> from {{message.from}}
    </div>
    <div class="tile-content text-uppercase-light">
      {{message.time.format('MMM D Y')}}
    </div>
  </div> -->

  <div class="message-item" @click="setCurrentMessage(message, $event)">
    <div class="message-item--header">
      <p class="message-item--header--addr">{{message.from}}</p>
      <p class="message-item--header--bounty"><span v-wei-to-eth="message.value"></span> ETH</p>
      <p class="message-item--header--date">{{message.time.format('MMM D Y')}}</p>
    </div>
    <p class="message-item--text" v-hex-to-ascii="message.input"></p>
  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import weiToEth from '../directives/wei-to-eth'
  import hexToAscii from '../directives/hex-to-ascii'

  export default {
    directives: {
      weiToEth,
      hexToAscii,
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
        this.$store.commit(MUTATION_TYPES.UPDATE_MSG_ID, message.hash)
        this.$router.push({
          path: `/inbox/${this.$store.getters.inboxAccountId}/${message.hash}`
        })
      },
    }
  }
</script>

<style lang="scss" scoped>

  .message-item{
    background-color: #F7F9FB;
    padding: 1rem;
    margin-top: 2rem;
    box-shadow: 0;
    transition: box-shadow 0.3s ease-in-out;
  }

  .message-item--text{
    margin: 0;
    color: #022B43;
  }

  .message-item:hover{
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.50);
  }

  .message-item--header{
    display: flex;
    font-size: .7rem;
    color: #89969F;
  }

  .message-item--header p:first-child{
    flex: 1;
  }

  .message-item--header p:last-child{
    margin-left: 10px;
  }

</style>
