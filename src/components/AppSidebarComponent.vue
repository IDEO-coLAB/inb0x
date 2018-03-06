<template>
  <div class="layout-sidebar" id = "main-sidebar">
    <div class="layout-sidebar--header">
      <span class="icon-arrow--right u-mr-2" v-on:click="closeNav()" ></span>
    </div>

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

    methods: {
      openNav: function (event){
        alert('Open nav');
      },
      closeNav: function (event){
        document.getElementsByClassName("layout-sidebar")[0].style.width = "50px";
        document.getElementsByClassName("layout-main")[0].style.width = "calc(100% - 50px)";
        
      }
    }
  }
</script>
