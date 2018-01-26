<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Atomic Components</h1>
    <p>
      The best way to think about creating components using the inb0x library is by following the atomic structure found <a href="http://atomicdesign.bradfrost.com/table-of-contents/">here</a>.
    </p>

    <codemirror v-model="code" :options="cmOptions"></codemirror>
    <codemirror v-model="code2" :options="cmOptions"></codemirror>

  </div>

</template>

<script>

  import { codemirror } from 'vue-codemirror'

  export default {
    data () {
      return {
        code: 'const a = 10',
        code2: '<html></html>',
        cmOptions: {
          // codemirror options
          tabSize: 4,
          mode: 'text/javascript',
          theme: 'base16-dark',
          lineNumbers: true,
          line: true,
          readOnly: true,
        }
      }
    },
    components: {
      codemirror
    }
  }
</script>

<style type="scss" scoped>

.message{
  background-color: #F7F9FB;
  padding: 10px 0;
  margin: 5px 0;
}


.border{
  border: 2px solid black;
}


</style>
