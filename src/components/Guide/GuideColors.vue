<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Colors</h1>
    <p>
      Below are swatches of colors inb0x uses. The color global values can be found in palette.scss. Click on each swatch to copy it's hex value.
    </p>

    <div class="grid-container">
      <div class="bg-1 swatch swatch-dark col3">#002D47</div>
      <div class="bg-2 swatch col3">#00E7C0</div>
      <div class="bg-3 swatch col3">#F7F9FB</div>
      <div class="swatch col3" style="border: 1px solid black;">#FFFFFF</div>
    </div>

  </div>

</template>

<script>

  export default {

  }
</script>

<style type="scss" scoped>

.swatch{
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.swatch-dark{
  color: white;
}

.bg-1{ background-color: #002D47; }
.bg-2{ background-color: #00E7C0; }
.bg-3{ background-color: #F7F9FB; }

</style>
