'use strict'
const chalk = require('chalk')
const newBook = require('./newOrderbook')
const parse = require('../StreamParser')
const exKey = 'gdax'

const Orderbook = {}
// const Queue = []
module.exports = function (market, message, socket, log) {
  const params = {
    exKey: exKey,
    book: Orderbook[market],
    market: market,
    data: message,
    socket: socket,
    log: log
  }
  switch (message.type) {
    case 'snapshot':
      Orderbook[market] = newBook(params)
      break
    case 'l2update':
      Orderbook[market] = l2update(params)
      break
    case 'match':
      Orderbook[market] = match(params)
      break
    case ('subscriptions'):
      break
    case ('last_match'):
      break
    default:
      console.log(chalk.bold.red('GDAX parseDataStream switch failed'))
      console.log(chalk.bold.red(JSON.stringify(message)))
      return true
  }
  return params
}

function l2update (params) {
  let book = params.book
  params.data.changes.forEach((x) => {
    const p = params
    p.data = {
      type: x[0] === 'sell' ? 'ask' : 'bid',
      rate: x[1],
      amount: x[2]
    }
    book = parse.mutateBook(p)
  })
  return book
}

function match (params) {
  const data = {
    rate: params.data.price,
    amount: params.data.size,
    type: params.data.side === 'buy' ? 'sell' : 'buy'
  }
  params.data = data
  return parse.newTrade(params)
}
