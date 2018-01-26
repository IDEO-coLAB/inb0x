<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Colors</h1>
    <p>
      Below are swatches of colors inb0x uses. The color global values can be found in palette.scss. Click on each swatch to copy it's hex value.
    </p>

    <h3>Base Colors</h3>

    <div class="container">
      <div class="columns">
        <div class="column col-3 bg-1 swatch swatch-dark">#002D47<br />$color-blue-dark</div>
        <div class="column col-3 bg-3 swatch">#F7F9FB<br />$color-blue-light</div>
        <div class="column col-3 bg-2 swatch">#00E7C0<br />$color-green</div>
        <div class="column col-3 swatch" style="border: 1px solid black;">#FFFFFF<br />$white</div>
      </div>
    </div>

    <h3 style="margin-top: 75px;">Text Colors</h3>

    <div class="container">
      <div class="columns">
        <div class="column col-3 swatch" style="background-color: #444; color: white;">#444444<br />$color-text</div>
        <div class="column col-3 swatch" style="background-color: #CBCCCF; color: white;">(opacity .3)<br />$color-text-inactive</div>
        <div class="column col-3 swatch" style="background-color: #525860; color: white;">#525860<br />$color-text-grey</div>
        <div class="column col-3 swatch" style="background-color: #89969F; color: white;">#89969F<br />$color-text-blue</div>
      </div>
    </div>

  </div>

</template>

<script>

  export default {

  }
</script>

<style type="scss" scoped>

.swatch{
  line-height: 40px;
  text-align: center;
}

.swatch-dark{
  color: white;
}

.bg-1{ background-color: #002D47; }
.bg-2{ background-color: #00E7C0; }
.bg-3{ background-color: #F7F9FB; }

</style>
