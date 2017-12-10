'use strict'
const chalk = require('chalk')
const Bittrex = require('../bittrex')
const Gdax = require('../gdax')
const Polo = require('../poloniex')

module.exports = {
  parse: parse
}
/**
 * Normalize market utility data
 * @param  {Client}   client      ccxt exchange client
 * @param  {AppID}    ID          App exchange key
 * @return {Object}               app state fragment
 */
function parse (client, ID) {
  return new Promise(function (resolve, reject) {
    client.loadMarkets()
      .then((data) => {
        resolve(parseData(data, ID))
      })
  })
}

/**
 * Switchboard for passing data to specific exchange components
 * @param  {Object}   data        raw ccxt loadMarkets() data
 * @param  {AppID}    ID          App exchange key
 * @return {Object}               app state fragment
 */
function parseData (data, ID) {
  const res = {
    flag: 'load markets',
    data: { id: ID }
  }
  switch (ID) {
    case 'gdax':
      res.data.markets = Gdax.parseMarkets(data)
      return res
    case 'poloniex':
      res.data.markets = Polo.parseMarkets(data)
      return res
    case 'bittrex':
      res.data.markets = Bittrex.parseMarkets(data)
      return res
    default:
      const msg = '/ClientParser/Markets switch condition not met'
      console.error(chalk.red.bold(msg))
      return ({ err: 1, m: msg })
  }
}
