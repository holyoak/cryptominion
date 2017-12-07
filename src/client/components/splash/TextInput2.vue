<template>
<div class="app-col j-center i-center">
  Some other component
  <div class="app-row full-span left">{{label}}</div>
  <input v-model="userInput">
  </input>
</div>
</template>

<script>

export default {
  name: 'oak-text-input2',

  props: [ 'label', 'userInput' ],

  data () {
    return {
      text: 'Input Text'
    }
  },

  methods: {
    onClickChild (value) {
      this.active = value
    }
  }
}
</script>

<style>
</style>
