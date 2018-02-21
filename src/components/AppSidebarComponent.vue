<template>
  <div class="layout-sidebar">
    <div class="layout-sidebar--header"></div>

    <div class="menu">
      <ul class="menu-list">

        <li class="menu-item">
          <router-link class="menu-link"
            :to="{ path: 'tokens', query: { address: $store.getters.search.tokensAddr }}">
            <span class="icon-search u-mr-2"></span>Tokens
          </router-link>
        </li>

        <li class="menu-item">
          <router-link class="menu-link"
            :to="{ path: 'messages', query: { address: $store.getters.search.messagesAddr }}" >
            <span class="icon-mail u-mr-2"></span>Messages
          </router-link>
        </li>

        <li class="menu-item">
          <router-link class="menu-link"
            :to="{ path: 'compose' }" >
            <span class="icon-pencil u-mr-2"></span>Compose
          </router-link>
        </li>

      </ul>
    </div>

  </div>
</template>

<script>
  export default {

  }
</script>
