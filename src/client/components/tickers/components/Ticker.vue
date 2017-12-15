<template>
<div class="ticker" v-bind:style="{ backgroundColor: theme.backgroundColor }">
  <div v-if="!ticker"
    v-bind:style="{ backgroundColor: theme.backgroundColor, color: theme.color }">
    <b>{{ theme.name }}</b>
    <div>No Ticker Data Available</div>
  </div>
  <div class="app-row j-around title"
    v-if="ticker"
    v-bind:style="{ backgroundColor: theme.backgroundColor, color: theme.color }">
    <div><b>{{ theme.name }}</b></div>
  </div>
  <tick
    v-if="ticker"
    v-for="tick of ticker.data"
    :tick="tick"
    :precision="precision"
    v-bind:key="tick.id">
  </tick>
</div>
</template>

<script>
import Assets from '../../../assets/exchanges/exchanges.json'
import { mapState } from 'vuex'
import Tick from './Tick'

export default {
  props: ['tickerKey'],

  components: {
    Tick
  },

  computed: {
    'theme': function () {
      return Assets[this.tickerKey.exchange]
    },
    ...mapState({
      'ticker': function (state) {
        const k = this.tickerKey
        const ticker = state.tickers.tickers[k.exchange] &&
          state.tickers.tickers[k.exchange][k.market]
          ? state.tickers.tickers[k.exchange][k.market]
          : false
        return ticker
      },
      'precision': function (state) {
        if (state.accounts.accounts[this.tickerKey.exchange]) {
          return state.accounts
            .accounts[this.tickerKey.exchange]
            .markets[this.tickerKey.market].precision
        } else return 5
      }
    })

  },

  data: () => { return {} }
}
</script>

<style scoped>
.ticker{
  padding: .5em;
  width: 12em;
}
.title{
  width: 11em;
}
</style>
