<template>
  <div>
    <form  v-on:submit="submit">

      <div class="form-group">
        <label class="form-label">Read Bounty</label>
        <input class="form-input" type="number" placeholder="0.0" step="0.01" v-model="txAmount" />
      </div>

      <div class="form-group">
        <label class="form-label">Reply Bounty</label>
        <input class="form-input" type="number" placeholder="0.0" step="0.01" v-model="gasLimit" />
      </div>

      <div class="form-group">
        <textarea class="form-input" placeholder="Your message" rows="5" v-model="message"></textarea>
      </div>

      <div>
        <button type="submit" @click="submit">Reply to this Message</button>
      </div>


    </form>
  </div>
</template>

<script>
  import web3 from 'web3'
  import web3Utils from 'web3-utils'
  import { MUTATION_TYPES } from '../constants/mutations'

  export default {
    data () {
      return {
        message: '',
        txAmount: 0,
        gasLimit: 0,
      }
    },
    props: {
      recipient: {
        type: String,
        required: true
      },
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
      submit (event) {
        event.preventDefault()


        const contract = this.$store.getters.inboxContractObj



        // if (!contract) console.warn('NO CONTRACT!')
        //   return


        var send_to = this.recipient
        var message = this.message
        var readBounty = 0.001
        var replyBounty = 0.001
        const value = (readBounty+replyBounty).toString()

        console.log(send_to, message, readBounty, replyBounty)

        contract.methods
          .sendMessage(send_to, message, readBounty, replyBounty)
          .send({
            from: this.$store.getters.web3AccountId,
            value: web3Utils.toWei(value),
            gas: 3000000,
          })
          .then(() => {
            console.log('SENT!!!')
          })
          .catch((error) => {
            console.warn('ERROR SENDING', error)
          })




        // console.log('Submitted =>', event, this.messageHex)
        // console.log('HEX => ', this.messageHex)

        // this.web3Provider.eth.sendTransaction({
        //   to: '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A',
        //   from: '0x7dDEcE90E00785c97daFe08dF75f61786Fa4d47A',
        //   value: '1',
        //   data: 'this is something'
        // }, (err, data) => console.log(err, data))
      },
    },
    computed: {
      web3Provider () {
        return this.$store.getters.web3Provider
      }
    },
  }
</script>
