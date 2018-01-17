'use strict'
const chalk = require('chalk')
const utils = require('../utils')

module.exports = function (x) {
  x.flag = x.data.amount === '0' ? 'remove' : 'modify'
  const res = { data: { exchange: x.exKey, market: x.market } }
  if (x.data.type === 'ask') {
    // commit mutation
    if (x.flag === 'modify') { x.book.asks[x.data.rate] = x.data.amount }
    if (x.flag === 'remove') { delete x.book.asks[x.data.rate] }
    // check for new best ask
    if (Number(x.data.rate) < Number(x.book.bestAsk)) {
      x.book.bestAsk = x.data.rate
      res.flag = 'new best ask'
      res.data.best = x.data.rate
      utils.relayData(res, x.socket)
      if (x.log === true) console.log('new best ask ' + chalk.red(x.data.rate) + '  <-- ' + x.flag)
    }
  }

  if (x.data.type === 'bid') {
    // commit mutation
    if (x.flag === 'modify') { x.book.bids[x.data.rate] = x.data.amount }
    if (x.flag === 'remove') { delete x.book.bids[x.data.rate] }
    // check for new best bid
    if (Number(x.data.rate) > Number(x.book.bestBid)) {
      x.book.bestBid = x.data.rate
      res.flag = 'new best bid'
      res.data.best = x.data.rate
      utils.relayData(res, x.socket)
      if (x.log === true) console.log('new best bid ' + chalk.green(x.data.rate) + '  <-- ' + x.flag)
    }
  }
  return x.book
}
