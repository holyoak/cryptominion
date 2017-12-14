<template>
<div>
  <div v-if="!activeBalance">No {{ asset.name }} Available</div>
  <div v-if="activeBalance" class="app-rowrap j-even trade-panel">
    <amount
      @set_amount="setAmount"
      :amount="newOrder.amount"
      :balance="activeBalance"
      :buy="asset.side=='buy'"
      :name="asset.name"
      :pair="asset.pair"
      :precision="precision"
      :activePrice="activePrice"
      :theme="theme">
    </amount>
    <div class="app-col">
      <div>
        Price:
      </div>
      <input v-model.number="newOrder.price" placeholder="Price" type="text">
    </div>
    <div v-if="execReady" class="exec" @click="exec">
      Execute
    </div>
    <div v-if="!execReady" class="no-exec">
      Execute
    </div>
    <order-types
      :activePrice="activePrice"
      :hasLimit="hasLimit"
      :types="types"
      :quoteName="quoteName"
      :range="range"
      :rangeLabel="rangeLabel"
      :limitOnly="newOrder.limitOnly"
      v-on:set_portions="setPortions"
      v-on:toggle_limit_only="toggleLimitOnly"
      v-on:toggle_portions="togglePortions"
      :theme="theme"
      :type="newOrder.type"
      :portions="newOrder.portions">
    </order-types>
  </div>
</div>
</template>

<script type="text/javascript">
import Amount from './Amount'
import OrderTypes from './OrderTypes'
import userConfig from '../../../app/userConfig.json'

export default {
  components: {
    Amount,
    OrderTypes
  },

  props: ['asset', 'exKey', 'hasLimit', 'market', 'types', 'theme', 'quoteName'],

  data () {
    return {
      newOrder: {
        amount: '',
        price: 100,
        limitOnly: false,
        type: '',
        portions: {
          active: false,
          around: true,
          portions: null,
          rangePercent: null
        }
      },
      active: false,
      balance: 0
    }
  },

  computed: {
    activeBalance () {
      // if asset balance exists in state and > 0
      if (this.$store.state.accounts.accounts[this.exKey] &&
        this.$store.state.accounts.accounts[this.exKey]
          .balances[this.asset.name] &&
        this.$store.state.accounts.accounts[this.exKey]
          .balances[this.asset.name].available > 0) {
      // show me the balance
        return this.$store.state.accounts.accounts[this.exKey]
          .balances[this.asset.name].available
      // or tell me it aint there
      } else return false
    },

    activePrice () {
      if (!(isNaN(this.newOrder.price)) &&
        this.newOrder.price !== null &&
        this.newOrder.price !== '') return this.newOrder.price
      else return false
    },

    execReady () {
      // main input mask before trade execution
      const res = { ready: true }
      if (!this.activePrice) res.ready = false
      if (isNaN(this.newOrder.amount)) res.ready = false
      if (this.newOrder.amount === null) res.ready = false
      if (Number(this.newOrder.amount) <= 0) res.ready = false
      if (isNaN(this.newOrder.price)) res.ready = false
      // over your balance
      if (Number(this.newOrder.amount) > Number(this.activeBalance)) {
        res.ready = false
      }
      // TODO min order size, min portion order size, min size limit order
      return res.ready
    },

    precision () {
      return this.asset.side === 'buy'
        ? this.market.quote.precision
        : this.market.base.precision
    },

    rangeLabel () {
      return this.asset.side === 'buy' ? 'below' : 'above'
    },

    range () {
      if (!(isNaN(this.newOrder.price)) &&
        !(isNaN(this.newOrder.portions.rangePercent))) {
        const step = Number(this.newOrder.portions.rangePercent / 100)
        if (this.newOrder.portions.around === true) {
          return {
            max: this.newOrder.price * (Number(1 + (step / 2))),
            min: this.newOrder.price * (Number(1 - (step / 2)))
          }
        } else {
          if (this.asset.side === 'buy') {
            return {
              max: this.newOrder.price,
              min: this.newOrder.price * (Number(1 - step))
            }
          } else {
            return {
              max: this.newOrder.price * (Number(1 + step)),
              min: this.newOrder.price
            }
          }
        }
      } else return false
    }
  },

  methods: {
    exec () {
      const res = { flag: 'create position', data: this.newOrder }
      this.$store.state.nav.socket.send(JSON.stringify(res))
    },
    setAmount (x) { this.newOrder.amount = Number(x) },
    setPortions (x) { this.newOrder.portions = x },
    setPrice (x) { this.newOrder.price = Number(x) },
    toggleLimitOnly (x) { this.newOrder.limitOnly = !x },
    togglePortions (x) { this.newOrder.portions.active = !x }
  },

  created () {
    this.newOrder.userID = this.$store.state.accounts.id
    this.newOrder.exKey = this.exKey
    this.newOrder.marketID = this.market.id
    this.newOrder.precision = this.market.base.precision
    this.newOrder.side = this.asset.side
    this.newOrder.symbol = this.market.base.name + '/' +
      this.market.quote.name
    if (userConfig.orders.portions) {
      // this hack is going to be fatal in Android
      this.newOrder.portions = JSON.parse(JSON.stringify(userConfig.orders.portions))
    }
    if (userConfig.orders.limitOnly) {
      this.newOrder.limitOnly = userConfig.orders.limitOnly
    }
    if (userConfig.orders.type) {
      this.newOrder.type = userConfig.orders.type
    }
  }
}
</script>

<style>
  @import'./trader.css';
</style>
