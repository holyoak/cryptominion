'use strict'
const chalk = require('chalk')
const actions = require('../../EventBus').actions
const Bittrex = require('../bittrex')
const Gdax = require('../gdax')
const Polo = require('../poloniex')

module.exports = {
  parse: parse
}
/**
 * Normalize market utility data
 * @param  {Client}   client      ccxt exchange client
 * @param  {AppID}    exKey          App exchange key
 * @return {Object}               app state fragment
 */
function parse (userID, client, exKey) {
  return new Promise(function (resolve, reject) {
    client.loadMarkets()
      .then((data) => {
        resolve(parseData(userID, data, exKey))
      })
  })
}

/**
 * Switchboard for passing data to specific exchange components
 * @param  {Object}   data        raw ccxt loadMarkets() data
 * @param  {AppID}    exKey          App exchange key
 * @return {Object}               app state fragment
 */
function parseData (data, exKey) {
  const res = {
    flag: 'load markets',
    data: { id: exKey }
  }
  actions(userID, exKey, 'loadMarketData')
  switch (ID) {
    case 'gdax':
      res.data.markets = Gdax.parseMarkets(data)
      return res
    case 'poloniex':
      actions.loadMarketData('poloniex')
      return res
    case 'bittrex':
      actions.loadMarketData('bittrex')
      return res
    default:
      const msg = '/ClientParser/Markets switch condition not met'
      console.error(chalk.red.bold(msg))
      return ({ err: 1, m: msg })
  }
}
