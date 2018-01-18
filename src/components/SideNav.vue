<!-- *************** SideNav ********************
  * Sidenav stays on the side of the page and toggles between views.
  * status: incomplete.
 -->

<template>
  <div class="sidenav">
    <div class="sidenav--item">
      <div class="sidenav--item-icon"></div>
      <span class="sidenav--item-label">Search</span>
    </div>
    <div class="sidenav--item">
      <div class="sidenav--item-icon"></div>
      <span class="sidenav--item-label">Read</span>
    </div>
  </div>

</template>

<script>

  export default {
    data () {
      return {
      }
    }
  }

</script>


<style type="scss" scoped>

  .sidenav{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sidenav--item{
    margin-top: 2rem;
  }

  .sidenav--item-icon{
    background-color: #DCE7EF;
    height: 50px;
    width: 50px;
    border-radius: 100px;
  }

  .sidenav--item-label{
    color: white;
    font-size: 14px;
    text-align: center;
    margin: .2rem auto;
    display: block;
  }

</style>
