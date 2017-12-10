<template>
  <div class="app-col core-wrapper">
    <div>
      Available {{ name }}: {{ balance }}
    </div>
    <input v-model.number="amount" placeholder="Amount" type="text">
    <div class="app-row j-end core-buttons">
      <div class="small-icon"
        @click="showModal=true">
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

  props: [ 'balance', 'name', 'precision' ],

  data () {
    return {
      amount: '',
      amt_percent: '',
      showModal: false
    }
  },

  methods: {
    setAmountPercent (x) {
      if (x) {
        this.amount = Number(((x / 100) * this.balance)
          .toFixed(this.precision))
      } else {
        this.amount =
          Number(((this.amt_percent / 100) * this.balance)
            .toFixed(this.precision))
      }
      this.showModal = false
      this.$emit('set_amount', this.amount)
    }
  }
}
</script>

<style scoped>
</style>
