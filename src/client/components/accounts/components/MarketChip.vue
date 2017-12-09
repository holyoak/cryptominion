<template>
  <div class="app-row j-around i-center chip"
    v-bind:style="{ backgroundColor: chip_color }"
    @click="loadMarket()">
      <div class="icon-small">
        <img v-bind:src="baseImage">
      </div>
      <span><b>{{ market.base.name }} - {{ market.quote.name }}</b></span>
      <div class="icon-small">
        <img v-bind:src="quoteImage">
      </div>
  </div>
</template>

<script>
export default {
  name: 'market-chip',

  props: ['market'],

  computed: {
    chip_color: function () {
      switch (this.market.quote.name) {
        case 'BTC': return '#8D7627'
        case 'ETH': return '#85AEC1'
        case 'EUR': return '#223067'
        case 'GBP': return '#7A5231'
        case 'LTC': return '#777'
        case 'USD': return '#186221'
        case 'USDT': return '#4B694E'
        case 'XMR': return '#CE7F3F'
        default: return '#bbb'
      }
    },
    baseImage: function () {
      try {
        return require('../../../assets/assets/' + this.market.base.name + '.svg')
      } catch (ex) {
        return require('../../../assets/assets/default.svg')
      }
    },
    quoteImage: function () {
      try {
        return require('../../../assets/assets/' + this.market.quote.name + '.svg')
      } catch (ex) {
        return require('../../../assets/assets/default.svg')
      }
    }
  },

  data () { return {} },

  methods: {
    loadMarket: function () {
      this.$emit('load', {
        id: this.market.base.name + '-' + this.market.quote.name,
        base: this.market.base.name,
        quote: this.market.quote.name
      })
    }
  }
}
</script>

<style scoped>
.chip{
  align-items: center;
  border-radius: 2em;
  color: #eee;
  cursor: pointer;
  margin: 1em;
}
.icon-small{
  width: 3em;
  height: 3em;
}
.spaced{
  flex-flow: row nowrap;
  justify-content: space-between;
}
</style>
