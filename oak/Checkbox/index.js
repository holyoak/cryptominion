// register global gui components
import Vue from 'vue'

Vue.component('oak-checkbox', {
  template: require('./template.html'),
  props: [ 'checked' ],
  data () {
    return {}
  },
  computed: {
    checkedSVG: function () {
      return require('./checked.svg')
    },
    notCheckedSVG: function () {
      return require('./notChecked.svg')
    }
  },
  methods: {
    toggleCheck: function () {
      this.$emit('click', !this.checked)
    }
  }
})
