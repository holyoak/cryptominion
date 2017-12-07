'use strict'
// const u = require('./utils')

module.exports = {
  parseBalances: parseBalances,
  parseMarkets: parseMarkets
}

/**
 * normalize GDAX market data into app schema
 * @param  {Object}      data           raw ccxt loadMarkets() return data from GDAX
 * @return {Object}                     normalized data
 */
function parseBalances (data) {
  console.log('Into gdax.parseBalances')
  const res = {}
  for (const x in data.total) {
    console.log('x is ' + x)
    res[x] = {
      id: x,
      balance: data.total[x],
      available: data.free[x]
    }
  }
  console.log('gdax.parseBalances res is ' + JSON.stringify(res))
  return res
}

/**
 * normalize GDAX market data into app schema
 * @param  {Object}      data           raw ccxt loadMarkets() return data from GDAX
 * @return {Object}                     normalized data
 */
function parseMarkets (data) {
  console.log('Into gdax.parseMarkets')
  const res = {}
  for (const x in data) {
    res[data[x].id] = {
      id: data[x].id,
      base: {
        name: data[x].base,
        min: data[x].limits.amount.min,
        max: data[x].limits.amount.max,
        precision: data[x].precision.amount
      },
      fees: {
        maker: data[x].maker,
        taker: data[x].taker
      },
      precision: data[x].precision.price,
      quote: {
        name: data[x].quote,
        precision: data[x].precision.price
      }
    }
  }
  return res
}
