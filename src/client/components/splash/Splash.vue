<template>
<div class="app-col j-center i-center">
  Splash Screen
  <oak-checkbox
    :checked="active"
    @click="onClickChild">
  </oak-checkbox>
  <div
    id="must-have-id"
    class="oak-button"
    @click="onClickButton">
    Button
  </div>

  <component
    :is="activeView"
    :label="activeLabel"
    :userInput="activeInput">
  </component>
  <div id="test"></div>
  <oak-modal v-if="active"
    @ok="active = false"
    @cancel="active = false">
    <!--
      you can use custom content here to overwrite
      default content
    -->
    <h3 slot="header">A Custom header</h3>
  </oak-modal>
</div>
</template>

<script>
// import oak from '../../../../oak'
import TextInput from './TextInput'
import OtherTextInput from './TextInput2'
import Practice from './drawing.svg.js'

export default {
  name: 'splash-view',

  components: {
    TextInput,
    OtherTextInput
  },

  data () {
    return {
      active: false,
      practice: Practice,
      currentView: 'text-input',
      label: 'Input Component Label',
      userInput: 'placeholder',
      otherLabel: 'Other Input Component Label',
      otherUserInput: 'other placeholder'
    }
  },

  computed: {
    activeView () {
      return this.active === true ? 'text-input' : 'other-text-input'
    },
    activeLabel () {
      return this.active === true ? this.label : this.otherLabel
    },
    activeInput () {
      return this.active === true ? this.userInput : this.otherUserInput
    }
  },

  mounted () {
    document.getElementById('test').innerHTML = Practice
  },

  methods: {
    onClickChild (value) {
      this.active = value
    },

    onClickButton () {
      this.active = !this.active
    }
  }
}
</script>

<style>
</style>
