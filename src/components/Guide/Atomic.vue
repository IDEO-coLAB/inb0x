<!-- *************** Components ********************
  * inb0x live style guide
 -->

<template>
  <div>
    <h1>Atomic Components</h1>
    <p>
      The best way to think about creating components using the inb0x library is by following the atomic structure found <a href="http://atomicdesign.bradfrost.com/table-of-contents/">here</a>.
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

  </div>

</template>

<script>

  export default {

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
