<template>
  <div class="app-col">
    <div class="button" :style="buttonTheme"
      @click="setAmountPercent(100)">
      Available {{ name }}: {{ balance }}
    </div>
    <div class="app-row j-between i-start">
      <div v-if="buy" style="height: 1.5rem;" class="app-row i-start">
        <oak-checkbox style="height: 1rem; width:1rem;"
          :checked="baseActive"
          v-on:click="togglebaseActive"></oak-checkbox>
        <div>in {{ pair }}</div>
      </div>
      <div v-if="activeQuote">
        {{ pair }} gained: {{ pairGain }}
      </div>
      <div v-if="activeBase">
        {{ name }} used: {{ amount }}
      </div>
      <div v-if="activeNone" style="height: 1.5rem;"></div>
    </div>

    <div v-if="!baseActive" class="app-row j-between i-start">
      <div style="margin-right: 0.5rem; width: 100%;">
        <oak-input-number label="Amount: " placeholder="Enter an Amount"
          @output="setAmount"
          :theme="numberTheme"
          :value="amount"/>
      </div>
      <div>{{ name }}</div>
    </div>
    <div v-if="baseActive" class="app-row j-between i-center">
      <div class="inputCryptoNumber">
        <input v-model.number="baseAmount" placeholder="Amount" type="text"
          @blur="blurBase">
      </div>
      <div>{{ pair }}</div>
    </div>
    <div class="app-row j-end core-buttons">
      <mini-button :style="buttonTheme" icon="percent"
        @click="showModal=true"/>
      <mini-button :style="buttonTheme" icon="half"
        @click="setAmountPercent(50)"/>
      <mini-button :style="buttonTheme" icon="third"
        @click="setAmountPercent(33.33)"/>
      <mini-button :style="buttonTheme" icon="quarter"
        @click="setAmountPercent(25)"/>
      <mini-button :style="buttonTheme" icon="fifth"
        @click="setAmountPercent(20)"/>
    </div>
    <modal :showModal="showModal" :balance="balance" :name="name"
      :value="amt_percent"
      @accept="setAmountPercent"
      @cancel="showModal = false"/>
  </div>
</template>

<script>
import core from './core'
import theming from '../theming'
import miniButton from '../miniButton'
import modal from './modal'

export default {

  components: { miniButton, modal },

  mixins: [theming, core]
}
</script>
