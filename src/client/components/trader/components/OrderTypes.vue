<template>
<div class="app-rowrap j-even order-types">
    <div class="app-row i-center">
      <oak-checkbox
        :checked="makerOnly"
        v-on:click="setMakerOnly"></oak-checkbox>
      <div><small>Maker Only</small></div>
    </div>
    <div class="app-row i-center">
      <div><small>Order Type:</small></div>
      <select v-model="orderType">
        <option v-for="option in orderTypes" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="app-row i-center">
      <oak-checkbox
        :checked="portions.active"
        @click="setPortions"></oak-checkbox>
      <div><small>Portions</small></div>
    </div>
    <oak-modal v-if="showModal"
      @ok="setPortions"
      @cancel="showModal = false">
      <h3 slot="header">Split Position into Portions</h3>
      <div slot="content">
        How many portions for the position?
        <input class="oak-input-number" size=  "3" min="1" max="100" type="number"   placeholder="Portions" v-model="amt_percent">
        </input>
        The range should start
        <oak-checkbox
        :checked="portions.active"
        v-on:click="portionStart='around'">
        </oak-checkbox> around
        <oak-checkbox
        :checked="portions.active"
        v-on:click="portionStart='above'">
        </oak-checkbox> above
      </div>
    </oak-modal>
</div>
</template>

<script type="text/javascript">

export default {

  props: [ 'makerOnly', 'type', 'portions' ],

  data () {
    return {
      orderTypes: [
        { text: 'Fill or Kill', value: 'FOK' },
        { text: 'Good til Cancel', value: 'GTC' },
        { text: 'Now or Cancel', value: 'IOC' }
      ],
      orderType: 'GTC',
      portionStart: 'around',
      showModal: false
    }
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
</style>
