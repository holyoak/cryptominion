export default function (store, message, callback) {
  // console.log('Main app switch:' + message.flag)
  switch (message.flag) {
    case ('init nav'):
      store.commit('INIT_NAV', null)
      break
    case ('init state'):
      store.commit('INIT_STATE', message.data)
      callback()
      break
    case ('load balances'):
      store.commit('LOAD_BALANCES', message.data)
      break
    case ('load markets'):
      store.commit('LOAD_MARKETS', message.data)
      break
    case ('new book'):
      store.commit('NEW_BOOK', message.data)
      break
    case ('new trade'):
      store.commit('LOAD_TRADE', message.data)
      store.commit('RESET_PRICE', message.data)
      break
    case ('new best ask'):
      store.commit('RESET_ASK', message.data)
      break
    case ('new best bid'):
      store.commit('RESET_BID', message.data)
      break
    case ('init sandbox'):
      store.commit('LOAD_SANDBOX', message.data)
      const tickers = initTickers(message.data)
      store.commit('LOAD_TICKERS', tickers)
      break
    default:
      const error = 'App actions switch failed'
      console.error(error)
      console.error('message was ' + JSON.stringify(message))
      return (error)
  }
}

function initTickers (data) {
  const res = {}
  for (const e in data) {
    res[e] = {}
    for (const m in data[e].markets) {
      res[e][m] = {
        id: e + m,
        market: m,
        data: []
      }
    }
  }
  return res
}
