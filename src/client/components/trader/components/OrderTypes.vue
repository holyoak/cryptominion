<template>
<div class="app-rowrap j-even order-types">
    <div class="app-row i-center" v-if="hasLimit">
      <oak-checkbox
        :checked="makerOnly"
        v-on:click="setMakerOnly"></oak-checkbox>
      <div><small>Maker Only</small></div>
    </div>
    <div class="app-row i-center" v-if="types!=null">
      <div><small>Order Type:</small></div>
      <select v-model="orderType">
        <option v-for="option in types" v-bind:value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="app-row i-center" v-if="activePrice">
      <oak-checkbox
        :checked="portions.active"
        @click="setPortions"></oak-checkbox>
      <div><small>Portions</small></div>
    </div>
    <oak-modal v-if="showModal"
      @ok="setPortions"
      @cancel="showModal=false">
      <h3 slot="header">Split Position into Portions</h3>
      <div slot="content">
        <p>How many portions for the position?</p>
        <p><small>(max 10)</small></p>
        <input class="oak-input-number" min="1" max="10" type="number"   placeholder="Portions" v-model="localPortions.portions">
        <p>The range should start</p>
          <div class="app-col">
            around<oak-checkbox
            :checked="rangeAround"
            v-on:click="rangeAround=!rangeAround">
            </oak-checkbox>
            {{rangeLabel}}<oak-checkbox
            :checked="!rangeAround"
            v-on:click="rangeAround=!rangeAround">
            </oak-checkbox>
          </div>
        <p>the opening price and span</p>
        <div v-if="!setRangePercent" class="app-row j-between">
          <div class="mini-button" @click="setRangePercent=true">%</div>
          <input class="oak-input-number" type="number" placeholder="Range" v-model="localPortions.range"> {{quoteName}}
        </div>
        <div v-if="setRangePercent" class="app-row j-between">
          <div class="mini-button" @click="setRangePercent=false">{{quoteName}}</div>
          <input class="oak-input-number" type="number" min="1" max="100" placeholder="Range" v-model="localPortions.rangePercent"> %
        </div>
      </div>
    </oak-modal>
</div>
</template>

<script type="text/javascript">

export default {

  props: [ 'activePrice', 'hasLimit', 'makerOnly', 'type', 'portions', 'rangeLabel', 'types', 'quoteName' ],

  data () {
    return {
      orderType: 'GTC',
      rangeAround: 'around',
      setRangePercent: false,
      showModal: false,
      localPortions: {
        active: false,
        portions: 3,
        range: 0.01,
        rangePercent: 1
      }
    }
  },

  mounted () {
    this.localPortions = this.portions
  },

  methods: {
    setMakerOnly: function (x) {
      this.$emit('set_maker_only', !x)
    },
    setPortions: function (x) {
      console.log('settem')
      if (x === true) this.showModal = true
      this.$emit('set_portions', x)
    }

  }

}
</script>

<style scoped>
.order-types{
  width: 100%;
}

.mini-button{
  cursor: pointer;
  background-color: #3C4BA7;
  color: #BFA9A9;
}

.portions{
  margin: 0rem;
  padding: 0rem;
}
</style>
