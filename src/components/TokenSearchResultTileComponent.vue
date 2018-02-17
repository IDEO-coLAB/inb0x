<template>
  <div class="ib-data-container" >
    <div class="ib-data ib-g">
      <div class="ib-data-field ib-u-22-24">
        <span>{{searchObject.address}} <span class="ib-message-data-text u-plr-2">has</span> {{searchObject.amount}}</span>
      </div>

      <div class="ib-data-field ib-u-1-24 ib-message-data-text" @click="toggleMessage(searchObject, $event)">
        {{isExpanded ? 'close' : 'open'}}
      </div>
      <div class="ib-u-1-24">
        <span class="ib-icon-collapse-arrow u-plr-1 u-f-r"></span>
      </div>

      <div class="ib-u-1-1" v-show="isExpanded">
        <br>
        <span class="ib-message-data-text">Send this token holder a message</span>
        <br>
        <br>
        <compose-component :recipient="searchObject.address"></compose-component>
        <br>
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
