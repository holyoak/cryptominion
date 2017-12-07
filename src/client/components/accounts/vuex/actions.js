export const initState = ({ commit }, data) => {
  commit('INIT_STATE', data)
}

export const loadBalances = ({ commit }, data) => {
  commit('LOAD_BALANCES', data)
}

export const loadMarkets = ({ commit }, data) => {
  commit('LOAD_MARKETS', data)
}

export const loadSandbox = ({ commit }, data) => {
  commit('LOAD_SANDBOX', data)
}

export const newBook = ({ commit }, data) => {
  commit('NEW_BOOK', data)
}

export const resetAsk = ({ commit }, data) => {
  commit('RESET_ASK', data)
}

export const resetBid = ({ commit }, data) => {
  commit('RESET_BID', data)
}

export const resetPrice = ({ commit }, data) => {
  commit('RESET_PRICE', data)
}
