<template>
  <div class="list-tile pure-g">

      <div class="pure-u-2-5 list-tile-content">
        <span>{{messageObject[0]}}</span>
      </div>

      <div class="pure-u-3-5 list-tile-content">
        <span>{{messageObject[1]}}</span>
        <span class="icon-collapse-arrow u-float-r" @click="toggleMessage(messageObject, $event)"></span>
      </div>


      <div v-show="isExpanded">
        <div class="u-p-3">

          <!-- TODO: Swap out when replying vs. reading -->

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
          <compose-component :recipient="messageObject[0]"></compose-component>
          <br>
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
        console.log('Toggling')
        this.isExpanded = !this.isExpanded
      },
    }
  }
</script>
