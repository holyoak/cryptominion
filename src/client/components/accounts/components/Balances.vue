<template>
  <div class="app-row j-between">
    <div>{{ balance.id }}</div>
    <div>
    <div class="app-row j-end">
      <div>{{ balance_integer }}</div>
      <div>{{ balance_remainder }}</div>
    </div>
    </div>
    <div>
    <div class="app-row j-end">
      <div>{{ available_integer }}</div>
      <div>{{ available_remainder }}</div>
    </div>
    </div>
    <div>{{ btcValue }}</div>
  </div>
</template>

<script>
export default {
  name: 'balance-view',

  props: ['balance'],

  computed: {
    available_integer: function () {
      if (this.balance.id === 'USD') {
        let r = this.balance.available - (this.balance.available % 1)
        return '$ ' + r
      } else {
        return this.balance.available - (this.balance.available % 1)
      }
    },
    available_remainder: function () {
      if (this.balance.id === 'USD') {
        let r = (this.balance.available % 1).toFixed(2)
        return r.substr(1)
      } else {
        let r = (this.balance.available % 1).toFixed(4)
        return r.substr(1)
      }
    },
    balance_integer: function () {
      if (this.balance.id === 'USD') {
        let r = this.balance.balance - (this.balance.balance % 1)
        return '$ ' + r
      } else {
        return this.balance.balance - (this.balance.balance % 1)
      }
    },
    balance_remainder: function () {
      if (this.balance.id === 'USD') {
        let r = (this.balance.balance % 1).toFixed(2)
        return r.substr(1)
      } else {
        let r = (this.balance.balance % 1).toFixed(4)
        return r.substr(1)
      }
    },
    btcValue: function () {
      if (isNaN(this.balance.btc_value)) return 'Fetching data'
      else return this.balance.btc_value.toFixed(4)
    }
  },

  data () {
    return {}
  }
}
</script>

<style scoped>
</style>
