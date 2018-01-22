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
                    <label class="form-label">tx amount</label>
                    <input class="form-input" type="number" placeholder="0.0" step="0.01" v-model="txAmount" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Reply Bountry</label>
                    <input class="form-input" type="number" placeholder="0.0" step="0.01" v-model="replyBounty" />
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

                <div v-on:click="submitOnContract">
                  submit
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
        replyBounty: null,
        txAmount: 0,
        gasLimit: 0,
      }
    },
    created () {

      // the only way I could get this going was creating a new web3 instance.
      // I checked in the main app instance, and there was a web3 init, but im
      // not sure it was working. This will do for now.
      // we should also set it up to be production (joes server) and test (testrpc)


      //TODO: abstract this web3 initialization to the main view.

      // this web3 instance is using testrpc
      var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

      var inboxContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_recipient","type":"address"}],"name":"getInbox","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"revokeReplyBounty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"revokeReadBounty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_recipient","type":"address"},{"name":"_index","type":"uint256"}],"name":"getMessage","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_mNumber","type":"uint256"},{"name":"_didReply","type":"bool"}],"name":"readMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_messageText","type":"string"},{"name":"_readBounty","type":"uint256"},{"name":"_replyBounty","type":"uint256"}],"name":"sendMessage","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"confirmReply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);

      var inbox = inboxContract.at("0xc4088c9bc6a7929c0c30ccd322fc41032292f5da");

    },
    // MetaMask code scratch...to be used soon :)
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
      submitOnContract (event) {
        // im p sure theres a defualt vue thing for prevent default
        event.preventDefault();

        var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

        var inboxContract = web3.eth.contract([{"constant":true,"inputs":[{"name":"_recipient","type":"address"}],"name":"getInbox","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"revokeReplyBounty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"revokeReadBounty","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_recipient","type":"address"},{"name":"_index","type":"uint256"}],"name":"getMessage","outputs":[{"name":"","type":"address"},{"name":"","type":"string"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"},{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_mNumber","type":"uint256"},{"name":"_didReply","type":"bool"}],"name":"readMessage","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_messageText","type":"string"},{"name":"_readBounty","type":"uint256"},{"name":"_replyBounty","type":"uint256"}],"name":"sendMessage","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_recipient","type":"address"},{"name":"_mNumber","type":"uint256"}],"name":"confirmReply","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]);

        /*


        UPDATE THE CONTRACT ADDRESS EACH TIME!!! VERY IMPORTANT FOR TESTING.


        */
        var inbox = inboxContract.at("0xa9270baa07bf29bda83f07ad4792749c2636114b");
        console.log(inbox);

        /*


        MAKE SURE THE ABOVE STATEMENT IS UP TO DATE!!


        */


        inbox.sendMessage(this.recipient, this.message, parseFloat(this.txAmount), parseFloat(this.replyBounty), {from:web3.eth.accounts[0], value:web3.toWei(parseFloat(this.txAmount)+parseFloat(this.replyBounty)), gas:3000000 }, function(error, result) {
            if (!error){
                console.log("worked")
              }
            else
                console.error(error)
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
