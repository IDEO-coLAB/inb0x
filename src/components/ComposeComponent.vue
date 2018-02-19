<template>
  <div>
    <form class="form form-stacked pure-g" v-on:submit="submit">

      <!-- reply box -->
      <div class="pure-u-1-1">
        <label>Compose</label>
        <textarea class="input-1" placeholder="Start typing here..." v-model="message"></textarea>
      </div>

      <!-- transaction inputs -->
      <div class="pure-u-1-1">

        <div class="pure-g">
          <div class="pure-u-1-4 u-pl-0">
            <label>Gas for Tx (Units)</label>
            <input type="number" :placeholder="gasPrice" step="1" v-model="gasPrice" />
          </div>

          <div class="pure-u-1-4">
            <label>Gas Limit (GWEI)</label>
            <input type="number" :placeholder="gas" step="1000" v-model="gas" />
          </div>

          <div class="pure-u-1-2 u-pr-0">
            <button class="btn btn-primary u-float-r u-mt-5" v-show="!isLocked" type="submit" @click="submit">Send</button>
            <button class="btn btn-primary u-float-r u-mt-5" v-show="isLocked">Sending...</button>
          </div>
        </div>

      </div>


    </form>
  </div>
</template>

<script>
  import Web3 from 'web3'
  import { MUTATION_TYPES } from '../constants/mutations'
  import { NOTIFICATION_TYPES } from '../models/notification'

  export default {
    data () {
      return {
        message: '',
        gas: 300000,
        gasPrice: 21,
        readBounty: 0, // not used currently
        replyBounty: 0, // not used currently
      }
    },
    props: {
      // TODO: Possibly pass in text for placeholder and field labels
      recipient: {
        type: String,
        required: true
      },
    },
    computed: {
      isLocked () {
        return this.$store.getters.isLocked
      }
    },
    methods: {
      submit (event) {
        event.preventDefault()
        const contract = this.$store.getters.inboxContractObj

        const sender = this.$store.getters.web3Addr
        const recipient = this.recipient

        const message = this.message
        const readBounty = Web3.utils.toWei(this.readBounty.toString())
        const replyBounty = Web3.utils.toWei(this.replyBounty.toString())

        const txValue = (Number(replyBounty) + Number(readBounty)).toString()
        const gas = this.gas.toString()
        const gasPrice = Web3.utils.toWei(this.gasPrice.toString(), 'gwei')

        this.$store.commit(MUTATION_TYPES.SET_LOCK_STATE, true)

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
            this.$store.commit(MUTATION_TYPES.SET_LOCK_STATE, false)
            console.log(`Sent from: ${sender}  => to: ${recipient}`)
            console.log(`${message}`)
            console.log(`read bounty: ${readBounty}`)
            console.log(`gas: ${gasPrice}, tx value: ${txValue}`)

            const notification = {
              text: `Your message was successfully sent.`,
              type: NOTIFICATION_TYPES.SUCCESS,
            }
            this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)

          })
          .catch((error) => {
            this.$store.commit(MUTATION_TYPES.SET_LOCK_STATE, false)
            console.warn('ERROR SENDING', error)
            const notification = {
              text: `Your message failed to send: ${error.message}`,
              type: NOTIFICATION_TYPES.ERROR,
            }
            this.$store.commit(MUTATION_TYPES.ADD_NOTIFICATION, notification)
          })
      },
    },
  }
</script>
