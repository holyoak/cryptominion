'use strict'
const chalk = require('chalk')
const utils = require('../utils')

module.exports = function (x) {
  const res = [{
    flag: 'new trade',
    data: {
      exchange: x.exKey,
      market: utils.parseMarketID(x.exKey, x.market),
      side: x.data.type === 'buy' ? 'sell' : 'buy',
      size: x.data.amount,
      price: x.data.rate
    }
  }]
  const bestAsk = x.book.bestAsk
  const bestBid = x.book.bestBid

  if (x.data.type === 'buy') {
    if (x.log === true) console.log('trade: ' + chalk.green(x.data.type + ' @ ') + x.data.rate)
    // subtract amount from book
    let amt = x.data.amount
    // sort asks
    const ask = Object.keys(x.book.asks).sort(function (a, b) {
      return Number(a) - Number(b)
    })
    let i = 0
    while (amt > 0) {
      // if amt > order, remove order
      if (x.book.asks[ask[i]] <= amt) {
        amt = Number(Number(amt) - Number(x.book.asks[ask[i]]))
        delete x.book.asks[ask[i]]
      // otherwise, subtract amt
      } else {
        x.book.asks[ask[i]] = Number(Number(x.book.asks[ask[i]]) - Number(amt))
        amt = 0
      }
      i++
    }
  }
  if (x.data.type === 'sell') {
    if (x.log === true) console.log('trade: ' + chalk.red(x.data.type + '@ ') + x.data.rate)
    // subtract amount from book
    let amt = x.data.amount
    // sort asks
    const bid = Object.keys(x.book.bids).sort(function (a, b) {
      return Number(b) - Number(a)
    })
    let i = 0
    while (amt > 0) {
      // if amt > order, remove order
      if (x.book.bids[bid[i]] <= amt) {
        amt = Number(Number(amt) - Number(x.book.bids[bid[i]]))
        delete x.book.bids[bid[i]]
      // otherwise, subtract amt
      } else {
        x.book.bids[bid[i]] = Number(Number(x.book.bids[bid[i]]) - Number(amt))
        amt = 0
      }
      i++
    }
  }

  // mutate state
  // console.log('x.data.rate is ' + JSON.stringify(x.data.rate))
  utils.cullAsks(x.book, x.data.rate)
  utils.cullBids(x.book, x.data.rate)

  // if best ask has changed
  const checkAsk = utils.getBestAsk(x.book)
  if (bestAsk !== checkAsk) {
    res.push({
      flag: 'new best ask',
      data: {
        exchange: x.exKey,
        market: utils.parseMarketID(x.exKey, x.market),
        best: checkAsk
      }
    })
    x.book.bestAsk = checkAsk
    if (x.log === true) console.log('new best ask ' + checkAsk)
  }

  // if best bid has changed
  const checkBid = utils.getBestBid(x.book)
  if (bestBid !== checkBid) {
    res.push({
      flag: 'new best bid',
      data: {
        exchange: x.exKey,
        market: utils.parseMarketID(x.exKey, x.market),
        best: checkBid
      }
    })
    x.book.bestBid = checkBid
    if (x.log === true) console.log('new best bid ' + checkBid)
  }
  res.forEach((r, i) => {
    utils.relayData(res[i], x.socket)
  })
  return x.book
}
