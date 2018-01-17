<template>
  <div>
    <div class="app-row j-between i-start">
      <div style="margin-right: 0.5rem; width: 100%;">
        <oak-input-number label="Price: " placeholder="Enter Price in pair"
          @output="setPrice"
          :theme="numberTheme"
          :value="price"/>
      </div>
      <div>{{ name }}</div>
    </div>
    <div class="app-row j-end core-buttons">
      <mini-button :style="buttonTheme" icon="percent"
        @click="showModal=true"/>
      <mini-button :style="buttonTheme" icon="best"
        @click="setPrice('best')"/>
      <mini-button :style="buttonTheme" icon="split"
        @click="setPrice('split')"/>
      <mini-button :style="buttonTheme" icon="next"
        @click="setPrice('next')"/>
    </div>
  </div>
</template>

<script>
import miniButton from './miniButton'
import theming from './theming'

export default {
  props: [
    'loaded',
    'name',
    'precision',
    'price',
    'theme'
  ],

  components: {
    miniButton
  },

  data () {
    return {
      locPrice: this.price,
      price_percent: '',
      showModal: false
    }
  },

  methods: {
    setPrice () {
      console.log('into set price')
    }
  },

  mixins: [theming]
}
</script>

<style>
</style>