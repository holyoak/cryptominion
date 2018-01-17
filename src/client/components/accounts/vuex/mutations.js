/* eslint-disable no-unused-vars */
import Vue from 'vue'

export default {
  INIT_STATE (state, payload) {
    state.id = payload.config.id
    for (const exchangeID in payload.auth.accounts) {
      state.accounts[exchangeID] = {
        id: exchangeID,
        balanceDataReady: false,
        marketsDataReady: false,
        ordersDataReady: false,
        valueDataReady: false,
        balances: {},
        markets: {},
        orders: {}
      }
    }
  },

  LOAD_BALANCES (state, payload) {
    const accounts = {...state.accounts} || {}
    accounts[payload.id].balances = payload.balances
    accounts[payload.id].balanceDataReady = true
    state.accounts = accounts
  },

  LOAD_MARKETS (state, payload) {
    const accounts = {...state.accounts} || {}
    accounts[payload.id].markets = payload.markets
    accounts[payload.id].marketsDataReady = true
    state.accounts = accounts
  },

  LOAD_SANDBOX (state, payload) {
    const accounts = {...state.accounts} || {}
    for (const ex in payload) {
      accounts[ex] = accounts[ex] || {}
      accounts[ex].id = ex
      accounts[ex].balanceDataReady = true
      accounts[ex].marketsDataReady = true
      accounts[ex].ordersDataReady = false
      accounts[ex].valueDataReady = true
      accounts[ex].balances = payload[ex].balances
      accounts[ex].markets = payload[ex].markets
    }
    state.accounts = accounts
  },

  NEW_BOOK (state, x) {
    console.log('newbook')
    console.log('x.exKey is ' + x.exKey)
    console.log('state.accounts keys are ' + JSON.stringify(state.accounts))
    if (state.accounts[x.exKey].markets[x.market]) {
      const market = state.accounts[x.exKey].markets[x.market]
      market.highest_bid = Number(x.bestBid)
      market.last_price = Number(x.lastPrice)
      market.lowest_ask = Number(x.bestAsk)
      market.loaded = 'loaded'
    }
  },

  RESET_ASK (state, x) {
    if (Number(x.best) <= 0) {
      console.log('reset ask')
      console.log('x is ' + JSON.stringify(x))
    }
    if (state.accounts[x.exchange] && state.accounts[x.exchange].markets[x.market]) {
      state.accounts[x.exchange].markets[x.market].lowest_ask = Number(x.best)
    }
  },

  RESET_BID (state, x) {
    if (Number(x.best) <= 0) {
      console.log('reset bid')
      console.log('x is ' + JSON.stringify(x))
    }
    if (state.accounts[x.exchange] && state.accounts[x.exchange].markets[x.market]) {
      state.accounts[x.exchange].markets[x.market].highest_bid = Number(x.best)
    }
  },

  RESET_PRICE (state, x) {
    if (state.accounts[x.exchange] && state.accounts[x.exchange].markets[x.market]) {
      state.accounts[x.exchange].markets[x.market].last_price = Number(x.rate)
      if (x.market === 'BTC-USD' || x.marketb === 'BTC-USDT') state.accounts[x.exchange].last_btc_price = Number(x.rate)
    }
  }
}
