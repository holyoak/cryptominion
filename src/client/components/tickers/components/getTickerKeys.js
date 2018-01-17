'use strict'

module.exports = {
  getTickers: getTickers
}
/**
 * return any tickers that match the marketID
 * @param  {tickerKey} key      id to be matched
 * @param  {Store}     state    vuex state
 * @return {Array}              tickerKeys of matches
 */
function getTickers (key, state) {
  const res = []
  console.log('Into getTickers')
  const exchanges = Object.keys(state.tickers.tickers)
  exchanges.forEach((x) => {
    const markets = Object.keys(state.tickers.tickers[x])
    markets.forEach((m) => {
      if (state.tickers.tickers[x][m].market === key.market &&
        state.tickers.tickers[x][m].id !== key.id) {
        res.push({
          id: x + key.market,
          exchange: x,
          market: key.market
        })
      }
    })
  })
  return res
}
