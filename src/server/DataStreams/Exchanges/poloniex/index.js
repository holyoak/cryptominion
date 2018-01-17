'use strict'
// some color
const chalk = require('chalk')
const color = require('../../config.json').dataStreams.color
// a way to connect to the exchange API
const Poloniex = require('poloniex-api-node')
// local config for exchange API
const config = require('../../config.json').poloniex
// Each exchange requires a way to parse exchange data
//   to our Orderbook data model, found in -> ./newOrderbook.js
//   and a way to parse the exchange data to our normalized API
const parse = require('./parseDataStream')

module.exports = {
  init: init
}

function init (responseSocket, log) {
  const logging = log || false
  console.log(chalk.hex(color)('Initializing Poloniex data stream...'))
  let poloniex = new Poloniex()
  poloniex.openWebSocket({ version: 2 })
  console.log(chalk.hex(color)('fetching Poloniex markets:'))
  console.log(chalk.hex(color)('--> ') + JSON.stringify(config.productIDs))

  poloniex.on('open', () => {
    console.log(chalk.hex(color)('subscribing to Poloniex channels:'))
    console.log(chalk.hex(color)('--> ') + JSON.stringify(config.channels))
    config.productIDs.forEach((market) => {
      poloniex.subscribe(market)
    })
  })

  poloniex.on('error', (e) => {
    console.error(chalk.red.bold('Polo data socket error: ' + JSON.stringify(e)))
  })

  poloniex.on('message', (channel, data, seq) => {
    parse(channel, data, responseSocket, logging)
  })
}
