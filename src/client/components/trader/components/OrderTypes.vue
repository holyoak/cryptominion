<template>
<div class="app-rowrap j-even order-types">
    <div class="app-row i-center">
      <oak-checkbox
        :active="makerOnly"
        v-on:click="setMakerOnly"></oak-checkbox>
      <div><small>Maker Only</small></div>
    </div>
    <div class="app-row i-center">
      <div><small>Order Type:</small></div>
      <div><small>GTC</small></div>
    </div>
    <div class="app-row i-center">
      <md-checkbox v-model="portions.active"></md-checkbox>
      <div><small>Portions</small></div>
    </div>
</div>
</template>

<script type="text/javascript">

export default {

  props: [ 'makerOnly', 'type', 'portions' ],

  data () { return {} },

  methods: {
    setMakerOnly: function (x) {
      this.$emit('set_maker_only', x)
    }
  }

}
</script>

<style scoped>
.order-types{
  width: 100%;
}
</style>
