import * as actions from './actions'
import mutations from './mutations'

const state = {
  tickers: {},
  max_length: 10
}

// const getters = {
//   getTicker: function (state, dict) {
//     if (state.tickers[dict.exchange][dict.market]) {
//       return state.tickers[dict.exchange][dict.market].slice()
//     }
//   }
// }

export default {
  state,
  actions,
  // getters,
  mutations
}
