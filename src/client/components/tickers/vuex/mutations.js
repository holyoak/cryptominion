/* eslint-disable no-unused-vars */
import Vue from 'vue'
// following https://vuex.vuejs.org/en/mutations.html
// Mutations Follow Vue's Reactivity Rules

export default {
  LOAD_TICKERS (state, payload) {
    state.tickers = payload
  },
  LOAD_TRADE (state, payload) {
    const tickers = {...state.tickers} || {}
    const exchange = payload.exchange
    const market = payload.market
    const data = {
      side: payload.type,
      size: payload.amount,
      price: payload.rate
    }
    // protect null case
    tickers[exchange] = tickers[exchange] || {}
    tickers[exchange][market] = tickers[exchange][market] || {
      id: exchange + market,
      market: market,
      data: []
    }

    // truncate data
    let len = tickers[exchange][market].data.length || 0
    if (len >= state.max_length) {
      let i = 0
      const res = []
      len--
      while (i < len) {
        res.push(tickers[exchange][market].data[i + 1])
        res[i].id = tickers[exchange][market].data[i].id
        i++
      }
      tickers[exchange][market].data = res
    }
    // force unique id for binding
    data.id = String(exchange + market + len)
    tickers[exchange][market].data.push(data)
    state.tickers = tickers
  }
}
