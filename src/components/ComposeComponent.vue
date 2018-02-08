<template>
  <div>
    <form  v-on:submit="submit">

      <div class="form-group">
        <textarea class="form-input" placeholder="Your message" rows="5" v-model="message"></textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Read Bounty (ETH)</label>
        <input class="form-input" type="number" :placeholder="readBounty" step="0.01" v-model="readBounty" />
      </div>

      <div class="form-group">
        <label class="form-label">Gas for Tx (Units)</label>
        <input class="form-input" type="number" :placeholder="gasPrice" step="1" v-model="gasPrice" />
      </div>

      <div class="form-group">
        <label class="form-label">Gas Limit (GWEI)</label>
        <input class="form-input" type="number" :placeholder="gas" step="1000" v-model="gas" />
      </div>

      <div>
        <button type="submit" @click="submit">Reply to this Message</button>
      </div>


    </form>
  </div>
</template>

<script>
  import web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'

  export default {
    data () {
      return {
        message: '',
        gas: 300000,
        gasPrice: 21,
        readBounty: 0,
        replyBounty: 0, // not used currently
      }
    },
    props: {
      recipient: {
        type: String,
        required: true
      },
    },
    methods: {
      submit (event) {
        event.preventDefault()

        const contract = this.$store.getters.inboxContractObj

        // handle no contract
        // handle no metamask integration

        const sender = this.$store.getters.web3Addr
        const recipient = this.recipient

        const message = this.message
        const readBounty = web3.utils.toWei(this.readBounty.toString())
        const replyBounty = web3.utils.toWei(this.replyBounty.toString())

        const txValue = (Number(replyBounty) + Number(readBounty)).toString()
        const gas = this.gas.toString()
        const gasPrice = web3.utils.toWei(this.gasPrice.toString(), 'gwei')

        // http://web3js.readthedocs.io/en/1.0/web3-eth-contract.html?highlight=.send#methods-mymethod-send
        contract.methods
          .sendMessage(recipient, message, readBounty, replyBounty)
          .send({
            from: sender,
            value: txValue,
            gas,
            gasPrice,
          })
          .then(() => {
            console.log(`Sent from: ${sender}  => to: ${recipient}`)
            console.log(`${message}`)
            console.log(`read bounty: ${readBounty}`)
            console.log(`gas: ${gasPrice}, tx value: ${txValue}`)
          })
          .catch((error) => {
            console.warn('ERROR SENDING', error)
          })
      },
    },
  }
</script>
