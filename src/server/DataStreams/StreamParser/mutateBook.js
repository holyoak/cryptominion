'use strict'
const chalk = require('chalk')
const utils = require('../utils')

module.exports = function (x) {
  x.flag = x.data.amount === '0' ? 'remove' : 'modify'
  const res = []
  if (x.data.type === 'ask') {
    // commit mutation
    if (x.flag === 'modify') { x.book.asks[x.data.rate] = x.data.amount }
    if (x.flag === 'remove') { delete x.book.asks[x.data.rate] }
    // check for new best ask
    if (Number(x.data.rate) < Number(x.book.bestAsk)) {
      x.book.bestAsk = x.data.rate
      res.push({
        flag: 'new best ask',
        data: {
          exchange: x.exKey,
          market: utils.parseMarketID(x.exKey, x.market),
          best: x.data.rate
        }
      })
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
      res.push({
        flag: 'new best bid',
        data: {
          exchange: x.exKey,
          market: utils.parseMarketID(x.exKey, x.market),
          best: x.data.rate
        }
      })
      if (x.log === true) console.log('new best bid ' + chalk.green(x.data.rate) + '  <-- ' + x.flag)
    }
  }
  res.forEach((r, i) => {
    utils.relayData(res[i], x.socket)
  })
  return x.book
}
