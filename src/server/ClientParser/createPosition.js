'use strict'

module.exports = {
  createOrders: createOrders
}
  /**
   * parse position object into array of ccxt orders
   * @param  {Object} data        newPosition Object from TradePanel.vue
   * @return {Array}              Array of orders formatted for ccxt
   */
function createOrders (data) {
  const res = []
  console.log('Into createOrders')
  console.log('data is ' + JSON.stringify(data))
  if (data.side === 'sell') {
    if (data.portions.active === true) {
      const p = data.portions
      const range = data.price * p.rangePercent * 0.01
      const step = range / (p.portions - 1)
      const min = p.around === false ? data.price : data.price - (range / 2)
      let i = 0
      while (i < data.portions.portions) {
        res.push({
          amount: Number((data.amount / p.portions).toFixed(data.precision)),
          price: Number(Number(min + (i * step)).toFixed(data.precision)),
          limitOnly: data.limitOnly,
          side: data.side,
          symbol: data.symbol
        })
        i++
      }
    } else {
      // this should be forced to min two portions for better CRUD
      res.push({
        amount: Number(data.amount),
        price: Number(data.price),
        limitOnly: data.limitOnly,
        side: data.side,
        symbol: data.symbol
      })
    }
  } else {
    const amount = data.amount / data.price
    if (data.portions.active === true) {
      const p = data.portions
      const range = data.price * p.rangePercent * 0.01
      const step = range / (p.portions - 1)
      const min = p.around === false ? Number(data.price  - range) : data.price - (range / 2)
      let i = 0
      while (i < p.portions) {
        res.push({
          amount: Number((amount / p.portions).toFixed(data.precision)),
          price: Number(Number(min + (i * step)).toFixed(data.precision)),
          limitOnly: data.limitOnly,
          side: data.side,
          symbol: data.symbol
        })
        i++
      }
    } else {
      // this should be forced to min two portions for better CRUD
      res.push({
        amount: Number(amount.toFixed(data.precision)),
        price: Number(data.price),
        limitOnly: data.limitOnly,
        side: data.side,
        symbol: data.symbol
      })
    }
  }
  return res
}
