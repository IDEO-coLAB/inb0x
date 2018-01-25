<!-- *************** GUIDE NAV ********************
  * inb0x live style guide
 -->

<template>
  <div class="">
    <h3 class="nav--header">Getting Started</h3>
    <a href="#/guide/"><h6 class="nav--item">Introduction</h6></a>
    <a href="#/guide/atomic"><h6 class="nav--item nav--item-last">Atomic Design</h6></a>

    <h3 class="nav--header">Basics</h3>
    <a href="/#/guide/typography"><h6 class="nav--item">Typeography</h6></a>
    <a href="/#/guide/colors"><h6 class="nav--item">Colors</h6></a>
    <a href="/#/guide/grid"><h6 class="nav--item">Images</h6></a>
    <a href="/#/guide/grid"><h6 class="nav--item">Grid System</h6></a>
    <a href="/#/guide/grid"><h6 class="nav--item nav--item-last">Utilities</h6></a>

    <h3 class="nav--header">Components</h3>
    <a href="/#/guide/button"><h6 class="nav--item">Buttons</h6></a>
    <a href="/#/guide/button"><h6 class="nav--item">Tags</h6></a>
    <a href="/#/guide/forms"><h6 class="nav--item">Forms</h6></a>
    <a href="/#/guide/button"><h6 class="nav--item">Navigation</h6></a>
    <a href="/#/guide/button"><h6 class="nav--item nav--item-last">Cards</h6></a>



  </div>
</template>

<script>


  export default {

  }
</script>

<style type="scss" scoped>

      .border{
        border: 2px solid black;
      }

      a{
        text-decoration: none;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6{
        color: #042D45;
      }

      h4,
      h5,
      h6{
        opacity: .7;
      }

      h6{
        font-size: 1rem;
        padding: .3rem;
      }

      h1{
        font-size: 1.8rem;
        font-family: larish;
        margin-bottom: 20px;
      }

      p{
        margin-bottom: 40px;
      }

      .nav--header{
        font-size: 1.1rem;
      }

      .nav--item{
        font-size: .85rem;
      }

      .nav--item:hover{
        background-color: #DCE7EF;
      }

      .nav--item-last{
        margin-bottom: 20px;
      }

      .grid-demo{
        background-color: #00E7C0;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }

</style>
