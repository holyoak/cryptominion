<template>
  <div class="app-col">
    <div @click="setAmountPercent(100)" class="themed button"
      v-bind:style="{ borderColor: theme.color }">
      Available {{ name }}: {{ balance }}
    </div>
    <div class="app-row j-between i-start">
      <div v-if="buy" style="height: 1.5rem;" class="app-row i-start">
        <oak-checkbox style="height: 1rem; width:1rem;"
          :checked="baseActive"
          v-on:click="togglebaseActive"></oak-checkbox>
        <div>in {{ pair }}</div>
      </div>
      <div v-if="!baseActive">{{ pair }} gained: {{ pairGain }}</div>
      <div v-if="baseActive">{{ name }} used: {{ amount }}</div>
    </div>

    <div class="app-row j-between i-center" v-if="!baseActive">
      <oak-input-number
        @output="setAmount"
        label="Amount"
        placeholder="Enter an Amount"
        :value="amount">
      </oak-input-number>
      <div style="flex: 0;">
        {{ name }}
      </div>
    </div>
    <div class="app-row j-between i-center" v-if="baseActive">
      <div class="inputCryptoNumber">
        <input v-model.number="baseAmount" placeholder="Amount" type="text"
          @blur="blurBase">
      </div>
      <div>
        {{ pair }}
      </div>
    </div>
    <div class="app-row j-end core-buttons">
      <div class="themed icon-tiny button"  v-bind:style="{ borderColor: theme.color }"
        @click="showModal=true">
        <img src="../assets/percent.svg" class="center">
      </div>
      <div class="themed icon-tiny button"  v-bind:style="{ borderColor: theme.color }"
        @click="setAmountPercent(50)">
        <img src="../assets/half.svg" class="center">
      </div>
      <div class="themed icon-tiny button"  v-bind:style="{ borderColor: theme.color }"
        @click="setAmountPercent(33.33)">
        <img src="../assets/third.svg" class="center">
      </div>
      <div class="themed icon-tiny button"  v-bind:style="{ borderColor: theme.color }"
        @click="setAmountPercent(25)">
        <img src="../assets/quarter.svg" class="center">
      </div>
      <div class="themed icon-tiny button"  v-bind:style="{ borderColor: theme.color }"
        @click="setAmountPercent(20)">
        <img src="../assets/fifth.svg" class="center">
      </div>
    </div>
    <oak-modal v-if="showModal"
      @ok="setAmountPercent"
      @cancel="showModal = false">
      <h3 slot="header">Enter percentage of   {{ balance }} {{ name }}</h3>
      <div slot="content">
        <input class="oak-input-number" size=  "3" min="1" max="100" type="number"   placeholder="Percent" v-model="amt_percent">
        </input> %
      </div>
    </oak-modal>
  </div>
</template>

<script>

export default {

  props: [ 'amount', 'balance', 'buy', 'name', 'pair', 'precision', 'activePrice', 'theme' ],

  data () {
    return {
      locAmount: this.amount,
      amt_percent: '',
      baseActive: false,
      baseAmount: '',
      showModal: false
    }
  },

  computed: {
    pairGain () {
      return this.buy
        ? Number((this.locAmount / this.activePrice).toFixed(this.precision))
        : Number((this.locAmount * this.activePrice).toFixed(this.precision))
    }
  },

  methods: {
    blurBase () {
      console.log('emit blurBase')
      if (isNaN(this.baseAmount)) this.baseAmount = 'Must be a number!'
    },
    blurQuote () {
      console.log('emit blur')
      if (isNaN(this.locAmount)) this.locAmount = 'Must be a number!'
    },
    setAmount (x) {
      this.locAmount = Number(x)
      this.$emit('set_amount', this.locAmount)
    },
    setAmountPercent (x) {
      if (x) {
        this.locAmount = Number(((x / 100) * this.balance)
          .toFixed(this.precision))
      } else {
        this.locAmount =
          Number(((this.amt_percent / 100) * this.balance)
            .toFixed(this.precision))
      }
      if (this.activePrice) this.baseAmount = this.locAmount / this.activePrice
      this.showModal = false
      this.$emit('set_amount', this.locAmount)
    },
    togglebaseActive () {
      this.baseActive = !this.baseActive
      if (isNaN(this.baseAmount)) this.baseAmount = 'Must be a number!'
      if (isNaN(this.locAmount)) this.locAmount = 'Must be a number!'
      if (!isNaN(this.activePrice)) {
        if (this.baseActive) {
          if (!isNaN(this.locAmount)) this.baseAmount = this.locAmount / this.activePrice
        } else {
          if (!isNaN(this.baseAmount)) this.locAmount = this.baseAmount * this.activePrice
        }
      }
    }
  }
}
</script>

<style scoped>
.themed{
  border-style: solid;
  background-color: white;
}
</style>
