<template>
  <div>
    <div @click="toggleMessage(messageObject, $event)">
      <span>Message {{index}}</span> from {{messageObject[0]}} - <span>Click to {{isExpanded ? 'close' : 'open'}}</span>
    </div>
    <div v-show="isExpanded">
      <br>
      <span>{{messageObject[1]}}</span>
      <br>
      <br>
      <compose-component :recipient="messageObject[0]"></compose-component>
      <br>
    </div>
    <hr>
  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import ComposeComponent from './ComposeComponent'

  export default {
    components: {
      ComposeComponent,
    },
    data () {
      return {
        isExpanded: false,
      }
    },
    props: {
      messageObject: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
        required: true
      },
    },
    methods: {
      toggleMessage (messageObject, event) {
        this.isExpanded = !this.isExpanded
      },
    }
  }
</script>
