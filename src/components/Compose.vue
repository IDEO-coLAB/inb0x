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
                    <label class="form-label">Read Bounty</label>
                    <input class="form-input" type="number" placeholder="0.0" step="0.01" v-model="txAmount" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Reply Bountry</label>
                    <input class="form-input" type="number" placeholder="0.0" step="0.01" v-model="replyBounty" />
                  </div>
                </div>

                <div class="section">
                  <div class="form-group">
                    <textarea class="form-input" placeholder="Your message" rows="5" v-model="message"></textarea>
                  </div>
                </div>

                <div v-on:click="submitOnContract">
                  submit
                </div>

              </div>
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
        replyBounty: null,
        txAmount: 0,
        gasLimit: 0,
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

        this.web3Provider.eth.sendTransaction({
          to: '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A',
          from: '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A',
          value: '1',
          data: 'this is something'
        }, (err, data) => console.log(err, data))
      },
      submitOnContract (event) {
        // im p sure theres a defualt vue thing for prevent default
        event.preventDefault();

        const inbox = this.$store.state.appState.contractObject;
        const web3  = this.$store.state.web3Provider.web3Provider;
        const addr = this.$store.state.appState.web3AccountId;

        const sendamt = (parseFloat(this.txAmount)+parseFloat(this.replyBounty)).toString();

        // it is claiming there are errors, but it's also working?
        inbox.methods.sendMessage(this.recipient, this.message, parseFloat(this.txAmount), parseFloat(this.replyBounty))
        .send({from:addr, value:web3.utils.toWei(sendamt), gas:3000000})
        .then(function(error,result) {
          if (!error){
            console.log("worked");
           }
          else {
             console.error(error);
            }
        });

      }
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
        return this.$store.getters.web3Provider
      }
    },
  }
</script>
