<template>
<div>
  <div v-if="!dataReady" class="lower">Fetching Data...</div>
  <div id="traderAccount" class="lower"
    v-if="dataReady"
    v-bind:style="{ color:theme.accent,   backgroundColor: theme.color }">
      <div class="icon"
        v-bind:style="{ borderColor:theme.color }">
        <img v-bind:src="exIcon">
      </div>
    <div id="tradeHeader" md-row class="app-row j-even">
      <div class="sm-icon">
        <img v-bind:src="quoteIcon">
      </div>
      <h2>{{ theme.name }}</h2>
      <div v-if="streamReady">Last Price: {{ lastPrice }} {{ market.quote.name }}  </div>
      <h2>{{ market.id }}</h2>
      <div class="sm-icon">
        <img v-bind:src="baseIcon">
      </div>
    </div>
    <div v-if="!streamReady">
    NonStream Trade Panel Goes Here
    </div>
    <div class="app-row" v-if="streamReady">
      <div id="traderBuy" class="tradePanel">
        <trader-gui
          :asset="quoteAsset"
          :market="market"
          :last="highBid"
          :next="nextBid"
          :best="nextAsk"
          :split="splitSpread">
        </trader-gui>
      </div>
      <div id="traderSell" class="tradePanel">
        <trader-gui
          :asset="baseAsset"
          :market="market"
          :last="lowAsk"
          :next="nextAsk"
          :best="nextBid"
          :split="splitSpread">
        </trader-gui>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import themeAssets from '../../../assets/exchanges/exchanges.json'
import TraderGui from './TraderGui'
import { Tickers } from '../../tickers/components'

export default {
  name: 'trader-view',

  components: {
    TraderGui,
    Tickers
  },

  data () { return {} },

  computed: {
    exKey () { return this.$store.state.nav.nav.view.exchangeID },
    marketID () { return this.$store.state.nav.nav.view.marketID },
    market () {
      return this.$store.state.accounts
        .accounts[this.exKey].markets[this.marketID]
    },
    base () {
      return this.$store.state.accounts
        .accounts[this.exKey].markets[this.marketID].base
    },
    quote () {
      return this.$store.state.accounts
        .accounts[this.exKey].markets[this.marketID].quote
    },
    dataReady: function () {
      return this.$store.state.accounts.accounts[this.exKey].marketsDataReady
    },
    streamReady: function () {
      if (isNaN(this.market.last_price) ||
        isNaN(this.market.lowest_ask) ||
        isNaN(this.market.highest_bid)) return false
      else return true
    },
    theme: function () {
      return themeAssets[this.exKey]
    },
    prec: function () { return this.market.precision },
    sat: function () { return (1 / Math.pow(10, this.prec)) },
    lastPrice: function () {
      return this.market.last_price.toFixed(this.prec)
    },
    lowAsk: function () {
      return this.market.lowest_ask.toFixed(this.prec)
    },
    highBid: function () {
      return this.market.highest_bid.toFixed(this.prec)
    },
    // 'next' means youu are in a hurry
    // it returns the closest make to the latest take
    nextAsk: function () {
      return Number(this.highBid) + Number(this.sat) < Number(this.lowAsk)
        ? (Number(this.highBid) + Number(this.sat)).toFixed(this.prec)
        : Number(this.lowAsk).toFixed(this.prec)
    },
    nextBid: function () {
      return Number(this.lowAsk) - Number(this.sat) > Number(this.highBid)
        ? (Number(this.lowAsk) - Number(this.sat)).toFixed(this.prec)
        : Number(this.highBid).toFixed(this.prec)
    },
    splitSpread: () => {
      return (this.lowAsk - this.highBid) > (3 * this.sat)
        ? Number((this.lowAsk - this.highBid) / 2).toFixed(this.prec)
        : false
    },
    baseAsset: function () {
      return {
        side: 'sell',
        name: this.base.name,
        balance: this.base
      }
    },
    quoteAsset: function () {
      return {
        side: 'buy',
        name: this.quote.name,
        balance: this.quote
      }
    },
    exIcon: function () {
      return require('../../../assets/exchanges/' + this.exKey + '.jpeg')
    },
    baseIcon: function () {
      return require('../../../assets/assets/' +
        this.base.name + '.png')
    },
    quoteIcon: function () {
      return require('../../../assets/assets/' +
        this.quote.name + '.png')
    },
    tickerKey: function () {
      return {
        id: this.exKey + this.market.id,
        exchange: this.exKey,
        market: this.marketID
      }
    }
  }
}
</script>

<style scoped>
#traderAccount{
  position: relative;
  margin: 1em;
  padding: 1em;
  overflow: visible;
}
#traderBuy {
  background-color: #5AAC5E;
}
#traderSell {
  background-color: #A33643;
}
.tradePanel{
  color: black;
  flex: 1 0 auto;
  max-width: 50%;
}
.icon{
  border: solid;
  position: absolute;
  top: -2em;
  left: -1em;
  height: 4em;
  width: 4em;
}
.sm-icon{
  height: 3em;
  width: 3em;
  margin-bottom: .5em;
}
</style>
