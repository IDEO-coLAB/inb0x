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
                    <label class="form-label">Amount to Send</label>
                    <input class="form-input" type="number" placeholder="0.0" step="0.01" v-model="txAmount" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Gas Limit</label>
                    <input class="form-input" type="number" placeholder="0.0" step="0.01" v-model="gasLimit" />
                  </div>
                </div>

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
        txAmount: 0,
        gasLimit: 0,
      }
    },
    // mounted () {
    //   if (!_.isUndefined(web3)) {
    //     // Use Mist/MetaMask's provider
    //     const prov = new Web3(web3.currentProvider)
    //     console.log('prov', prov)
    //     console.log('prov', prov.eth.accounts)


    //     // web3.version.getNetwork((err, netId) => {console.log(err, netId)})
    //     // console.log('prov', )
    //     // this.$store.commit(MUTATION_TYPES.UPDATE_WEB3_PROVIDER, prov)
    //   }
    // },
    methods: {
      exitCompose (event) {
        event.preventDefault()
        this.$router.go(-1)
      },
      submit (event) {
        event.preventDefault()
        console.log('Submitted =>', event, this.messageHex)
        console.log('HEX => ', this.messageHex)

        this.web3Provider.eth.sendTransaction({
          to: '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A',
          from: '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A',
          value: '1',
          data: 'this is something'
        }, (err, data) => console.log(err, data))
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
      },
      web3Provider () {
        return this.$store.getters.web3.provider
      }
    },
  }
</script>
