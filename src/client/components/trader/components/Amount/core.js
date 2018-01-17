'use strict'

export default {

  props: [
    'activePrice',
    'amount',
    'balance',
    'buy',
    'name',
    'pair',
    'precision',
    'theme'
  ],

  data () {
    return {
      locAmount: this.amount,
      amt_percent: '',
      baseActive: false,
      baseAmount: '',
      showModal: false
    }
  },

  computed: {
    activeBase () {
      if (this.activePrice > 0 && this.baseActive === true &&
        Number(this.amount) >= 0 && this.amount !== '') return true
      else return false
    },
    activeNone () {
      if (this.activePrice === false || Number(this.amount) <= 0) return true
      else return false
    },
    activeQuote () {
      if (this.activePrice > 0 && this.baseActive === false &&
        Number(this.amount) >= 0 && this.amount !== '') return true
      else return false
    },
    pairGain () {
      return this.buy
        ? Number((this.locAmount / this.activePrice).toFixed(this.precision))
        : Number((this.locAmount * this.activePrice).toFixed(this.precision))
    }
  },

  methods: {
    blurBase () {
      console.log('emit blurBase')
      if (isNaN(this.baseAmount)) this.baseAmount = 'Must be a number!'
    },
    blurQuote () {
      console.log('emit blur')
      if (isNaN(this.locAmount)) this.locAmount = 'Must be a number!'
    },
    setAmount (x) {
      this.locAmount = Number(x)
      this.$emit('set_amount', this.locAmount)
    },
    setAmountPercent (x) {
      if (x) {
        this.locAmount = Number(((x / 100) * this.balance)
          .toFixed(this.precision))
      } else {
        this.locAmount =
          Number(((this.amt_percent / 100) * this.balance)
            .toFixed(this.precision))
      }
      if (this.activePrice) this.baseAmount = this.locAmount / this.activePrice
      this.showModal = false
      this.$emit('set_amount', this.locAmount)
    },
    togglebaseActive () {
      this.baseActive = !this.baseActive
      if (!isNaN(this.activePrice)) {
        if (this.baseActive) {
          if (!isNaN(this.locAmount)) this.baseAmount = this.locAmount / this.activePrice
        } else {
          if (!isNaN(this.baseAmount)) this.locAmount = this.baseAmount * this.activePrice
        }
      }
    }
  }
}
