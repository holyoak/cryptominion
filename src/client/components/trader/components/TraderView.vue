<template>
<div>
  <div v-if="!dataReady" class="lower">Fetching Data...</div>
  <div id="traderAccount" class="lower"
    v-if="dataReady"
    v-bind:style="{ color:theme.accent,   backgroundColor: theme.color }">
      <div class="trade-icon"
        v-bind:style="{ borderColor:theme.color }">
        <img v-bind:src="exIcon">
      </div>
    <div id="tradeHeader" md-row class="app-row j-even">
      <div class="icon-small">
        <img v-bind:src="baseIcon">
      </div>
      <h2>{{ theme.name }}</h2>
      <div v-if="streamReady">Last Price: {{ lastPrice }} {{ market.quote.name }}  </div>
      <h2>{{ market.id }}</h2>
      <div class="icon-small">
        <img v-bind:src="quoteIcon">
      </div>
    </div>
    <div class="app-row" v-if="!streamReady">
      <div id="traderBuy" class="tradePanel">
        <trade-panel-no-data
          :asset="quoteAsset"
          :quoteName="quote.name"
          :exKey="exKey"
          :hasLimit="hasLimit"
          :market="market"
          :types="orderTypes">
        </trade-panel-no-data>
      </div>
      <div id="traderSell" class="tradePanel">
        <trade-panel-no-data
          :asset="quoteAsset"
          :quoteName="quote.name"
          :exKey="exKey"
          :hasLimit="hasLimit"
          :market="market"
          :types="orderTypes">
        </trade-panel-no-data>
      </div>
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
import TradePanelNoData from './TraderPanel.NoData'
import { Tickers } from '../../tickers/components'

export default {
  name: 'trader-view',

  components: {
    TraderGui,
    TradePanelNoData,
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
        name: this.base.name
      }
    },
    quoteAsset: function () {
      return {
        side: 'buy',
        name: this.quote.name
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
    }
  }
}
</script>

<style scoped>
  @import'./trader.css';
</style>
