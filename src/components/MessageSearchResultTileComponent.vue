<template>
  <div class="list-tile pure-g">

      <div class="pure-u-2-5 list-tile-content">
        {{messageObject[0]}}
      </div>

      <div class="pure-u-3-5 list-tile-content">
        {{messageObject[1]}}
        <span class="icon-collapse-arrow u-float-r" @click="toggleMessage(messageObject, $event)"></span>
      </div>


      <div class="pure-u-1-1" v-show="isExpanded">
        <div class="u-p-3">

          <!-- TODO: Swap out when replying vs. reading -->
          <!-- TODO: Clean up the HTML in here possibly? -->

          <!-- Show when reading (how does one cancel the compose?) -->
          <div class="pure-g u-my-4">
            <div class="pure-u-1-1">
              <label>Message</label>
            </div>
            <div class="pure-u-1-1">
              <p>{{messageObject[1]}}</p>
            </div>
          </div>

          <!-- Show when composing -->
          <compose-component :recipient="messageObject[0]" />

        </div>
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
