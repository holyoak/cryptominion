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
import config from '../../../userConfig'

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
      tickerKeys (state) {
        const k = this.tickerKey
        const tickerKeys = [k]
        // grab every ticker that matches this market
        tickerKeys.concat(getTickers(k))
        if ((k.market === 'USD' || k.market === 'USDT') &&
          this.config.prefs.USDT === true) {
          const m = k.market === 'USD' ? 'USD' : 'USDT'
          tickerKeys.concat(getTickers({ id: k.id, market: m }))
        }
        return tickerKeys
        function getTickers (key) {
          const res = []
          console.log('Into getTickers')
          const exchanges = Object.keys(state.tickers.tickers)
          exchanges.forEach((x) => {
            const markets = Object.keys(state.tickers.tickers[x])
            markets.forEach((m) => {
              if (state.tickers.tickers[x][m].market === key.market &&
                state.tickers.tickers[x][m].id !== key.id) {
                res.push({
                  id: x + key.market,
                  exchange: x,
                  market: key.market
                })
              }
            })
          })
          return res
        }
      }
    })
  }
}
</script>

<style scoped>
</style>
