<template>
  <div class="list-tile pure-g">

    <div class="pure-u-2-5 list-tile-content">
      {{searchObject.address}}
    </div>

    <div class="pure-u-2-5 list-tile-content">
      {{searchObject.amount}}
    </div>

    <div class="pure-u-1-5 list-tile-content">
      {{searchObject.percentage}}
      <span class="icon-collapse-arrow u-float-r" @click="toggleMessage(searchObject, $event)"></span>
    </div>

    <div class="pure-u-1-1" v-show="isExpanded">
      <div class="u-p-3">
        <compose-component :recipient="searchObject.address"></compose-component>
      </div>
    </div>

  </div>
</template>

<script>
  import Web3 from 'web3'
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
