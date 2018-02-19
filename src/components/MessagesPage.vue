<template>
  <div class="layout-main--page">

    <!-- Search bar -->
    <message-search-component />

    <!-- Search result tiles -->
    <message-search-result-tile-component
      v-show="messages"
      v-for="(message, index) in messages"
      :message-object="message"
      :index="index"
      :key="index" />

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
