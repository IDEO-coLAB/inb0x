<!-- *************** Grid ********************
  * inb0x live style guide
 -->

<template>
      <div>
        <h1>Grid System</h1>
        <p>
          There is no need to reinvent the wheel, so inb0x uses sprectre's grid layout. <br />
          Below is an example of how to use spectres grid to layout the general idea of inb0x's design.
        </p>

        <div class="container" style="border: 1px solid #444444">
          <div class="columns">
            <div class="column col-9">
              <div class="columns">
                  <div class="column col-2 nav-item underline">
                    Inbox
                  </div>
                  <div class="column col-2 nav-item nav-item-inactive">
                    Search
                  </div>
                  <div class="column col-2 nav-item nav-item-inactive">
                    Segments
                  </div>
              </div>

              <div class="columns">
                <input class="searchbar searchbar-inbox column col-12" />
              </div>

              <div class="columns">
                <div class="column col-1 message">1</div>
                <div class="column col-2 message">inbox.eth</div>
                <div class="column col-4 message">hello i am trying to test...</div>
                <div class="column col-2 message">0.1 eth</div>
                <div class="column col-2 message">1/19/17</div>
                <div class="column col-1 message">v</div>
              </div>

              <div class="columns">
                <div class="column col-1 message">1</div>
                <div class="column col-2 message">inbox.eth</div>
                <div class="column col-4 message">hello i am trying to test...</div>
                <div class="column col-2 message">0.1 eth</div>
                <div class="column col-2 message">1/19/17</div>
                <div class="column col-1 message">v</div>
              </div>

              <div class="columns">
                <div class="column col-1 message">1</div>
                <div class="column col-2 message">inbox.eth</div>
                <div class="column col-4 message">hello i am trying to test...</div>
                <div class="column col-2 message">0.1 eth</div>
                <div class="column col-2 message">1/19/17</div>
                <div class="column col-1 message">v</div>
              </div>

              <div class="columns">
                <div class="column col-1 message">1</div>
                <div class="column col-2 message">inbox.eth</div>
                <div class="column col-4 message">hello i am trying to test...</div>
                <div class="column col-2 message">0.1 eth</div>
                <div class="column col-2 message">1/19/17</div>
                <div class="column col-1 message">v</div>
              </div>

              <div class="columns">
                <div class="column col-1 message">1</div>
                <div class="column col-2 message">inbox.eth</div>
                <div class="column col-4 message">hello i am trying to test...</div>
                <div class="column col-2 message">0.1 eth</div>
                <div class="column col-2 message">1/19/17</div>
                <div class="column col-1 message">v</div>
              </div>

              <div class="columns">
                <div class="column col-1 message">1</div>
                <div class="column col-2 message">inbox.eth</div>
                <div class="column col-4 message">hello i am trying to test...</div>
                <div class="column col-2 message">0.1 eth</div>
                <div class="column col-2 message">1/19/17</div>
                <div class="column col-1 message">v</div>
              </div>


            </div>

            <div class="column col-3">
              <div style="background-color: #F7F9FB; width: 100%; height: 300px;"></div>
              <div style="background-color: #002D47; width: 100%; height: 200px;"></div>
            </div>
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

  .searchbar{
    margin: 10px 0;
  }

  .tables{
    height: calc(100% - 100px);
    border: 2px solid red;
  }

  .sidenav{
    display: flex;
    flex-direction: column;
  }

  .sidenav-top{
    background-color: #F7F9FB;
    height: 60%;
    width: 100%;
  }

  .sidenav-bottom{
    background-color: #002D47;
    height: 40%;
    width: 100%;
  }

  .grid-demo{
    background-color: #00E7C0;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }



</style>
