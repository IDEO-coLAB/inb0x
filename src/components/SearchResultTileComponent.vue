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
      <compose-component :recipient="searchObject.address"></compose-component>
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
