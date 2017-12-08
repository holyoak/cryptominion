<template v-if="dataLoaded">
<div class="tickers">
  <div class="app-row j-around">
    <ticker
      v-for="tickerKey in tickerKeys"
      :tickerKey="tickerKey"
      v-bind:key="tickerKey.id"
    ></ticker>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import Ticker from './Ticker'

export default {
  name: 'tickers-view',

  components: {
    Ticker
  },

  data () {
    return {
      count: 0
    }
  },

  computed: {
    tickerKey () {
      return {
        id: this.$store.state.nav.nav.view.exchangeID +
        this.$store.state.nav.nav.view.marketID,
        exchange: this.$store.state.nav.nav.view.exchangeID,
        market: this.$store.state.nav.nav.view.marketID
      }
    },
    ...mapState({
      'tickerKeys': function (state) {
        const k = this.tickerKey
        const tickerKeys = [k]
        // grab every ticker that matches this market
        const exchanges = Object.keys(state.tickers.tickers)
        exchanges.forEach((x) => {
          const markets = Object.keys(state.tickers.tickers[x])
          markets.forEach((m) => {
            if (state.tickers.tickers[x][m].market === k.market &&
              state.tickers.tickers[x][m].id !== k.id) {
              tickerKeys.push({
                id: x + k.market,
                exchange: x,
                market: k.market
              })
            }
          })
        })
        return tickerKeys
      }
    })
  }
}
</script>

<style scoped>
</style>
