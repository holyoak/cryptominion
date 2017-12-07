<template>
<div class="stops">
  <div class="app-rowrap j-even">
    <div class="app-row i-center">
      <md-checkbox v-model="stopLoss.active"></md-checkbox>
      <div v-if="!stopLoss.active"><small>Stop Loss</small></div>
      <div class="small-icon"
        v-if="stopLoss.active"
        @click="openDialog('percentStopLossDialog')">
        <img src="../assets/percent.svg">
      </div>
      <div v-if="stopLoss.active">
        <md-input-container>
          <label>Stop Loss</label>
          <md-input id="stopLoss" type="text" placeholder="Stop Loss" v-model.number="stopLoss.price"></md-input>
          </md-input-container>
      </div>
    </div>
    <div class="app-row i-center">
      <md-checkbox v-model="trailStop.active"></md-checkbox>
      <div v-if="!trailStop.active"><small>Trailing Stop</small></div>
      <div class="small-icon"
        v-if="trailStop.active"
        @click="openDialog('percentTrailStopDialog')">
        <img src="../assets/percent.svg">
      </div>
      <div v-if="trailStop.active" class="percent">
        <md-input-container>
          <label>Trailing Stop Starts</label>
          <md-input id="trail_stop" type="text" placeholder="Trailing Stop Starts" v-model.number="trailStop.activePercent">
          </md-input>
        </md-input-container>
      </div>
      <div v-if="trailStop.active" class="percent">
        <md-input-container>
          <label>Trailing Stop Stops</label>
            <md-input id="trail_stop" type="text" placeholder="Trailing Stop  Stops" v-model.number="trailStop.stopPercent">
            </md-input>
        </md-input-container>
      </div>
    </div>

    <div class="app-row i-center">
      <md-checkbox v-model="autoClose.active"></md-checkbox>
      <div v-if="!autoClose.active"><small>Auto Close</small></div>
      <div class="small-icon"
        v-if="autoClose.active"
        @click="openDialog('percentAutoCloseDialog')">
        <img src="../assets/percent.svg">
      </div>
      <div v-if="autoClose.active">
        <md-input-container>
          <label>Closing Price</label>
          <md-input id="auto_close" type="text" placeholder="Closing Price" v-model.number="autoClose.price"></md-input>
          </md-input-container>
      </div>
    </div>

    <div class="app-row i-center">
      <md-checkbox v-model="strategy.active"></md-checkbox>
      <div v-if="!strategy.active"><small>Strategy</small></div>
      <div v-if="strategy.active">
      Auto Reverse
      </div>
    </div>
<!--       <div class="app-row j-end core-buttons">
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
 -->
  </div>

        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="percentStopLossDialog">
          <md-dialog-title>Set Stop Loss Percentage</md-dialog-title>

          <md-dialog-content>
            <md-input-container>
            <md-input id="stop_loss_percent" type="number" placeholder="Percentage" v-model.number="stopLoss.percent">
            </md-input>
            </md-input-container>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('percentStopLossDialog')">Cancel</md-button>
            <md-button class="md-primary" @click="setStopLossPercent(stop_loss_percent, 'percentStopLossDialog')">Ok</md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="percentTrailStopDialog">
          <md-dialog-title>Set Trailing Stop Percentages</md-dialog-title>

          <md-dialog-content>
            <md-input-container>
            <label>Percentage profit for trailing stop to activate:</label>
            <md-input id="trail_active_percent" type="number" placeholder="When to start?" v-model.number="trailStop.activePercent">
            </md-input>
            </md-input-container>
            <md-input-container>
            <label>Percentage profit loss for stop to execute:</label>
            <md-input id="trail_stop_percent" type="number" placeholder="When to start?" v-model.number="trailStop.stopPercent">
            </md-input>
            </md-input-container>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('percentTrailStopDialog')">Cancel</md-button>
            <md-button class="md-primary"
              @click="setTrailStopPercent(trail_active_percent, trail_stop_percent, 'percentTrailStopDialog')">Ok
            </md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-dialog md-open-from="#custom" md-close-to="#custom" ref="percentAutoCloseDialog">
          <md-dialog-title>Set Auto Closing Percentage</md-dialog-title>

          <md-dialog-content>
            <md-input-container>
            <md-input id="auto_close_percent" type="number" placeholder="Percentage" v-model.number="autoClose.percent">
            </md-input>
            </md-input-container>
          </md-dialog-content>

          <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('percentAutoCloseDialog')">Cancel</md-button>
            <md-button class="md-primary"
              @click="setAutoClosePercent(auto_close_percent, 'percentAutoCloseDialog')">Ok
            </md-button>
          </md-dialog-actions>
        </md-dialog>

</div>
</template>

<script type="text/javascript">
  export default {
    props: [ 'best', 'next', 'precision', 'price', 'side' ],

    data: () => {
      return {
        stopLoss: {
          active: false,
          percent: '',
          price: ''
        },
        trailStop: {
          active: false,
          activePercent: '',
          stopPercent: ''
        },
        autoClose: {
          active: false,
          percent: '',
          price: ''
        },
        strategy: {
          active: false,
          name: ''
        },
        stop_loss: '',
        stop_loss_percent: '',
        trail_stop: '',
        trail_active_percent: '',
        trail_stop_percent: '',
        auto_close: '',
        auto_close_percent: ''
      }
    },

    methods: {
      openDialog (ref) {
        this.$refs[ref].open()
      },
      closeDialog (ref) {
        this.$refs[ref].close()
      },
      setStopLossPercent (x, ref) {
        const side = this.side === 'buy'
          ? Number(1 - this.stopLoss.percent / 100)
          : Number(1 + this.stopLoss.percent / 100)
        this.stopLoss.price = (this.price * side).toFixed(this.precision)
        this.stop_loss_percent = x
        if (ref) this.closeDialog(ref)
      },
      setTrailStopPercent (active, stop, ref) {
        if (ref) this.closeDialog(ref)
      },
      setAutoClosePercent (x, ref) {
        const side = this.side === 'buy'
          ? Number(1 + this.autoClose.percent / 100)
          : Number(1 - this.autoClose.percent / 100)
        this.autoClose.price = (this.price * side).toFixed(this.precision)
        this.auto_close_percent = x
        if (ref) this.closeDialog(ref)
      }
    }
  }
</script>

<style>
.stops{
  overflow-y: scroll;
  width: 100%;
}
.percent{
}
</style>
