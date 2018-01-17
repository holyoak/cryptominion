'use strict'
const chalk = require('chalk')
const utils = require('../utils')
const color = require('../../config.json').dataStreams.color

module.exports = function (x) {
  const res = []
  res.push({
    flag: 'new book',
    data: {
      exchange: x.exKey,
      market: utils.parseMarketID(x.exKey, x.market),
      book: utils.getBestOrders(x.data)
    }
  })
  x.data.bestAsk = utils.getBestAsk(x.data)
  x.data.bestBid = utils.getBestBid(x.data)
  // console.log('best ask is ' + x.data.bestAsk)
  // console.log('best Bid is ' + x.data.bestBid)
  console.log(chalk.hex(color)('--> orderbook loaded') +
    chalk.green(' Poloniex ' + x.market))
  res.forEach((r, i) => {
    utils.relayData(res[i], x.socket)
  })
  return x.data
}
