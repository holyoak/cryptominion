'use strict'
const chalk = require('chalk')
const Bittrex = require('../bittrex')
const Gdax = require('../gdax')
const Polo = require('../poloniex')

module.exports = {
  parse: parse
}
/**
 * Normalize client balance data
 * @param  {Client}   client      ccxt exchange client
 * @param  {AppID}    ID          App exchange key
 * @return {Object}               app state fragment
 */
function parse (client, ID) {
  return new Promise(function (resolve, reject) {
    client.fetchBalance()
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
    flag: 'load balances',
    data: { id: ID }
  }
  switch (ID) {
    case 'gdax':
      res.data.balances = Gdax.parseBalances(data)
      return res
    case 'poloniex':
      res.data.balances = Polo.parseBalances(data)
      return res
    case 'bittrex':
      res.data.balances = Bittrex.parseBalances(data)
      return res
    default:
      const msg = '/ClientParser/Balances switch condition not met'
      console.error(chalk.red.bold(msg))
      return ({ err: 1, m: msg })
  }
}
