'use strict'
// const u = require('./utils')

module.exports = {
  parseBalances: parseBalances,
  parseMarkets: parseMarkets
}

/**
 * normalize Bittrex market data into app schema
 * @param  {Object}      data           raw ccxt loadMarkets() return data from GDAX
 * @return {Object}                     normalized data
 */
function parseBalances (data) {
  const res = {}
  for (const x in data.total) {
    res[x] = {
      id: x,
      balance: data.total[x],
      available: data.free[x]
    }
  }
  return res
}

/**
 * normalize Bittrex market data into app schema
 * @param  {Object}      data           raw ccxt loadMarkets() return data from GDAX
 * @return {Object}                     normalized data
 */
function parseMarkets (data) {
  const res = {}
  for (const x in data) {
    const id = normalizeID(data[x].id)
    res[id] = {
      id: id,
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

/**
 * normalize marketID to <base>-<quote> syntax
 * @param  {String} marketID         raw data marketID
 * @return {String}                  normalized marketID
 */
function normalizeID (marketID) {
  const res = {}
  const i = marketID.indexOf('-')
  res.base = marketID.slice(i + 1)
  res.base = res.base === 'USDT' ? 'USD' : res.base
  res.quote = marketID.slice(0, i)
  res.quote = res.quote === 'USDT' ? 'USD' : res.quote
  res.id = res.base + '-' + res.quote
  return res.id
}
