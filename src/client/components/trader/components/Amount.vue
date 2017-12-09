<template>
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
</template>

<script>

export default {

  data () { return {} },

  methods: {
    setAmountPercent (x, ref) {
      const p = this.asset.side === 'buy'
        ? this.market.quote.precision
        : this.market.base.precision
      this.newOrder.amount = Number(((x / 100) * this.activeBalance)
        .toFixed(p))
      if (ref) this.closeDialog(ref)
    }
  }
}
</script>

<style scoped>
</style>
