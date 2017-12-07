<template>
<div class="tickerbox">
  <div class="tickgraph" v-bind:style="{ backgroundColor: background, width: width }"></div>
  <div class="tickprice" v-bind:style="{ color: color }">
    {{price}}
  </div>
</div>
</template>

<script>
  export default {
    props: ['tick', 'precision'],

    computed: {
      background: function () {
        return this.tick.side === 'buy' ? '#C52D2D' : '#429D42'
      },
      color: function () {
        return this.tick.side === 'buy' ? 'red' : 'green'
      },
      price: function () {
        return Number(this.tick.price).toFixed(this.precision)
      },
      width: function () {
        // hard coded lazy late night hack
        let w = this.tick.size > 10 ? 10 : Number(this.tick.size).toFixed(1)
        return w + 'em'
      }
    },

    data: () => { return {} }
}
</script>

<style scoped>
.tickerbox{
  background-color: black;
  position: relative;
  width: 11em;
}
.tickgraph{
  height: 1.5em;
}
.tickprice{
  position:absolute;
  top: 0px;
  right: 0px;
}
</style>
