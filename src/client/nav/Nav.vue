<template>
<div>
  <div id="fab">
    <div class="app-row nav">
      <div class="icon-nav"
        @click="setNavHome">
        <img src="../assets/logo.svg">
      </div>
<!--       <div class="icon-nav-small"
        @click="openDialog('Bittrex')">
        <img src="../assets/exchanges/bittrex.jpeg">
      </div>
      <div class="icon-nav-small"
        @click="openDialog('GDAX')">
        <img src="../assets/exchanges/gdax.jpeg">
      </div>
      <div class="icon-nav-small"
        @click="openDialog('Poloniex')">
        <img src="../assets/exchanges/poloniex.jpeg">
      </div> -->
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
      @click="openDialog('Settings')">
      <img src="../assets/gear.png">
    </div>
  </div>
  <oak-modal v-if="showExchange"
    @cancel="showExchange = false"
    @ok="showExchange = false">
    <h2 slot="header">{{activeExchange}}</h2>
   <div slot="content"> You clicked {{activeExchange}} </div>
  </oak-modal>
</div>
</template>

<script>

export default {

  data () {
    return {
      activeExchange: null,
      showExchange: false
    }
  },

  methods: {
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    openDialog (ref) {
      this.activeExchange = ref
      this.showExchange = true
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
