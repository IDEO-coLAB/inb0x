<template>
  <div class="pure-g">

    <div class="pure-u-2-3">
      <span>{{searchObject.address}} has {{searchObject.amount}}</span>
    </div>

    <div class="pure-u-1-3" @click="toggleMessage(searchObject, $event)">
      Click to {{isExpanded ? 'close' : 'open'}}
    </div>

    <div class="pure-u-1-1" v-show="isExpanded">
      <br>
      <span>Make them an offer</span>
      <br>
      <br>
      <compose-component :recipient="searchObject.address"></compose-component>
      <br>
    </div>

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
