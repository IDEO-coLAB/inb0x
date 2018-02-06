<template>
  <div>
    <div @click="toggleMessage(searchObject, $event)">
      <span>{{searchObject.address}} has {{searchObject.amount}} - Click to {{isExpanded ? 'close' : 'open'}}</span>
    </div>
    <div v-show="isExpanded">
      <br>
      <span>Make them an offer</span>
      <br>
      <br>
      <message-reply :recipient="searchObject.address"></message-reply>
      <br>
    </div>
    <hr>
  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import MessageReply from './MessageReply'

  export default {
    components: {
      MessageReply,
    },
    data () {
      return {
        isExpanded: false,
      }
    },
    props: {
      searchObject: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
    },
    methods: {
      toggleMessage (searchObject, event) {
        this.isExpanded = !this.isExpanded
      },
    }
  }
</script>
