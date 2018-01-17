<template>
  <div class="icon-tiny button" :style="theme"
    @click="emit">
    <img :src="img" class="center">
  </div>
</template>

<script>

export default {
  props: ['icon', 'theme'],

  data () { return {} },

  computed: {
    img () {
      return require('../assets/' + this.icon + '.svg')
    }
  },

  methods: {
    emit () { this.$emit('click') }
  }
}
</script>

<style scoped>
</style>
