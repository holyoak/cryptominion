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
    <price
      @set_price="setPrice"
      :loaded="loaded"
      :name="quoteName"
      :precision="precision"
      :price="newOrder.price"
      :theme="theme">
    </price>
    <div v-if="execReady" class="exec" @click="exec">
      Execute
    </div>
    <div v-if="!execReady" class="no-exec">
      Execute
    </div>
    <order-types
      @set_portions="setPortions"
      @toggle_limit_only="toggleLimitOnly"
      @toggle_portions="togglePortions"
      :activePrice="activePrice"
      :hasLimit="hasLimit"
      :limitOnly="newOrder.limitOnly"
      :portions="newOrder.portions"
      :precision="market.precision"
      :quoteName="quoteName"
      :range="range"
      :rangeLabel="rangeLabel"
      :theme="theme"
      :type="newOrder.type"
      :types="types">
    </order-types>
    <stops
      @set_exec_trail_stop="setExecTrailStop"
      @set_init_trail_stop="setInitTrailStop"
      @set_stop_loss="setStopLoss"
      @set_target_price="setTargetPrice"
      @toggle_stop_loss="toggleStopLoss"
      @toggle_target_price="toggleTargetPrice"
      @toggle_trail_stop="toggleTrailStop"
      :order="newOrder.stops"
      :theme="theme"/>
  </div>
</div>
</template>

<script type="text/javascript">
import Amount from './Amount'
import OrderTypes from './Types'
import Price from './Price'
import Stops from './Stops2'
import userConfig from '../../../userConfig.json'

export default {
  components: {
    Amount,
    OrderTypes,
    Price,
    Stops
  },

  props: [
    'asset',
    'exKey',
    'hasLimit',
    'loaded',
    'market',
    'quoteName',
    'types',
    'theme'
  ],

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
        },
        stops: {
          stopLoss: {
            active: false,
            percent: null
          },
          trailStop: {
            active: false,
            initPercent: null,
            execPercent: null
          },
          targetPrice: {
            active: false,
            percent: null
          }
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
            max: this.setPrecision(
              this.newOrder.price * (Number(1 + (step / 2)))
            ),
            min: this.setPrecision(
              this.newOrder.price * (Number(1 - (step / 2)))
            )
          }
        } else {
          if (this.asset.side === 'buy') {
            return {
              max: this.setPrecision(this.newOrder.price),
              min: this.setPrecision(
                this.newOrder.price * (Number(1 - step))
              )
            }
          } else {
            return {
              max: this.setPrecision(
                this.newOrder.price * (Number(1 + step))
              ),
              min: this.setPrecision(this.newOrder.price)
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
    setExecTrailStop (x) { this.newOrder.stops.trailStop.execPercent = Number(x) },
    setInitTrailStop (x) { this.newOrder.stops.trailStop.initPercent = Number(x) },
    setPortions (x) { this.newOrder.portions = x },
    setPrecision (x) { return Number(x.toFixed(this.market.precision)) },
    setPrice (x) { this.newOrder.price = Number(x) },
    setStopLoss (x) { this.newOrder.stops.stopLoss.percent = Number(x) },
    setTargetPrice (x) { this.newOrder.stops.targetPrice.percent = Number(x) },
    toggleLimitOnly (x) { this.newOrder.limitOnly = !x },
    togglePortions (x) { this.newOrder.portions.active = !x },
    toggleStopLoss (x) { this.newOrder.stops.stopLoss.active = !x },
    toggleTargetPrice (x) { this.newOrder.stops.targetPrice.active = !x },
    toggleTrailStop (x) { this.newOrder.stops.trailStop.active = !x }
  },

  created () {
    const order = this.newOrder
    const config = Object.assign({}, userConfig.orders)
    order.userID = this.$store.state.accounts.id
    order.exKey = this.exKey
    order.marketID = this.market.id
    order.precision = this.market.base.precision
    order.side = this.asset.side
    order.symbol = this.market.base.name + '/' + this.market.quote.name
    if (config.limitOnly) order.limitOnly = config.limitOnly
    if (config.portions) order.portions = Object.assign({}, config.portions)
    // why Object.assign works above and not below?
    if (config.stops) order.stops = JSON.parse(JSON.stringify(config.stops))
    if (config.type) order.type = config.type
  }
}
</script>

<style>
  @import'./trader.css';
</style>
