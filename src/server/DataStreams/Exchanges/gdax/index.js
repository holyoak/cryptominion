'use strict'
const chalk = require('chalk')
const DataSocket = require('./socket')
const color = require('../../../config.json').dataStreams.color
const config = require('../../../config.json').gdax
const parse = require('./parseDataStream')
const utils = require('../../utils')

const Orderbooks = {}

module.exports = {
  init: init,
  getOrderbooks: getBooks
}

function init (db, socket, log) {
  const logging = log || false
  console.log(chalk.hex(color)('Initializing GDAX data stream...'))
  const gdax = new DataSocket(config.productIDs, config.uri, null, config.channels)
  gdax.on('error', e => { console.error('GDAX data socket error: ' + JSON.stringify(e)) })
  gdax.on('close', () => { /* ... */ })
  gdax.on('message', data => {
    parse(data.product_id, data, db, socket, logging, Orderbooks)
  })
}

function getBooks (socket) {
  Object.keys(Orderbooks).forEach((x) => {
    const res = {
      flag: 'new book',
      data: {
        exKey: 'gdax',
        market: x,
        last: Orderbooks[x].lastPrice,
        bestAsk: Orderbooks[x].bestAsk,
        bestBid: Orderbooks[x].bestBid
      }
    }
    socket.send(JSON.stringify(res))
  })
}
