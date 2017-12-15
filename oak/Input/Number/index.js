// register global gui components
import Vue from 'vue'

Vue.component('oak-input-number', {
  template: require('./template.html'),
  props: [ 'label', 'placeholder', 'theme', 'value' ],
  data () {
    return {
      dirty: false,
      locPlaceholder: this.setPlaceholder(),
      locValue: this.value,
      showInput: false
    }
  },

  computed: {
    activeStyle () {
      if (isNaN(this.locDisplay) && this.dirty === true) return this.theme.err
      else if (this.locDisplay === this.placeholder) return this.theme.virgin
      else return this.theme.complete
    },
    locLabel () {
      if (this.label.length > 0 &&
       typeof this.label === 'string' &&
       this.locDisplay !== this.placeholder &&
       this.showInput === false) {
        return this.label
      } else return false
    },
    locDisplay () {
      if (!isNaN(this.value) && Number(this.value) > 0) return this.value
      else return this.locPlaceholder
    },
    makeDirty () {
      if (this.locDisplay !== this.placeholder ||
        this.locValue !== this.value) this.dirty = true
    },
    notValid () {
      return ((isNaN(this.locValue) && isNaN(this.locDisplay)) &&
        this.dirty === true)
    }
  },
  methods: {
    output () {
      this.showLabel = true
      this.showInput = false
      if (!isNaN(this.locValue)) this.$emit('output', this.locValue)
    },
    parse () {
      if (this.notValid || isNaN(this.locValue)) {
        this.locPlaceholder = this.locValue
      } else this.locValue = Number(this.locValue)
    },
    setPlaceholder () {
      if (this.placeholder.length > 0 && typeof this.placeholder === 'string') {
        return this.placeholder
      } else return ''
    },
    showUI () {
      if (this.value !== '' && this.dirty === true) {
        this.locValue = Number(this.value)
      }
      this.showInput = true
      this.$nextTick(() => this.$refs.ui.focus())
    }
  }
})
