import Vue from 'vue'

Vue.component('oak-input', {
  template: require('./template.html'),
  props: [ 'value' ],
  data () {
    return {
      localValue: 'edit me',
      showInput: false
    }
  },

  computed: {
    isNAN () {
      return isNaN(this.localValue)
    }
  },
  methods: {
    myEmit: function () {
      console.log('emit is called')
      this.$emit('myEmit', this.localValue)
    }
  }
})
