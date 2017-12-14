// register global gui components
import Vue from 'vue'

Vue.component('oak-input-number', {
  template: require('./template.html'),
  props: [ 'label', 'placeholder', 'value' ],
  data () {
    return {
      dirty: false,
      locPlaceholder: this.setPlaceholder(),
      locValue: this.value,
      NaN: false,
      showInput: false
    }
  },

  computed: {
    locLabel () {
      if (this.label.length > 0 &&
       typeof this.label === 'string' &&
       this.dirty === true &&
       this.showInput === false) {
        return this.label
      } else return false
    },
    locDisplay () {
      if (!isNaN(this.value)  && Number(this.value) > 0) return this.value
      else return this.locPlaceholder
    }
  },
  methods: {
    output () {
      this.dirty = true
      this.showLabel = true
      this.showInput = false
      console.log('this.locValue is ' + JSON.stringify(this.locValue))
      if (!isNaN(this.locValue)) this.$emit('output', this.locValue)
    },
    parse () {
      if (!isNaN(this.locValue)) {
        this.locValue = Number(this.locValue)
        this.NaN = false
      } else this.NaN = true
      this.locPlaceholder = this.locValue
    },
    setPlaceholder () {
      if (this.placeholder.length > 0 && typeof this.placeholder === 'string') {
        return this.placeholder
      } else return ''
    },
    showUI () {
      this.showInput = true
      this.$nextTick(() => this.$refs.ui.focus())
    }
  }
})
