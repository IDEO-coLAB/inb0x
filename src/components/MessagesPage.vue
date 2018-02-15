<template>
  <div class="main-body">

    <message-search-component />

    <div class="ib-content">
      <message-search-result-tile-component
        v-show="messages"
        v-for="(message, index) in messages"
        :message-object="message"
        :index="index"
        :key="index" />
    </div>

    <div class="body-footer">
      Some messages footer :)
    </div>

  </div>
</template>

<script>
  import MessageSearchComponent from './MessageSearchComponent'
  import MessageSearchResultTileComponent from './MessageSearchResultTileComponent'

  export default {
    components: {
      MessageSearchComponent,
      MessageSearchResultTileComponent,
    },
    computed: {
      messages () {
        return this.$store.getters.messageList
      },
    },
  }
</script>
