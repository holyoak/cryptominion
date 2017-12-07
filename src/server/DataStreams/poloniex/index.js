'use strict'
const chalk = require('chalk')
const Poloniex = require('poloniex-api-node')
const color = require('../../config.json').dataStreams.color
const config = require('../../config.json').poloniex
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
