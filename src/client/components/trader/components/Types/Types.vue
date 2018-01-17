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
      <div v-if="!nonActive" class="app-col button set-portions"
        @click="modalView"
        :style="{ borderColor: theme.accent, backgroundColor: theme.color }">
        <div style="height: 0.75rem;">
          <small>{{portions.portions}} orders</small>
        </div>
        <div style="height: 0.75rem;">
          <small>min:{{range.min}}</small>
        </div>
        <div style="height: 0.75rem;">
          <small>max:{{range.max}}</small>
        </div>
      </div>
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
          <div class="button icon-small" @click="toggleSetRange">%</div>
          <input type="number" placeholder="Range" v-model.number="localRangeSpan"> {{quoteName}}
        </div>
        <div v-if="setRange" class="app-row j-between">
          <div class="button icon-small"
            @click="toggleSetRange">{{quoteName}}</div>
          <input type="number" min="1" max="100" placeholder="Range" v-model.number="localPortions.rangePercent"> %
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

<script>
import core from './core'
import theming from '../theming'

export default {
  mixins: [theming, core]
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
