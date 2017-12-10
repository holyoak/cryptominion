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
      :rangeLabel="rangeLabel"
      :makerOnly="newOrder.makerOnly"
      v-on:set_maker_only="setMakerOnly"
      v-on:set_portions="setPortions"
      :type="newOrder.type"
      :portions="newOrder.portions">
    </order-types>
  </div>
</div>
</template>

<script type="text/javascript">
import Amount from './Amount'
import OrderTypes from './OrderTypes'

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
        price: null,
        makerOnly: false,
        type: '',
        portions: {
          active: false
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
      return (!(isNaN(this.newOrder.price)) &&
        this.newOrder.price !== null &&
        this.newOrder.price !== '')
    },

    precision () {
      return this.asset.side === 'buy'
        ? this.market.quote.precision
        : this.market.base.precision
    },

    rangeLabel () {
      return this.asset.side === 'buy' ? 'below' : 'above'
    }
  },

  methods: {
    setAmount (x) {
      this.newOrder.amount = Number(x)
    },
    setMakerOnly (x) {
      console.log('setmakerOnly is ' + x)
      this.newOrder.makerOnly = !x
    },
    setPortions (x) {
      console.log('setPortions is ' + x)
      this.newOrder.portions.active = !x
    },
    setPrice (x) { this.newOrder.price = Number(x) }
  }
}
</script>

<style>
  @import'./trader.css';
</style>
