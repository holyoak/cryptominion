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
        :checked="portions"
        v-on:click="setPortions('x')"></oak-checkbox>
      <div><small>Portions</small></div>
    </div>
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
      orderType: 'GTC'
    }
  },

  methods: {
    setMakerOnly: function (x) {
      this.$emit('set_maker_only', !x)
    },
    setPortions: function (x) {
      this.$emit('portions', x)
    }

  }

}
</script>

<style scoped>
.order-types{
  width: 100%;
}
</style>
