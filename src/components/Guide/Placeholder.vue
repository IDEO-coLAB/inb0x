<!-- *************** Grid ********************
  * inb0x live style guide
 -->

<template>
      <div>
        <h1>Placeholders</h1>
        <p>
          Placeholders are used to populate empty states. This could be when there are no messages in an inb0x,
           or when someone has not yet entered an adderess to search for.
        </p>
        <div class="section">
          <div class="placeholder">
            <div class="">
              <img src="../../assets/mailbox.png" alt="">
              <h6 class="caps">No address entered</h6>
              <p>Here you can check the contents of Inb0xes. They could be yours, or anyone’s.
                 Keep in mind that any sensitive content should be sent in private messages!</p>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="placeholder">
            <div class="">
              <img src="../../assets/search.png" alt="">
              <h6 class="caps">Enter search term to begin</h6>
              <p>The search tool allows you to find new people to message.
                 Have some tokens you want to buy or trade for? Search for them to get started!</p>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="placeholder">
            <div class="">
              <img src="../../assets/segments.png" alt="">
              <h6 class="caps">No address entered</h6>
              <p>Segments help you define audiences to send bulk messages to. Launching a new product?
                 Try creating a segment to search for holders of the token your application uses!</p>
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

  .placeholder{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 800px;
    background-color: #F7F9FB;
  }

  .placeholder img{
    display: block;
    max-width: 500px;
    max-height: 500px;
    margin: 0 auto;
  }

  .placeholder h6{
    text-align: center;
    font-weight: 300;
    font-size: 11px;
    margin: 50px 0 10px 0;
  }

  .placeholder p{
    max-width: 70%;
    margin: 0 auto;
    font-weight: 300;
    font-size: 18px;
    text-align: center;
  }


</style>
