<template>
  <div class="account">
    <div class="app-row j-between"
      v-bind:style="{ backgroundColor: theme.color, color: theme.accent }">
      <div class="icon">
        <img v-bind:src="icon">
      </div>
      <div class="title"><h4>{{ theme.name }}</h4></div>
    </div>
    <md-tabs>
      <md-tab id="balances" md-label="Balances">
        <div v-if="!balanceReady">
          Loading Data
        </div>
        <div v-if="valueReady" class="app-row j-between">
          <div>
            Current Value
          </div>
          <div>
            $ {{ currentValueUSD }}
          </div>
          <div>
            {{ currentValueBTC }} BTC
          </div>
        </div>
        <br>
        <div v-if="balanceReady" class="app-row j-between">
            <div class="labels">
              <b>Asset</b>
            </div>
            <div class="labels">
              <b>Balance</b>
            </div>
            <div class="labels">
              <b>Available</b>
            </div>
            <div class="labels">
              <b>BTC Value</b>
            </div>
        </div>
        <balance-view
          v-if="balanceReady"
          v-for="balance in account.balances"
          :balance="balance"
          v-bind:key="balance.asset"
        ></balance-view>
      </md-tab>
      <md-tab id="markets" md-label="Markets">
        <div v-if="!marketsReady">
          Fetching Data...
        </div>
        <div v-if="marketsReady" class="app-rowrap j-even">
          <market-chip
            v-for="market in account.markets"
            :market="market"
            v-bind:key="market.id"
            @load="loadMarket"
          ></market-chip>
        </div>
      </md-tab>
      <md-tab id="orders" md-label="Orders">Orders</md-tab>
    </md-tabs>

  </div>
</template>

<script>
import Assets from '../../../assets'
import balanceView from './Balances'
import marketChip from './MarketChip'

export default {
  name: 'account-view',

  props: ['account'],

  components: {
    balanceView,
    marketChip
  },

  computed: {
    balanceReady: function () { return this.account.balanceDataReady },
    marketsReady: function () { return this.account.marketsDataReady },
    ordersReady: function () { return this.account.ordersDataReady },
    valueReady: function () { return this.account.valueDataReady },
    currentValueBTC: function () {
      const balances = Object.keys(this.account.balances)
      if (balances.length > 1) {
        const res = { flag: true, amount: 0 }
        balances.forEach((x) => {
          if (isNaN(this.account.balances[x].btc_value)) res.flag = false
          else res.amount += Number(this.account.balances[x].btc_value)
        })
        if (res.flag === true) return res.amount.toFixed(4)
        else return 'Fetching data...'
      } else return 'Fetching data...'
    },
    currentValueUSD: function () {
      if (this.currentValueBTC === 'Fetching data...') return this.currentValueBTC
      else return (Number(this.currentValueBTC) * Number(this.account.last_btc_price)).toFixed(2)
    },
    icon: function () {
      if (this.account.id) {
        return require('../../../assets/exchanges/' + this.account.id + '.jpeg')
      } else {
        return ''
      }
    },
    theme: function () {
      if (Assets.exchanges[this.account.id]) {
        return Assets.exchanges[this.account.id]
      } else {
        return Assets.exchanges.default
      }
    }
  },

  data () { return {} },

  methods: {
    loadMarket: function (m) {
      const none = { balance: 0, available: 0, btc_value: 0 }
      const base = this.account.balances[m.base] || none
      const quote = this.account.balances[m.quote] || none
      const nav = {
        lowerDiv: 'trader-view',
        upperDiv: 'tickers-view',
        view: {
          exchangeID: this.account.id,
          marketID: m.id,
          base: base,
          quote: quote
        }
      }
      this.$store.commit('SET_NAV', nav)
      // this.$router.push({ name: 'tradeView',
      //   params: {
      //     exchangeName: this.theme.name,
      //     exKey: this.account.id,
      //     marketID: m.id,
      //     market: this.account.markets[m.id],
      //     base: base,
      //     quote: quote
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.account{
  background-color: white;
  margin: .5em;
  width: 32em;
  flex: 1;
}
.header{
  flex-flow: nowrap;
  justify-content: space-between;
}
.icon{
  width: 3em;
  height: 3em;
}
.icon-small{
  background-position: center;
  width: 1.5em;
  height: 1.5em;
}
.title{
  flex: 1;
  height: 3em;
  text-align: center;
}
.spaced{
  flex-flow: row nowrap;
  justify-content: space-between;
}
.spacewrap{
  flex-flow: row;
  justify-content: space-around;
}
</style>
