'use strict'
const chalk = require('chalk')
const utils = require('../utils')

module.exports = function (x) {
  x.book.lastPrice = Number(x.data.rate)
  // set response for dB
  const res = {
    flag: 'new trade',
    data: {
      _id: x.data._id,
      rate: Number(x.data.rate),
      type: x.data.type === 'buy' ? 'sell' : 'buy',
      amount: Number(x.data.amount),
      timestamp: new Date(x.data.time)
    }
  }

  // set the dB collection
  const collection = x.db.collection(x.exKey + '_' + x.market)
  // commit the data
  collection.insertOne(res.data)

  // set response for app API
  res.data.exchange = x.exKey
  res.data.market = x.market
  res.data.makerID = x.makerID
  // send response to strats here

  // set response for ticker
  delete res.data._id
  delete res.data.makerID
  delete res.data.timestamp
  // send ticker response
  utils.relayData(res, x.socket)

  // store current level 1 orderbook state
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
    utils.relayData({
      flag: 'new best ask',
      data: {
        exchange: x.exKey,
        market: x.market,
        best: checkAsk
      }
    }, x.socket)
    x.book.bestAsk = checkAsk
    if (x.log === true) console.log('new best ask ' + checkAsk)
  }

  // if best bid has changed
  const checkBid = utils.getBestBid(x.book)
  if (bestBid !== checkBid) {
    utils.relayData({
      flag: 'new best bid',
      data: {
        exchange: x.exKey,
        market: x.market,
        best: checkBid
      }
    }, x.socket)
    x.book.bestBid = checkBid
    if (x.log === true) console.log('new best bid ' + checkBid)
  }
  return x.book
}
