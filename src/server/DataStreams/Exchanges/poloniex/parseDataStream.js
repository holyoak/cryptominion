'use strict'
const chalk = require('chalk')
const newBook = require('./newOrderbook')
const parse = require('../StreamParser')
const exKey = 'poloniex'

const Orderbook = {}
module.exports = function (channel, message, socket, log) {
  const market = parseMarketID(channel)
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
        console.log('flag is ' + x.type)
        console.log('polo book keys are ' + Object.keys(Orderbook))
        break
      case 'newTrade':
        console.log('flag is ' + x.type)
        console.log('polo book keys are ' + Object.keys(Orderbook))
        Orderbook[market] = parse.newTrade(params)
        break
      case 'orderBookModify':
        console.log('flag is ' + x.type)
        console.log('polo book keys are ' + Object.keys(Orderbook))
        params.flag = 'modify'
        Orderbook[market] = parse.mutateBook(params)
        break
      case 'orderBookRemove':
        console.log('flag is ' + x.type)
        console.log('polo book keys are ' + Object.keys(Orderbook))
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

function parseMarketID (id) {
  const i = id.indexOf('_')
  const quote = id.slice(i + 1)
  const base = id.slice(0, i)
  return quote + '-' + base
}
