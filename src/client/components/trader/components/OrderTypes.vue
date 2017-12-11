<template>
<div class="app-rowrap j-even order-types">
    <div class="app-row i-center" v-if="hasLimit">
      <oak-checkbox
        :checked="limitOnly"
        v-on:click="toggleLimitOnly"></oak-checkbox>
      <div><small>Limit Only</small></div>
    </div>
    <div class="app-row i-center" v-if="types!=null">
      <div><small>Order Type:</small></div>
      <select v-model="type">
        <option v-for="option in types" v-bind:value="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class="app-row i-center j-end" v-if="activePrice">
      <oak-checkbox
        :checked="portions.active"
        v-on:click="togglePortions"></oak-checkbox>
      <div v-if="nonActive"><small>Portions</small></div>
    </div>
    <div v-if="!nonActive" class="app-col">
        <small>{{portions.portions}} Portions</small>
        <small>Price min:{{range.min}}, max:{{range.max}}</small>
        <div class="faux-button" @click="modalView">Edit</div>
    </div>
    <oak-modal v-if="showModal"
      @ok="emitPortions"
      @cancel="cancelPortions">
      <h3 slot="header">Split Position into Portions</h3>
      <div slot="content">
        <p>How many portions for the position?</p>
        <p><small>(min 3 max 10)</small></p>
        <input class="oak-input-number" min="3" max="10" type="number"   placeholder="Portions" v-model.number="localPortions.portions">
        <p>The range should start</p>
          <div class="app-col">
            around<oak-checkbox
            :checked="localPortions.around"
            v-on:click="localPortions.around=!localPortions.around">
            </oak-checkbox>
            {{rangeLabel}}<oak-checkbox
            :checked="!localPortions.around"
            v-on:click="localPortions.around=!localPortions.around">
            </oak-checkbox>
          </div>
        <p>the opening price of {{activePrice}} {{quoteName}} and span</p>
        <div v-if="!setRange" class="app-row j-between">
          <div class="mini-button" @click="toggleSetRange">%</div>
          <input class="oak-input-number" type="number" placeholder="Range" v-model.number="localRangeSpan"> {{quoteName}}
        </div>
        <div v-if="setRange" class="app-row j-between">
          <div class="mini-button" @click="toggleSetRange">{{quoteName}}</div>
          <input class="oak-input-number" type="number" min="1" max="100" placeholder="Range" v-model.number="localPortions.rangePercent"> %
        </div>
        <div>
          Current Selection
          min price: {{localRange.min}}
          max price: {{localRange.max}}
        </div>
      </div>
    </oak-modal>
</div>
</template>

<script type="text/javascript">

export default {

  props: [
    'activePrice',
    'hasLimit',
    'limitOnly',
    'type',
    'portions',
    'range',
    'rangeLabel',
    'types',
    'quoteName' ],

  data () {
    return {
      showModal: false,
      setRange: true,
      localPortions: {
        active: false,
        around: true,
        portions: null,
        rangePercent: null
      },
      localRangeSpan: null
    }
  },

  computed: {
    nonActive () {
      return (this.range === false || this.portions.active === false)
    },
    localRange () {
      if (isNaN(this.localRangeSpan)) return false
      else {
        const step = Number(this.localPortions.rangePercent / 100)
        if (this.localPortions.around === true) {
          return {
            max: this.activePrice * (Number(1 + (step / 2))),
            min: this.activePrice * (Number(1 - (step / 2)))
          }
        } else {
          if (this.rangeLabel === 'below') {
            return {
              max: this.activePrice,
              min: this.activePrice * (Number(1 - step))
            }
          } else {
            return {
              max: this.activePrice * (Number(1 + step)),
              min: this.activePrice
            }
          }
        }
      }
    },
    rangeSpan () {
      if (isNaN(this.range.max) || isNaN(this.range.min)) {
        return ''
      } else return this.range.max - this.range.min
    }
  },

  methods: {
    modalView () {
      this.localPortions = JSON.parse(JSON.stringify(this.portions))
      // this.localRange = JSON.parse(JSON.stringify(this.range))
      this.localRangeSpan = this.rangeSpan
      this.showModal = true
    },
    toggleLimitOnly (x) {
      this.$emit('toggle_limit_only', !x)
    },
    togglePortions (x) {
      this.$emit('toggle_portions', !x)
    },
    toggleSetRange () {
      this.setRange = !this.setRange
    },
    cancelPortions (x) {
      this.showModal = false
    },
    emitPortions () {
      this.showModal = false
      if (this.setRange === false) {
        this.localPortions.rangePercent =
           Number(this.localRangeSpan / this.activePrice * 100).toFixed(4)
      }
      this.$emit('set_portions', this.localPortions)
    }

  }

}
</script>

<style scoped>
.faux-button{
  cursor:pointer;
  background-color: #404AC2;
  color: white;
  margin-left: 1rem;
}

.order-types{
  width: 100%;
}

.mini-button{
  cursor: pointer;
  background-color: #3C4BA7;
  color: #BFA9A9;
  width: 3rem;
}

.portions{
  margin: 0rem;
  padding: 0rem;
}
</style>
