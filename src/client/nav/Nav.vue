<template>
<div>
  <div id="fab">
    <div class="app-row nav">
      <div class="icon-nav"
        @click="setNavHome">
        <img src="../assets/logo.svg">
      </div>
      <div class="icon-nav-small"
        @click="openMyDialog('fabDialog')">
        <img src="../assets/exchanges/bittrex.jpeg">
      </div>
      <div class="icon-nav-small"
        @click="openDialog('fabDialog')">
        <img src="../assets/exchanges/gdax.jpeg">
      </div>
      <div class="icon-nav-small"
        @click="openDialog('fabDialog')">
        <img src="../assets/exchanges/poloniex.jpeg">
      </div>
    </div>
<!--     <div class="icon-nav-small"
      @click="openDialog('fabDialog')">
      <img src="../assets/assets/ETH.png">
    </div>
    <div class="icon-nav-small"
      @click="openDialog('fabDialog')">
      <img src="../assets/assets/BTC.png">
    </div>
    <div class="icon-nav-small"
      @click="openDialog('fabDialog')">
      <img src="../assets/assets/XMR.png">
    </div>
    <div class="icon-nav-small"
      @click="openDialog('fabDialog')">
      <img src="../assets/assets/LTC.png">
    </div>
    <div class="icon-nav-small"
      @click="openDialog('fabDialog')">
      <img src="../assets/assets/AEON.png">
    </div> -->
  </div>
  <div id="settings">
    <div class="icon-nav-small"
      @click="openDialog('fabDialog')">
      <img src="../assets/gear.png">
    </div>
  </div>
  <md-dialog md-open-from="#custom" md-close-to="#custom" ref="fabDialog">    <md-dialog-title>FAB Navigation Stub</md-dialog-title>
    <md-dialog-content>
      Floating action button navigation not built out yet
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click="closeDialog('fabDialog')">
        OK
      </md-button>
    </md-dialog-actions>
  </md-dialog>
</div>
</template>

<script>

export default {

  data () { return {} },

  methods: {
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    openDialog (ref) {
      this.$refs[ref].open()
    },
    openMyDialog (ref) {
      document.getElementById('modl_root').style.display = 'block'
    },
    setNavHome () {
      this.$store.commit('SET_NAV', {
        view: 'splash',
        upperDiv: 'splash',
        lowerDiv: 'accounts-view'
      })
    }
  }
}
</script>

<style scoped>

</style>
