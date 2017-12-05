<template>
  <div>
    <div class="row">
      <div class="col-3">
        all messages:
        <br><br>
        <div v-for="message in messages" @click="setCurrentMessage(message, $event)">
          Tx hash: {{message.hash}}
          <hr>
        </div>
      </div>
      <div class="col-9">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import { SET_CURRENT_MESSAGE_ID } from '../constants/mutations'

  export default {
    computed: {
      messages () {
        return _.sortBy(this.$store.getters.messages, 'timeStamp')
      }
    },
    methods: {
      setCurrentMessage (message, event) {
        this.$store.commit(SET_CURRENT_MESSAGE_ID, message.hash)
        this.$router.push({
          path: `/inbox/${this.$store.getters.address}/${message.hash}`
        })
      },
    }
  }
</script>
