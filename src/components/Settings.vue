<template>
  <div class="columns col-gapless height-full">

    <!-- Body -->
    <div class="column col-12 page-container">

      <!-- Main content -->
      <div class="page-content">


        <!-- Header -->
        <div class="header">
          <div class="header-section">
            <span class="header-content">

              <ul class="breadcrumb">
                <li class="breadcrumb-item">
                  <samp @click="linkTo(`/inbox/${currentAddressId}`)">inb0x</samp>
                </li>
                <li class="breadcrumb-item">
                  Settings
                </li>
              </ul>

            </span>
          </div>
        </div>


        <div class="body body-with-header-and-footer">

          <div class="columns">
            <div class="column col-12">

              <div class="section">
                <div class="form-group">
                  <label class="form-label">Required Eth Amount in Message</label>
                  <input class="form-input" type="number" step="0.01" v-model="amountReceive" />
                </div>
                <div class="form-group">
                  <label class="form-label">Required Eth Balance Held by Sending Address</label>
                  <input class="form-input" type="number" step="0.01" v-model="amountBalance" />
                </div>
              </div>

            </div>
          </div>

        </div>




      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      currentAddressId () {
        return this.$store.getters.currentAddressId
      }
    },
    methods: {
      linkTo (path) {
        this.$router.push({ path })
      },
    }
  }
</script>
