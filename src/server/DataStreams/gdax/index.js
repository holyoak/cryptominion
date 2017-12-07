'use strict'
const chalk = require('chalk')
const DataSocket = require('./socket')
const color = require('../../config.json').dataStreams.color
const config = require('../../config.json').gdax
const parse = require('./parseDataStream')

module.exports = {
  init: init
}

function init (socket, log) {
  const logging = log || false
  console.log(chalk.hex(color)('Initializing GDAX data stream...'))
  const gdax = new DataSocket(config.productIDs, config.uri, null, config.channels)
  gdax.on('error', e => { console.error('GDAX data socket error: ' + JSON.stringify(e)) })
  gdax.on('close', () => { /* ... */ })
  gdax.on('message', data => {
    parse(data.product_id, data, socket, logging)
  })
}
