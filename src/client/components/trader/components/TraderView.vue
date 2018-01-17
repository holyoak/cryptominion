<template>
<div>
  <div v-if="!dataReady">Fetching Data...</div>
  <div id="traderAccount"
    v-if="dataReady"
    :style="{ color:theme.color, borderColor: theme.accent, backgroundColor: theme.backgroundColor }">
      <div class="trade-icon"
        v-bind:style="{ borderColor:theme.color }">
        <img v-bind:src="exIcon">
      </div>
    <div id="tradeHeader" md-row class="app-row j-even">
      <div class="icon-small">
        <img v-bind:src="baseIcon">
      </div>
      <h2>{{ theme.name }}</h2>
      <div v-if="loaded">Last Price: {{ lastPrice }} {{ market.quote.name }}  </div>
      <h2>{{ market.id }}</h2>
      <div class="icon-small">
        <img v-bind:src="quoteIcon">
      </div>
    </div>
    <div class="app-row">
      <div id="traderSell" class="tradePanel">
        <trade-panel-no-data
          :asset="baseAsset"
          :quoteName="quote.name"
          :exKey="exKey"
          :hasLimit="hasLimit"
          :loaded="loaded"
          :last="lastPrice"
          :market="market"
          :types="orderTypes"
          :next="nextAsk"
          :best="nextBid"
          :split="splitSpread"
          :theme="theme">
        </trade-panel-no-data>
      </div>
      <div id="traderBuy" class="tradePanel">
        <trade-panel-no-data
          :asset="quoteAsset"
          :quoteName="quote.name"
          :exKey="exKey"
          :hasLimit="hasLimit"
          :last="lastPrice"
          :loaded="loaded"
          :market="market"
          :types="orderTypes"
          :next="nextBid"
          :best="nextAsk"
          :split="splitSpread"
          :theme="theme">
        </trade-panel-no-data>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import themeAssets from '../../../assets/exchanges/exchanges.json'
import TradePanelNoData from './TraderPanel.NoData'
import { Tickers } from '../../tickers/components'

export default {
  name: 'trader-view',

  components: {
    TradePanelNoData,
    Tickers
  },

  data () {
    return {
      hmm: ''
    }
  },

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
    orderTypes () {
      return require('../../../assets')
        .exchanges[this.exKey].orderTypes
    },
    hasLimit () {
      return require('../../../assets')
        .exchanges[this.exKey].limit
    },
    dataReady: function () {
      return this.$store.state.accounts.accounts[this.exKey].marketsDataReady
    },
    loaded: function () {
      this.hmm = false
      if (isNaN(this.market.last_price)) this.hmm = 'last_price'
      if (isNaN(this.market.lowest_ask)) this.hmm = 'lowest_ask'
      if (isNaN(this.market.highest_bid)) this.hmm = 'highest_bid'
      if (this.hmm === false) return true
      else return false
    },
    theme: function () {
      return themeAssets[this.exKey]
    },
    prec: function () { return this.market.precision },
    sat: function () { return (1 / Math.pow(10, this.prec)) },
    lastPrice: function () {
      if (this.loaded) return this.market.last_price.toFixed(this.prec)
      else return null
    },
    lowAsk: function () {
      if (this.loaded) return this.market.lowest_ask.toFixed(this.prec)
      else return null
    },
    highBid: function () {
      if (this.loaded) return this.market.highest_bid.toFixed(this.prec)
      else return null
    },
    // 'next' means youu are in a hurry
    // it returns the closest make to the latest take
    nextAsk: function () {
      if (this.loaded) {
        return Number(this.highBid) + Number(this.sat) < Number(this.lowAsk)
          ? (Number(this.highBid) + Number(this.sat)).toFixed(this.prec)
          : Number(this.lowAsk).toFixed(this.prec)
      } else return null
    },
    nextBid: function () {
      if (this.loaded) {
        return Number(this.lowAsk) - Number(this.sat) > Number(this.highBid)
          ? (Number(this.lowAsk) - Number(this.sat)).toFixed(this.prec)
          : Number(this.highBid).toFixed(this.prec)
      } else return null
    },
    splitSpread: () => {
      if (this.loaded) {
        return (this.lowAsk - this.highBid) > (3 * this.sat)
          ? Number((this.lowAsk - this.highBid) / 2).toFixed(this.prec)
          : false
      } else return null
    },
    baseAsset: function () {
      return {
        side: 'sell',
        name: this.base.name,
        pair: this.quote.name
      }
    },
    quoteAsset: function () {
      return {
        side: 'buy',
        name: this.quote.name,
        pair: this.base.name
      }
    },
    exIcon: function () {
      return require('../../../assets/exchanges/' + this.exKey + '.jpeg')
    },
    baseIcon: function () {
      try {
        return require('../../../assets/assets/' + this.base.name + '.svg')
      } catch (ex) {
        return require('../../../assets/assets/default.svg')
      }
    },
    quoteIcon: function () {
      try {
        return require('../../../assets/assets/' + this.quote.name + '.svg')
      } catch (ex) {
        return require('../../../assets/assets/default.svg')
      }
    },
    tickerKey: function () {
      return {
        id: this.exKey + this.market.id,
        exchange: this.exKey,
        market: this.marketID
      }
    },
    userConfig () {
      return require('../../../userConfig.json')
    }
  }
}
</script>

<style scoped>
  @import'./trader.css';
</style>
