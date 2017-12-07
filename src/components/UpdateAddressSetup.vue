<template>
  <div>
    <h1>New Address Setup</h1>
    <br>
    <p>How many eth will you charge to read a message?</p>
    <input v-model="threshold" type="number" placeholder="input an amount">
    <br><br>
    USD price to read a message: ${{Number(price * threshold).toFixed(2)}}
    <br><br>
    EAM Definition: {{eamDefinition}}
    <br><br>
    Copy this hex for your transaction: {{inputHex}}
  </div>
</template>

<script>
  import web3 from 'web3'
  import axios from 'axios'
  import { etherPriceUrl } from '../constants/urls'
  // TODO: fetch real time price to read emails

  export default {
    mounted () {
      axios.get(etherPriceUrl)
        .then((result) => {
          this.price = result.data.result.ethusd
        })
        .catch(console.log)
    },
    data () {
      return {
        price: null,
      }
    },
    computed: {
      threshold () {
        let price = 0.02
        if (this.$store.getters.eam) {
          price = this.$store.getters.eam.valueThreshold
        }
        return price
      },
      eamDefinition () {
        const eamDefinition = {
          mei: {
            version: '0.0.1',
            eth_amount: this.threshold,
          }
        }
        return JSON.stringify(eamDefinition)
      },
      inputHex () {
        const hex = web3.utils.toHex(this.eamDefinition)
        return hex
      }
    },
    components: {},
  }
</script>
