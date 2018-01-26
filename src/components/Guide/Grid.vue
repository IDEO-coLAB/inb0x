<!-- *************** Grid ********************
  * inb0x live style guide
 -->

<template>
      <div>
        <h1>Grid System</h1>
        <p>
          There is no need to reinvent the wheel, so inb0x uses sprectre's grid layout. <br />
          Spectre's grid is relatively easy to use. You must start by declaring an opening div with the the class '.container'.
          Inside this div comes another div with the class '.columns', and inside <i>this</i> div comes any sort of grid you want.
          These elements must have the class '.column', followed by the class '.col-*' where * is any number from 1 to 12.
          1 represents 1/12 the width of the page, and 12 represents a full 100% width.
        </p>

        <div class="container" style="border:2px solid blue">
          <div class="columns">
            <div class="column col-6">col-6</div>
            <div class="column col-3">col-3</div>
            <div class="column col-2">col-2</div>
            <div class="column col-1">col-1</div>
          </div>

          <div class="columns col-gapless">
            <div class="column col-6">col-6</div>
            <div class="column col-6">col-6</div>
          </div>

        </div>

        <form>
          <textarea id="code" name="code">function findSequence(goal) {
            function find(start, history) {
              if (start == goal)
                return history;
              else if (start &gt; goal)
                return null;
              else
                return find(start + 5, "(" + history + " + 5)") ||
                       find(start * 3, "(" + history + " * 3)");
            }
            return find(1, "1");
          }
          </textarea>
        </form>

      </div>
</template>

<script>

  export default {

    created() {
      console.log("this is mounted");
      console.log(document.getElementById("code"));

      var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
           lineNumbers: true,
           styleActiveLine: true,
           matchBrackets: true,
           readOnly: 'nocursor'
       });

       console.log(editor);

    }

  }
</script>

<style type="scss" scoped>

  .grid-demo{
    background-color: #00E7C0;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .column{
    background-color: #002D47;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: white;
  }


</style>
