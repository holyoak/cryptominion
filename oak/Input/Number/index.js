// <input type="number"> material design component for Vue.js
//
// usage (all properties optional):
// <oak-input-number
//   @output=[Function]           your update method
//   value=[Number]               parent data bound to this instance
//   label=[String]               label for displayed data
//   placeholder=[String]         input placeholder
//   theme=[OakTheme Object]      oak material theme definition
//   width=[???]
//   params= see below
// />
//   params object properties are all optional.  Default settings shown.
//     all props above (except output) can be attached to params for brevity
//
//   params=[Object{
//     anim: [user default]       animates state changes
//     border: false              displays border
//     colors: true               displays state change colors
//     dur: [user default]        animation duration
//     theme: true                displays parent theme colors
//     underline: true            displays underline
//     error:[String]             custom error message for non number input
//     max:[Number]               max numeric value allowed for input
//     maxError:[String]          custom error message for input over max value
//     min:[Number]               min numeric value allowed for input
//     minError:[String]          custom error message for input under min value
//     precision:[Integer]        max decimal places, 10x for negative numbers
//   }]
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
      if (!isNaN(this.value) && this.value !== '') return this.value
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
