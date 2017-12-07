'use strict'
const chalk = require('chalk')
const newBook = require('./newOrderbook')
const parse = require('../StreamParser')
const exKey = 'poloniex'

const Orderbook = {}
module.exports = function (market, message, socket, log) {
  message.forEach((x) => {
    const params = {
      exKey: exKey,
      book: Orderbook[market],
      market: market,
      data: x.data,
      socket: socket,
      log: log
    }
    switch (x.type) {
      case 'orderBook':
        Orderbook[market] = newBook(params)
        break
      case 'newTrade':
        Orderbook[market] = parse.newTrade(params)
        break
      case 'orderBookModify':
        params.flag = 'modify'
        Orderbook[market] = parse.mutateBook(params)
        break
      case 'orderBookRemove':
        params.flag = 'remove'
        Orderbook[market] = parse.mutateBook(params)
        break
      default:
        console.log(chalk.bold.red('Polo parseDataStream switch failed'))
        console.log(chalk.bold.red(JSON.stringify(message)))
        return true
    }
  })
  return true
}
