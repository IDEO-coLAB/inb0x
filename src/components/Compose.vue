<template>
  <div class="columns col-gapless height-full">

    <!-- Body -->
    <div class="column col-8 page-container">

      <!-- Side nav -->
      <div class="page-side-nav">
        <button class="btn btn-action" @click="exitCompose">
          <i class="icon icon-arrow-left"></i>
        </button>
      </div>

      <!-- Main content -->
      <div class="page-content">



        <form  v-on:submit="submit">

          <!-- Header -->
          <div class="header">
            <div class="header-section">
              <span class="header-content">

                <span class="input-group">
                  <span class="input-group-addon">To</span>
                  <input type="text" class="form-input" v-model="recipient">
                </span>

              </span>
            </div>

            <div class="header-section header-action">
              <span class="header-content">
                <button class="btn btn-action" @click="exitCompose">
                  <i class="icon icon-cross"></i>
                </button>
              </span>
            </div>
          </div>



          <div class="body body-with-header-and-footer">

            <div class="columns">
              <div class="column col-12">

                <div class="section">
                  <div class="form-group">
                    <textarea class="form-input" placeholder="Your message" rows="5" v-model="message"></textarea>
                  </div>
                </div>

                <div class="section">
                  <div class="form-group">
                    <label class="form-label">Message JSON</label>
                    <textarea readonly class="form-input" rows="3" v-model="messageJSON"></textarea>
                  </div>
                </div>

                <div class="section">
                  <div class="form-group">
                    <label class="form-label">Transaction Input Hex</label>
                    <textarea readonly class="form-input" rows="3" v-model="messageHex"></textarea>
                  </div>
                </div>

              </div>
            </div>

          </div>


          <!-- Footer -->
          <div class="footer">
            <div class="footer-section">
              <button class="btn" type="submit">What action here?</button>
            </div>
          </div>



        </form>








      </div>

    </div>

  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'

  export default {
    data () {
      return {
        recipient: null,
        message: '',
      }
    },
    methods: {
      exitCompose (event) {
        event.preventDefault()
        this.$router.go(-1)
      },
      submit (event) {
        event.preventDefault()
        console.log('Submitted =>', event, this.messageHex)
        console.log('HEX => ', this.messageHex)
      },
    },
    computed: {
      messageJSON () {
        return JSON.stringify({
          eam: { message: this.message }
        })
      },
      messageHex () {
        return web3.utils.toHex(this.messageJSON)
      }
    },
  }
</script>
