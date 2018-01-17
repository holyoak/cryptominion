<template>
  <div>
    <div class="app-row i-center" style="height: 1.8rem">
      <oak-checkbox
        :checked="order.stopLoss.active"
        @click="toggleStopLoss"></oak-checkbox>
      <div v-if="!order.stopLoss.active">Stop Loss</div>
      <div v-if="order.stopLoss.active" class="app-row i-center">
        <oak-input-number label="Stop Loss: " placeholder="Enter stop loss %"
          @output="setStopLoss"
          :theme="numberTheme"
          :value="order.stopLoss.percent"/>%
      </div>
    </div>
    <div class="app-row i-center">
      <oak-checkbox
        :checked="order.trailStop.active"
        @click="toggleTrailStop"/>      
      <div v-if="!order.trailStop.active" style="height: 3.6rem" class="app-col j-around">
        <div>Trailing Stop</div>
      </div>
      <div v-if="order.trailStop.active" class="app-row i-center">
        <div>
          <oak-input-number label="Init Trailing Stop: " placeholder="Enter profit %"
            @output="setInitTrailStop"
            :theme="numberTheme"
            :value="order.trailStop.initPercent"/>
          <oak-input-number label="Execute Trailing Stop: " placeholder="Enter loss %"
            @output="setExecTrailStop"
            :theme="numberTheme"
            :value="order.trailStop.execPercent"/>
        </div>         
      </div>
    </div>
    <div class="app-row i-center" style="height: 1.8rem">
      <oak-checkbox
        :checked="order.targetPrice.active"
        @click="toggleTargetPrice"></oak-checkbox>
      <div v-if="!order.targetPrice.active">Target Price</div>
      <div v-if="order.targetPrice.active" class="app-row i-center">
        <oak-input-number label="Target Profit: " placeholder="Enter profit %"
          @output="setTargetPrice"
          :theme="numberTheme"
          :value="order.targetPrice.percent"/>%
      </div>
    </div>
  </div>
</template>

<script>
import theming from '../theming'

export default {

  props: [ 'order', 'theme' ],

  data () {
    return {}
  },

  methods: {
    setExecTrailStop (x) { this.$emit('set_exec_trail_stop', x) },
    setInitTrailStop (x) { this.$emit('set_init_trail_stop', x) },
    setStopLoss (x) { this.$emit('set_stop_loss', x) },
    setTargetPrice (x) { this.$emit('set_target_price', x) },
    toggleStopLoss (x) { this.$emit('toggle_stop_loss', !x) },
    toggleTargetPrice (x) { this.$emit('toggle_target_price', !x) },
    toggleTrailStop (x) { this.$emit('toggle_trail_stop', !x) }
  },

  mixins: [theming]

}
</script>

<style>
</style>