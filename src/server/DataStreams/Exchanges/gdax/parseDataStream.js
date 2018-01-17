'use strict'
const chalk = require('chalk')
const newBook = require('./newOrderbook')
const parse = require('../../StreamParser')
const exKey = 'gdax'

module.exports = function (market, message, db, socket, log, Orderbooks) {
// log sample message here
//  utils.logToFile(message, 'dataFile')
  const loaded = (Orderbooks[market] && Orderbooks[market].loaded === 'loaded')
  const params = {
    exKey: exKey,
    book: loaded ? Orderbooks[market] : null,
    market: market,
    data: message,
    db: db,
    socket: socket,
    log: log
  }
  switch (message.type) {
    case 'snapshot':
      Orderbooks[market] = newBook(params)
      break
    case 'l2update':
      if (loaded) Orderbooks[market] = l2update(params)
      break
    case 'match':
      if (loaded) Orderbooks[market] = match(params)
      break
    case ('subscriptions'):
      break
    case ('last_match'):
      if (loaded) Orderbooks[market] = match(params)
      break
    default:
      console.log(chalk.bold.red('GDAX parseDataStream switch failed'))
      console.log(chalk.bold.red(JSON.stringify(message)))
      return true
  }
  // return params
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
    _id: params.data.trade_id,
    rate: params.data.price,
    amount: params.data.size,
    makerID: params.data.maker_order_id,
    tradeID: params.data.trade_id,
    time: params.data.time,
    type: params.data.side === 'buy' ? 'sell' : 'buy'
  }
  params.data = data
  return parse.newTrade(params)
}
