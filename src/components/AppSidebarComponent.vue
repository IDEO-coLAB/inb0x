<template>
  <div class="layout-sidebar" id = "main-sidebar">
    <div class="layout-sidebar--header">
      
      <span class="icon-arrow--right " v-on:click="closeNav()" id="nav-close" style="display:none;"></span>
      <span class="icon-arrow--left " v-on:click="openNav()" id="nav-open" ></span>
      
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
        document.getElementById("nav-close").style.display = "none";
        document.getElementById("nav-open").style.display = "block";
        document.getElementsByClassName("layout-sidebar")[0].style.width = "50px";
        document.getElementsByClassName("layout-main")[0].style.width = "calc(100% - 50px)";
      },
      openNav: function (event){
        document.getElementById("nav-open").style.display = "none";
        document.getElementById("nav-close").style.display = "block";
        document.getElementsByClassName("layout-sidebar")[0].style.width = "250px";
        document.getElementsByClassName("layout-main")[0].style.width = "calc(100% - 250px)";
      }
    }
  }
</script>
