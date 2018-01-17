'use strict'

export default {

  props: [
    'activePrice',
    'hasLimit',
    'limitOnly',
    'portions',
    'precision',
    'quoteName',
    'range',
    'rangeLabel',
    'theme',
    'type',
    'types' ],

  data () {
    return {
      showModal: false,
      setRange: true,
      localPortions: {
        active: false,
        around: true,
        portions: null,
        rangePercent: null
      },
      localRangeSpan: null
    }
  },

  computed: {
    nonActive () {
      return (this.range === false || this.portions.active === false)
    },
    localRange () {
      if (isNaN(this.localRangeSpan)) return false
      else {
        const step = Number(this.localPortions.rangePercent / 100)
        if (this.localPortions.around === true) {
          return {
            max: this.setPrecision(this.activePrice * (Number(1 + (step / 2)))),
            min: this.setPrecision(this.activePrice * (Number(1 - (step / 2))))
          }
        } else {
          if (this.rangeLabel === 'below') {
            return {
              max: this.setPrecision(this.activePrice),
              min: this.setPrecision(this.activePrice * (Number(1 - step)))
            }
          } else {
            return {
              max: this.setPrecision(this.activePrice * (Number(1 + step))),
              min: this.setPrecision(this.activePrice)
            }
          }
        }
      }
    },
    rangeSpan () {
      if (isNaN(this.range.max) || isNaN(this.range.min)) {
        return ''
      } else return this.range.max - this.range.min
    }
  },

  methods: {
    modalView () {
      this.localPortions = JSON.parse(JSON.stringify(this.portions))
      // this.localRange = JSON.parse(JSON.stringify(this.range))
      this.localRangeSpan = this.rangeSpan
      this.showModal = true
    },
    setPrecision (x) { return Number(x.toFixed(this.precision)) },
    toggleLimitOnly (x) { this.$emit('toggle_limit_only', !x) },
    togglePortions (x) { this.$emit('toggle_portions', !x) },
    toggleSetRange () { this.setRange = !this.setRange },
    cancelPortions (x) { this.showModal = false },
    emitPortions () {
      this.showModal = false
      if (this.setRange === false) {
        this.localPortions.rangePercent =
           Number(this.localRangeSpan / this.activePrice * 100).toFixed(4)
      }
      this.$emit('set_portions', this.localPortions)
    }

  }

}
