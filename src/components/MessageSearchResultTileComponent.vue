<template>
  <div class="ib-g">

    <div class="ib-data ib-u-2-3">
      Message {{index}} from {{messageObject[0]}}
    </div>

    <div class="ib-u-1-3" @click="toggleMessage(messageObject, $event)">
      Click to {{isExpanded ? 'close' : 'open'}}
    </div>

    <div class="ib-u-1-1" v-show="isExpanded">
      <br>
      <span>{{messageObject[1]}}</span>
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
