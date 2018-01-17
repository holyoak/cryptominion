'use strict'
const chalk = require('chalk')
const utils = require('../../utils')
const color = require('../../../config.json').dataStreams.color

module.exports = function (x) {
  const res = []
  res.push({
    flag: 'new book',
    data: {
      exchange: x.exKey,
      market: x.market,
      book: {
        bestAsk: x.data.asks[0][0],
        bestBid: x.data.bids[0][0]
      }
    }
  })
  // store snapshot state
  const book = {
    bestAsk: x.data.asks[0][0],
    bestBid: x.data.bids[0][0],
    asks: {},
    bids: {}
  }

  // convert from array to object
  x.data.asks.forEach((x) => {
    book.asks[x[0]] = x[1]
  })
  x.data.bids.forEach((x) => {
    book.bids[x[0]] = x[1]
  })
  console.log(chalk.hex(color)('--> orderbook loaded') +
    chalk.green('     GDAX ' + x.market))
  res.forEach((r, i) => {
    utils.relayData(res[i], x.socket)
  })
  book.loaded = 'loaded'
  return book
}
