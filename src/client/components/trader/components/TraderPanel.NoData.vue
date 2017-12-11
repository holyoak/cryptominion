<template>
<div>
  <div v-if="!activeBalance">No {{ asset.name }} Available</div>
  <div v-if="activeBalance" class="app-rowrap j-even trade-panel">
    <amount
      @set_amount="setAmount"
      :balance="activeBalance"
      :name="asset.name"
      :precision="precision">
    </amount>
    <div class="app-col core-wrapper">
      <div>
        Price:
      </div>
      <input v-model.number="newOrder.price" placeholder="Price" type="text">
    </div>
    <div class="exec">
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

  props: ['asset', 'exKey', 'hasLimit', 'market', 'types', 'quoteName'],

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
      if (this.$store.state.accounts.accounts[this.exKey] &&
        this.$store.state.accounts.accounts[this.exKey]
          .balances[this.asset.name] &&
        this.$store.state.accounts.accounts[this.exKey]
          .balances[this.asset.name].available > 0) {
        return this.$store.state.accounts.accounts[this.exKey]
          .balances[this.asset.name].available
      } else return false
    },

    activePrice () {
      if (!(isNaN(this.newOrder.price)) &&
        this.newOrder.price !== null &&
        this.newOrder.price !== '') return this.newOrder.price
      else return false
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
    setAmount (x) { this.newOrder.amount = Number(x) },
    setPortions (x) { this.newOrder.portions = x },
    setPrice (x) { this.newOrder.price = Number(x) },
    toggleLimitOnly (x) { this.newOrder.limitOnly = !x },
    togglePortions (x) { this.newOrder.portions.active = !x }
  },

  created () {
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
