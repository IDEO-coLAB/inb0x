<template>
  <div class="ib-data ib-g">

    <div class="ib-data-field ib-u-22-24">
      <span class="ib-message-data-text u-pr-2">Message</span> {{index}} <span class="ib-message-data-text u-plr-2">from</span> {{messageObject[0]}}
    </div>

    <div class="ib-data-field ib-u-1-24 ib-message-data-text" @click="toggleMessage(messageObject, $event)">
      {{isExpanded ? 'close' : 'open'}}
    </div>
    <div class="ib-u-1-24">
      <span class="ib-icon-collapse-arrow u-plr-1"></span>
    </div>

    <div class="ib-u-1-1" v-show="isExpanded">
      <br>
      <span class="ib-data-message ib-message-text">{{messageObject[1]}}</span>
      <br>
      <br>
      <compose-component :recipient="messageObject[0]"></compose-component>
      <br>
    </div>

  </div>
</template>

<script>
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
