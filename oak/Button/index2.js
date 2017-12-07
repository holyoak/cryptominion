// register global gui components
import Vue from 'vue'
import config from '../config.json'

Vue.component('oak-button', {
  template: require('./template.html'),
  props: [ 'active' ],
  data () {
    return {
      dur: config.animDuration
    }
  },
  computed: {

  },
  methods: {

  },

  mounted: function () {
    const ref = this.$refs.oakButton
    this.svgDOMX = ref.getBoundingClientRect().left
    this.svgDOMY = ref.getBoundingClientRect().top
  }
})
