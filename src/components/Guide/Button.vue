<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Button</h1>
    <p>
      Below are the button types used throughout inb0x. Buttons are created with the html button element given the class .button.
       To modify the button, give it one of the classes below.
    </p>

    <div class="grid-container">
      <button type="button" name="button" class="button button-main">.button-main</button>
      <button type="button" name="button" class="button button-dark">.button-dark</button>
      <button type="button" name="button" class="button button-dark button-inactive">.button-inactive</button>
    </div>


  </div>

</template>

<script>

  export default {

  }
</script>

<style type="scss" scoped>

/*.button{
border-radius: 5px;
font-size: .75rem;
padding: .6rem 1.2rem;
letter-spacing: 0;
border:none;
}

.button-main{background-color: #00E6C0;}
.button-dark{background-color: #002D47; color: #FFF;}
.button-inactive{opacity: .3;}*/


</style>
