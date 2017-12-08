<template>
<div>
  <div v-if="!activeBalance">No {{ asset.name }} Available</div>
  <div v-if="activeBalance" class="app-rowrap j-even trade-panel">
    <div class="app-col core-wrapper">
      <div>
        Available {{ asset.name }}: {{ activeBalance }}
      </div>
      <input v-model.number="newOrder.amount" placeholder="Amount" type="text">
      <div class="app-row j-end core-buttons">
        <div class="small-icon"
          @click="openDialog('percentDialog')">
          <img src="../assets/percent.svg">
        </div>
        <div class="small-icon"
          @click="setAmountPercent(50)">
          <img src="../assets/half.svg">
        </div>
        <div class="small-icon"
          @click="setAmountPercent(33.33)">
          <img src="../assets/third.svg">
        </div>
        <div class="small-icon"
          @click="setAmountPercent(25)">
          <img src="../assets/quarter.svg">
        </div>
        <div class="small-icon"
          @click="setAmountPercent(20)">
          <img src="../assets/fifth.svg">
        </div>
      </div>
    </div>
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
      :makerOnly="newOrder.makerOnly"
      v-on:set_maker_only="setMakerOnly"
      :type="newOrder.type"
      :portions="newOrder.portions">
    </order-types>
  </div>
        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="percentDialog">
          <md-dialog-title>Enter percentage of {{ activeBalance }} {{ asset.name }}</md-dialog-title>

          <md-dialog-content>
            <md-input-container>
            <md-input id="amt_percent" type="text" placeholder="Percentage" v-model="amt_percent">
            </md-input>
            </md-input-container>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('percentDialog')">Cancel</md-button>
            <md-button class="md-primary" @click="setAmountPercent(amt_percent, 'percentDialog')">Ok</md-button>
          </md-dialog-actions>
        </md-dialog>

</div>
</template>

<script type="text/javascript">
import OrderTypes from './OrderTypes'

export default {
  components: {
    OrderTypes
  },

  props: ['asset', 'exKey', 'market'],

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
      balance: 0,
      amt_percent: ''
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
    }
  },

  methods: {
    openDialog (ref) {
      this.$refs[ref].open()
    },
    closeDialog (ref) {
      this.$refs[ref].close()
    },
    setAmountPercent (x, ref) {
      const p = this.asset.side === 'buy'
        ? this.market.quote.precision
        : this.market.base.precision
      this.newOrder.amount = ((x / 100) * this.activeBalance)
        .toFixed(p)
      if (ref) this.closeDialog(ref)
    },
    setMakerOnly (x) {
      console.log('setmakerOnly is ' + x)
      this.newOrder.makerOnly = x === false ? true : false
    },
    setPrice (x) { this.newOrder.price = Number(x) }
  }
}
</script>

<style>
  @import'./trader.css';
</style>
