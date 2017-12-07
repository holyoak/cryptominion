<template>
<div>
  <div class="app-rowrap j-even trade-panel">
    <div class="app-col core-wrapper">
      <div>
        Available {{ asset.name }}: {{ asset.balance.available }}
      </div>
      <md-input-container>
        <label>{{ asset.name }} Amount</label>
        <md-input id="amount" type="text" placeholder="Amount" v-model.number="newOrder.amount"></md-input>
      </md-input-container>
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
        {{ this.bestLabel }}: {{ last }} {{ market.quote.name }}
      </div>
      <md-input-container>
        <label>Price</label>
        <md-input id="price" type="text" placeholder="Price" v-model.number="newOrder.price"></md-input>
      </md-input-container>
      <div class="app-row j-end core-buttons">
        <div class="small-icon"
          @click="openDialog('percentPriceDialog')">
          <img src="../assets/percent.svg">
        </div>
        <div class="small-icon"
          @click="setPrice('next')">
          <img src="../assets/next.svg">
        </div>
        <div class="small-icon"
          @click="setPrice('best')">
          <img src="../assets/best.svg">
        </div>
      </div>
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
    <stops v-if="newOrder.price"
      :best="best"
      :next="next"
      :precision="market.precision"
      :price="activePrice"
      :side="asset.side">
    </stops>
  </div>
        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="percentDialog">
          <md-dialog-title>Enter percentage of {{ asset.balance.available }} {{ asset.name }}</md-dialog-title>

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


        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="percentPriceDialog">
          <md-dialog-title>{{ this.percentPriceLabel }}</md-dialog-title>

          <md-dialog-content>
            <md-input-container>
            <md-input id="price_percent" type="number" placeholder="Percentage" v-model.number="price_percent">
            </md-input>
            </md-input-container>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('percentPriceDialog')">Cancel</md-button>
            <md-button class="md-primary" @click="setPricePercent(price_percent, 'percentPriceDialog')">Ok</md-button>
          </md-dialog-actions>
        </md-dialog>
</div>
</template>

<script type="text/javascript">
import OrderTypes from './OrderTypes'
import Stops from './Stops'

export default {
  components: {
    OrderTypes,
    Stops
  },

  props: ['asset', 'market', 'last', 'next', 'best', 'split'],

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
      amt_percent: '',
      price_percent: ''
    }
  },

  computed: {
    activePrice: function () {
      switch (this.active) {
        case 'best':
          return this.best
        case 'next':
          return this.next
        case 'split':
          return this.split
        default:
          return this.newOrder.price
      }
    },
    bestLabel: function () {
      return this.asset.side === 'buy' ? 'Highest bid' : 'Lowest Ask'
    },
    percentPriceLabel: function () {
      const side = this.asset.side === 'buy' ? 'below' : 'above'
      return 'Enter percentage ' + side + ' ' +
        this.last + ' ' + this.market.quote.name
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
      this.newOrder.amount = ((x / 100) * this.asset.balance.available)
        .toFixed(p)
      if (ref) this.closeDialog(ref)
    },
    setMakerOnly (x) {
      this.newOrder.makerOnly = x
    },
    setPricePercent (x, ref) {
      const side = this.asset.side === 'buy'
        ? 1 - (x / 100)
        : 1 + (x / 100)
      this.newOrder.price = (side * this.market.last_price)
        .toFixed(this.market.precision)
      this.active = 'fixed'
      if (ref) this.closeDialog(ref)
    },
    setPrice (x) {
      x === 'next'
        ? this.newOrder.price = Number(this.next)
        : this.newOrder.price = Number(this.best)
      this.active = x
    }
  }
}
</script>

<style>
.core-wrapper{
   position: relative;
   margin: 0em .5em 0em .5em;
}
.core-input{
   position: absolute;
   top: 1em;
}
.core-buttons{
   flex: 1 0 auto;
   position: absolute;
   top: 5em;
}
.exec{
  border: solid;
  cursor: pointer;
  margin: 1em;
  width: 100%;
}
.top-input{
   flex: 1;
}
.small-icon{
  background-color: #BB963C;
  border-radius: .5em;
  cursor: pointer;
  margin: .5em;
  height: 1.5em;
  width: 1.5em;
  text-align: center;
}
.label{
  padding: 1em;
  flex: 1;
  text-align: right;
}
.spaced{
  justify-content: space-around;
}
.trade-panel{
}
.userInput{
  padding: 1em;
  flex: 0;
  width: 5px;
}
#execute{
  padding: 3em;
}
</style>
