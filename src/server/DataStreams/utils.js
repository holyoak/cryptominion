'use strict'
const chalk = require('chalk')
const crypto = require('crypto')
const querystring = require('querystring')

module.exports = {
  cullAsks: cullAsks,
  cullBids: cullBids,
  getBestAsk: getBestAsk,
  getBestBid: getBestBid,
  getBestOrders: getBestOrders,
  parseMarketID: parseMarketID,
  relayData: relayData,
  parseProductIDs: parseProductIDs,
  signRequest: signRequest
}

function cullAsks (orderbook, min) {
  const asks = Object.keys(orderbook.asks)
  const len = asks.length
  let i = 0
  while (i < len) {
    if (Number(asks[i]) < Number(min)) {
      delete orderbook.asks[asks[i]]
      orderbook.bestAsk = min
    }
    i++
  }
}

function cullBids (orderbook, max) {
  const bids = Object.keys(orderbook.bids)
  const len = bids.length
  let i = 0
  while (i < len) {
    if (Number(bids[i]) > Number(max)) {
      delete orderbook.bids[bids[i]]
      orderbook.bestBid = max
    }
    i++
  }
}

function getBestOrders (orderbook) {
  return {
    bestAsk: getBestAsk(orderbook),
    bestBid: getBestAsk(orderbook)
  }
}

function getBestAsk (orderbook) {
  return Math.min(...Object.keys(orderbook.asks))
}

function getBestBid (orderbook) {
  return Math.max(...Object.keys(orderbook.bids))
}

function parseMarketID (exKey, marketID) {
  switch (exKey) {
    case 'gdax':
      return marketID
    case 'poloniex':
      const i = marketID.indexOf('_')
      const quote = marketID.slice(i + 1)
      const base = marketID.slice(0, i) === 'USDT' ? 'USD' : marketID.slice(0, i)
      return quote + '-' + base
    default:
      const error = 'Stream parseMarketID switch failed'
      console.error(chalk.red(error))
      console.error('message was ' + JSON.stringify(exKey))
      return (error)
  }
}

function parseProductIDs (productIDs) {
  if (!productIDs || !productIDs.length) {
    return ['BTC-USD']
  }

  if (Array.isArray(productIDs)) {
    return productIDs
  }

  // If we got this far, it means it's a string.
  // Return an array for backwards compatibility.
  return [productIDs]
}

function relayData (data, socket) {
  socket.clients.forEach(function each (client) {
    if (client.readyState === 1) {
      client.send(JSON.stringify(data))
    }
  })
}

function signRequest (auth, method, path, options = {}) {
  const timestamp = Date.now() / 1000
  let body = ''
  if (options.body) {
    body = JSON.stringify(options.body)
  } else if (options.qs && Object.keys(options.qs).length !== 0) {
    body = '?' + querystring.stringify(options.qs)
  }
  const what = timestamp + method.toUpperCase() + path + body
  const key = Buffer(auth.secret, 'base64')
  const hmac = crypto.createHmac('sha256', key)
  const signature = hmac.update(what).digest('base64')
  return {
    key: auth.key,
    signature: signature,
    timestamp: timestamp,
    passphrase: auth.passphrase
  }
}
